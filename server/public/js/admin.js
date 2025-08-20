const { createApp, h, ref, computed, onMounted, watch } = Vue;

createApp({
    setup() {
        // 반응형 데이터
        const isLoggedIn = ref(false);
        const isLoading = ref(false);
        const errorMessage = ref('');
        const adminInfo = ref({});
        const token = ref('');
        const loginForm = ref({
            username: '',
            password: ''
        });
        
        // 상담 신청 데이터
        const consultations = ref([]);
        const selectedConsultation = ref(null);
        
        // 필터 및 페이지네이션
        const filters = ref({
            search: '',
            status: 'all',
            limit: 20
        });
        const pagination = ref({
            page: 1,
            limit: 20,
            total: 0,
            totalPages: 0
        });
        
        // 통계
        const stats = ref({});

        // 메서드들
        const login = async () => {
            isLoading.value = true;
            errorMessage.value = '';
            
            try {
                const response = await axios.post('/api/admin/login', loginForm.value);
                
                if (response.data.success) {
                    token.value = response.data.token;
                    adminInfo.value = response.data.admin;
                    isLoggedIn.value = true;
                    
                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('admin_token', token.value);
                    
                    // 데이터 로드
                    loadConsultations();
                    loadStats();
                }
            } catch (error) {
                if (error.response?.data?.message) {
                    errorMessage.value = error.response.data.message;
                } else {
                    errorMessage.value = '로그인에 실패했습니다.';
                }
            } finally {
                isLoading.value = false;
            }
        };
        
        const logout = () => {
            isLoggedIn.value = false;
            token.value = '';
            adminInfo.value = {};
            consultations.value = [];
            stats.value = {};
            localStorage.removeItem('admin_token');
        };
        
        const loadAdminInfo = () => {
            try {
                // JWT 토큰에서 정보 추출 (실제로는 서버에서 검증)
                const payload = JSON.parse(atob(token.value.split('.')[1]));
                adminInfo.value = {
                    id: payload.id,
                    username: payload.username,
                    email: payload.email
                };
            } catch (error) {
                console.error('관리자 정보 로드 오류:', error);
            }
        };
        
        const loadConsultations = async () => {
            isLoading.value = true;
            
            try {
                const params = {
                    page: pagination.value.page,
                    limit: pagination.value.limit
                };
                
                if (filters.value.status !== 'all') {
                    params.status = filters.value.status;
                }
                
                if (filters.value.search) {
                    params.search = filters.value.search;
                }
                
                const response = await axios.get('/api/admin/consultations', {
                    headers: { Authorization: `Bearer ${token.value}` },
                    params
                });
                
                if (response.data.success) {
                    consultations.value = response.data.data.consultations;
                    pagination.value = response.data.data.pagination;
                }
            } catch (error) {
                console.error('상담 신청 로드 오류:', error);
                if (error.response?.status === 401) {
                    logout();
                }
            } finally {
                isLoading.value = false;
            }
        };
        
        const loadStats = async () => {
            try {
                const response = await axios.get('/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token.value}` }
                });
                
                if (response.data.success) {
                    stats.value = response.data.data;
                }
            } catch (error) {
                console.error('통계 로드 오류:', error);
            }
        };
        
        const updateStatus = async (id, status) => {
            try {
                const response = await axios.put(`/api/admin/consultations/${id}/status`, {
                    status
                }, {
                    headers: { Authorization: `Bearer ${token.value}` }
                });
                
                if (response.data.success) {
                    // 목록과 통계 새로고침
                    loadConsultations();
                    loadStats();
                }
            } catch (error) {
                console.error('상태 업데이트 오류:', error);
                alert('상태 업데이트에 실패했습니다.');
            }
        };
        
        const showDetail = (consultation) => {
            selectedConsultation.value = { ...consultation };
        };
        
        const changePage = (page) => {
            if (page >= 1 && page <= pagination.value.totalPages) {
                pagination.value.page = page;
                loadConsultations();
            }
        };
        
        const getPageNumbers = () => {
            const pages = [];
            const current = pagination.value.page;
            const total = pagination.value.totalPages;
            
            if (total <= 7) {
                for (let i = 1; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                if (current <= 4) {
                    for (let i = 1; i <= 5; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(total);
                } else if (current >= total - 3) {
                    pages.push(1);
                    pages.push('...');
                    for (let i = total - 4; i <= total; i++) {
                        pages.push(i);
                    }
                } else {
                    pages.push(1);
                    pages.push('...');
                    for (let i = current - 1; i <= current + 1; i++) {
                        pages.push(i);
                    }
                    pages.push('...');
                    pages.push(total);
                }
            }
            
            return pages;
        };
        
        const getStatusClass = (status) => {
            const classes = {
                pending: 'status-pending',
                contacted: 'status-contacted',
                completed: 'status-completed',
                cancelled: 'status-cancelled'
            };
            return classes[status] || 'status-pending';
        };
        
        const getStatusIcon = (status) => {
            const icons = {
                pending: 'fas fa-clock',
                contacted: 'fas fa-phone',
                completed: 'fas fa-check-circle',
                cancelled: 'fas fa-times-circle'
            };
            return icons[status] || 'fas fa-clock';
        };
        
        const getStatusText = (status) => {
            const texts = {
                pending: '대기 중',
                contacted: '연락 완료',
                completed: '완료',
                cancelled: '취소'
            };
            return texts[status] || '대기 중';
        };
        
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        };

        // 감시자들
        watch(() => filters.value.search, () => {
            pagination.value.page = 1;
            loadConsultations();
        });
        
        watch(() => filters.value.status, () => {
            pagination.value.page = 1;
            loadConsultations();
        });
        
        watch(() => filters.value.limit, () => {
            pagination.value.page = 1;
            loadConsultations();
        });

        // 마운트 시 실행
        onMounted(() => {
            // 저장된 토큰이 있는지 확인
            const savedToken = localStorage.getItem('admin_token');
            if (savedToken) {
                token.value = savedToken;
                isLoggedIn.value = true;
                loadAdminInfo();
                loadConsultations();
                loadStats();
            }
        });

        // 렌더 함수
        return () => {
            if (!isLoggedIn.value) {
                // 로그인 화면
                return h('div', { class: 'gradient-bg flex items-center justify-center p-4' }, [
                    h('div', { class: 'w-full max-w-md' }, [
                        // 로고 및 제목
                        h('div', { class: 'text-center mb-8' }, [
                            h('div', { class: 'mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl' }, [
                                h('i', { class: 'fas fa-chart-line text-4xl text-indigo-600' })
                            ]),
                            h('h1', { class: 'text-4xl font-bold text-white mb-3' }, 'AX Consulting'),
                            h('p', { class: 'text-xl text-white/90' }, '관리자 패널')
                        ]),

                        // 로그인 폼
                        h('div', { class: 'glass-card rounded-3xl p-8' }, [
                            h('form', { 
                                onSubmit: (e) => { e.preventDefault(); login(); }
                            }, [
                                h('div', { class: 'space-y-6' }, [
                                    // 사용자명 입력
                                    h('div', [
                                        h('label', { 
                                            for: 'username', 
                                            class: 'block text-sm font-semibold text-white mb-3' 
                                        }, [
                                            h('i', { class: 'fas fa-user mr-2' }),
                                            '사용자명'
                                        ]),
                                        h('input', {
                                            id: 'username',
                                            type: 'text',
                                            required: true,
                                            value: loginForm.value.username,
                                            onInput: (e) => loginForm.value.username = e.target.value,
                                            class: 'input-field',
                                            placeholder: 'admin'
                                        })
                                    ]),
                                    
                                    // 비밀번호 입력
                                    h('div', [
                                        h('label', { 
                                            for: 'password', 
                                            class: 'block text-sm font-semibold text-white mb-3' 
                                        }, [
                                            h('i', { class: 'fas fa-lock mr-2' }),
                                            '비밀번호'
                                        ]),
                                        h('input', {
                                            id: 'password',
                                            type: 'password',
                                            required: true,
                                            value: loginForm.value.password,
                                            onInput: (e) => loginForm.value.password = e.target.value,
                                            class: 'input-field',
                                            placeholder: '••••••••'
                                        })
                                    ]),

                                    // 로그인 버튼
                                    h('button', {
                                        type: 'submit',
                                        disabled: isLoading.value,
                                        class: 'btn-primary w-full text-lg py-4'
                                    }, isLoading.value ? [
                                        h('span', { class: 'flex items-center justify-center' }, [
                                            h('div', { class: 'loading-spinner mr-3' }),
                                            '로그인 중...'
                                        ])
                                    ] : [
                                        h('span', { class: 'flex items-center justify-center' }, [
                                            h('i', { class: 'fas fa-sign-in-alt mr-3' }),
                                            '로그인'
                                        ])
                                    ]),

                                    // 에러 메시지
                                    errorMessage.value && h('div', { 
                                        class: 'text-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl' 
                                    }, [
                                        h('p', { class: 'text-red-200 text-sm' }, [
                                            h('i', { class: 'fas fa-exclamation-triangle mr-2' }),
                                            errorMessage.value
                                        ])
                                    ]),

                                    // 기본 계정 정보
                                    h('div', { class: 'text-center p-4 bg-white/10 rounded-xl' }, [
                                        h('p', { class: 'text-white/80 text-sm' }, [
                                            h('i', { class: 'fas fa-info-circle mr-2' }),
                                            '기본 계정: admin / admin123'
                                        ])
                                    ])
                                ])
                            ])
                        ])
                    ])
                ]);
            }

            // 메인 관리자 패널
            return h('div', { class: 'min-h-screen bg-gray-50' }, [
                // 헤더
                h('header', { class: 'bg-white shadow-sm border-b border-gray-200' }, [
                    h('div', { class: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' }, [
                        h('div', { class: 'flex justify-between items-center py-4' }, [
                            h('div', { class: 'flex items-center space-x-4' }, [
                                h('div', { class: 'w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center' }, [
                                    h('i', { class: 'fas fa-chart-line text-white text-xl' })
                                ]),
                                h('div', [
                                    h('h1', { class: 'text-xl font-bold text-gray-900' }, 'AX Consulting 관리자'),
                                    h('p', { class: 'text-sm text-gray-500' }, '상담 신청 관리 시스템')
                                ])
                            ]),
                            h('div', { class: 'flex items-center space-x-4' }, [
                                h('div', { class: 'text-right' }, [
                                    h('p', { class: 'text-sm font-medium text-gray-900' }, `${adminInfo.value.username}님`),
                                    h('p', { class: 'text-xs text-gray-500' }, adminInfo.value.email)
                                ]),
                                h('button', {
                                    onClick: logout,
                                    class: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
                                }, [
                                    h('i', { class: 'fas fa-sign-out-alt mr-2' }),
                                    '로그아웃'
                                ])
                            ])
                        ])
                    ])
                ]),

                // 메인 콘텐츠
                h('main', { class: 'max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8' }, [
                    // 통계 카드
                    h('div', { class: 'stats-grid' }, [
                        h('div', { class: 'stat-card card-hover' }, [
                            h('div', { class: 'stat-icon bg-blue-500' }, [
                                h('i', { class: 'fas fa-users text-white text-xl' })
                            ]),
                            h('div', { class: 'stat-value' }, stats.value.total || 0),
                            h('div', { class: 'stat-label' }, '전체 상담')
                        ]),
                        h('div', { class: 'stat-card card-hover' }, [
                            h('div', { class: 'stat-icon bg-yellow-500' }, [
                                h('i', { class: 'fas fa-clock text-white text-xl' })
                            ]),
                            h('div', { class: 'stat-value' }, stats.value.pending || 0),
                            h('div', { class: 'stat-label' }, '대기 중')
                        ]),
                        h('div', { class: 'stat-card card-hover' }, [
                            h('div', { class: 'stat-icon bg-green-500' }, [
                                h('i', { class: 'fas fa-check-circle text-white text-xl' })
                            ]),
                            h('div', { class: 'stat-value' }, stats.value.completed || 0),
                            h('div', { class: 'stat-label' }, '완료')
                        ]),
                        h('div', { class: 'stat-card card-hover' }, [
                            h('div', { class: 'stat-icon bg-indigo-500' }, [
                                h('i', { class: 'fas fa-calendar-day text-white text-xl' })
                            ]),
                            h('div', { class: 'stat-value' }, stats.value.today || 0),
                            h('div', { class: 'stat-label' }, '오늘')
                        ])
                    ]),

                    // 필터 및 검색
                    h('div', { class: 'bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6' }, [
                        h('div', { class: 'grid grid-cols-1 md:grid-cols-3 gap-4' }, [
                            h('div', [
                                h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                    h('i', { class: 'fas fa-search mr-2' }),
                                    '검색'
                                ]),
                                h('input', {
                                    type: 'text',
                                    value: filters.value.search,
                                    onInput: (e) => filters.value.search = e.target.value,
                                    placeholder: '이름, 회사, 이메일로 검색...',
                                    class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                })
                            ]),
                            h('div', [
                                h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                    h('i', { class: 'fas fa-filter mr-2' }),
                                    '상태'
                                ]),
                                h('select', {
                                    value: filters.value.status,
                                    onChange: (e) => filters.value.status = e.target.value,
                                    class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                }, [
                                    h('option', { value: 'all' }, '전체'),
                                    h('option', { value: 'pending' }, '대기 중'),
                                    h('option', { value: 'contacted' }, '연락 완료'),
                                    h('option', { value: 'completed' }, '완료'),
                                    h('option', { value: 'cancelled' }, '취소')
                                ])
                            ]),
                            h('div', [
                                h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                    h('i', { class: 'fas fa-list mr-2' }),
                                    '페이지당'
                                ]),
                                h('select', {
                                    value: filters.value.limit,
                                    onChange: (e) => filters.value.limit = parseInt(e.target.value),
                                    class: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                }, [
                                    h('option', { value: 10 }, '10개'),
                                    h('option', { value: 20 }, '20개'),
                                    h('option', { value: 50 }, '50개')
                                ])
                            ])
                        ])
                    ]),

                    // 상담 신청 목록
                    h('div', { class: 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden' }, [
                        h('div', { class: 'px-6 py-4 border-b border-gray-200 bg-gray-50' }, [
                            h('div', { class: 'flex items-center justify-between' }, [
                                h('div', [
                                    h('h3', { class: 'text-lg font-semibold text-gray-900' }, [
                                        h('i', { class: 'fas fa-list-alt mr-2' }),
                                        '상담 신청 목록'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-500 mt-1' }, `총 ${pagination.value.total}건의 상담 신청`)
                                ]),
                                h('div', { class: 'text-right' }, [
                                    h('p', { class: 'text-sm text-gray-500' }, 
                                        `${(pagination.value.page - 1) * pagination.value.limit + 1} - ${Math.min(pagination.value.page * pagination.value.limit, pagination.value.total)} / ${pagination.value.total}`
                                    )
                                ])
                            ])
                        ]),
                        
                        // 로딩 상태
                        isLoading.value && h('div', { class: 'p-12 text-center' }, [
                            h('div', { class: 'inline-flex items-center px-6 py-3 font-semibold text-sm shadow rounded-lg text-white bg-indigo-500' }, [
                                h('div', { class: 'loading-spinner mr-3' }),
                                '로딩 중...'
                            ])
                        ]),

                        // 빈 상태
                        !isLoading.value && consultations.value.length === 0 && h('div', { class: 'p-12 text-center text-gray-500' }, [
                            h('i', { class: 'fas fa-inbox text-4xl mb-4 text-gray-300' }),
                            h('p', { class: 'text-lg' }, '상담 신청이 없습니다.')
                        ]),

                        // 상담 신청 목록
                        !isLoading.value && consultations.value.length > 0 && h('div', {}, 
                            consultations.value.map(consultation => 
                                h('div', {
                                    key: consultation.id,
                                    class: 'consultation-item',
                                    onClick: () => showDetail(consultation)
                                }, [
                                    h('div', { class: 'flex items-center justify-between' }, [
                                        h('div', { class: 'flex-1 min-w-0' }, [
                                            h('div', { class: 'flex items-center space-x-3 mb-2' }, [
                                                h('div', { class: 'flex items-center space-x-2' }, [
                                                    h('i', { class: 'fas fa-user text-gray-400' }),
                                                    h('p', { class: 'text-sm font-medium text-gray-900' }, consultation.name)
                                                ]),
                                                h('span', { 
                                                    class: `status-badge ${getStatusClass(consultation.status)}` 
                                                }, [
                                                    h('i', { class: `${getStatusIcon(consultation.status)} mr-1` }),
                                                    getStatusText(consultation.status)
                                                ])
                                            ]),
                                            h('div', { class: 'flex items-center space-x-4 text-sm text-gray-500' }, [
                                                h('span', [
                                                    h('i', { class: 'fas fa-building mr-1' }),
                                                    consultation.company
                                                ]),
                                                h('span', [
                                                    h('i', { class: 'fas fa-envelope mr-1' }),
                                                    consultation.email
                                                ]),
                                                consultation.phone && h('span', [
                                                    h('i', { class: 'fas fa-phone mr-1' }),
                                                    consultation.phone
                                                ])
                                            ])
                                        ]),
                                        h('div', { class: 'text-right' }, [
                                            h('p', { class: 'text-sm text-gray-500' }, formatDate(consultation.created_at)),
                                            h('p', { class: 'text-xs text-gray-400 mt-1' }, '접수일시')
                                        ])
                                    ])
                                ])
                            )
                        ),

                        // 페이지네이션
                        pagination.value.totalPages > 1 && h('div', { class: 'bg-gray-50 px-6 py-4 border-t border-gray-200' }, [
                            h('div', { class: 'pagination' }, [
                                h('button', {
                                    onClick: () => changePage(pagination.value.page - 1),
                                    disabled: pagination.value.page <= 1,
                                    class: 'page-btn'
                                }, [
                                    h('i', { class: 'fas fa-chevron-left mr-2' }),
                                    '이전'
                                ]),
                                
                                ...getPageNumbers().map(page => 
                                    page !== '...' ? h('button', {
                                        key: page,
                                        onClick: () => changePage(page),
                                        class: `page-btn ${page === pagination.value.page ? 'active' : ''}`
                                    }, page) : h('span', { key: page, class: 'px-4 py-2 text-gray-500' }, '...')
                                ),

                                h('button', {
                                    onClick: () => changePage(pagination.value.page + 1),
                                    disabled: pagination.value.page >= pagination.value.totalPages,
                                    class: 'page-btn'
                                }, [
                                    '다음',
                                    h('i', { class: 'fas fa-chevron-right ml-2' })
                                ])
                            ])
                        ])
                    ])
                ]),

                // 상담 신청 상세 모달
                selectedConsultation.value && h('div', { 
                    class: 'modal-overlay',
                    onClick: () => selectedConsultation.value = null
                }, [
                    h('div', { 
                        class: 'modal-content',
                        onClick: (e) => e.stopPropagation()
                    }, [
                        h('div', { class: 'flex items-center justify-between mb-6' }, [
                            h('h3', { class: 'text-xl font-semibold text-gray-900' }, [
                                h('i', { class: 'fas fa-eye mr-2 text-indigo-600' }),
                                '상담 신청 상세'
                            ]),
                            h('button', {
                                onClick: () => selectedConsultation.value = null,
                                class: 'text-gray-400 hover:text-gray-600'
                            }, [
                                h('i', { class: 'fas fa-times text-xl' })
                            ])
                        ]),
                        
                        h('div', { class: 'space-y-6' }, [
                            h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-user mr-2 text-indigo-600' }),
                                        '이름'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-900 font-medium' }, selectedConsultation.value.name)
                                ]),
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-building mr-2 text-indigo-600' }),
                                        '회사'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-900 font-medium' }, selectedConsultation.value.company)
                                ]),
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-envelope mr-2 text-indigo-600' }),
                                        '이메일'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-900 font-medium' }, selectedConsultation.value.email)
                                ]),
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-phone mr-2 text-indigo-600' }),
                                        '연락처'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-900 font-medium' }, selectedConsultation.value.phone || '-')
                                ])
                            ]),
                            
                            h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                    h('i', { class: 'fas fa-comment mr-2 text-indigo-600' }),
                                    '상담 내용'
                                ]),
                                h('p', { class: 'text-sm text-gray-900 whitespace-pre-wrap' }, selectedConsultation.value.message)
                            ]),
                            
                            h('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-6' }, [
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-calendar mr-2 text-indigo-600' }),
                                        '접수일시'
                                    ]),
                                    h('p', { class: 'text-sm text-gray-900' }, formatDate(selectedConsultation.value.created_at))
                                ]),
                                h('div', { class: 'bg-gray-50 rounded-lg p-4' }, [
                                    h('label', { class: 'block text-sm font-medium text-gray-700 mb-2' }, [
                                        h('i', { class: 'fas fa-tasks mr-2 text-indigo-600' }),
                                        '상태'
                                    ]),
                                    h('select', {
                                        value: selectedConsultation.value.status,
                                        onChange: (e) => {
                                            selectedConsultation.value.status = e.target.value;
                                            updateStatus(selectedConsultation.value.id, e.target.value);
                                        },
                                        class: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                                    }, [
                                        h('option', { value: 'pending' }, '대기 중'),
                                        h('option', { value: 'contacted' }, '연락 완료'),
                                        h('option', { value: 'completed' }, '완료'),
                                        h('option', { value: 'cancelled' }, '취소')
                                    ])
                                ])
                            ])
                        ])
                    ])
                ])
            ]);
        };
    }
}).mount('#app');
