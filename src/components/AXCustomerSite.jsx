import React, { useState } from "react";
import { motion } from "framer-motion";

// AX Consulting – 고객용 웹사이트 (Bold Dark | Publishing-ready)
// Stack: React + TailwindCSS + Framer Motion (애니메이션)
// 단일 테마(Bold Dark) 고정, 영업 흐름 최적화, 스토리텔링 카피/인포그래픽/미니차트 포함

// ====== 콘텐츠 ======
const CONTENT = {
  brand: {
    name: "AX Consulting",
    tagline: "중소기업을 위한 실전형 AI 도입 파트너",
  },
  hero: {
    title: "AI로 업무를 자동화하고, 생산성을 재정의하세요",
    subtitle:
      "AX Consulting은 발굴→파일럿→확산→운영까지, 중소기업 환경에 꼭 맞는 AI 도입을 설계하고 구현합니다.",
    ctas: [
      { label: "무료 상담 신청", href: "#contact", variant: "primary" },
      { label: "AI 적용 사례집 다운로드", href: "#cases", variant: "ghost" },
    ],
    stats: [
      { kpi: "-68%", label: "보고 리드타임" },
      { kpi: "+17%", label: "재고 회전율" },
      { kpi: "+11p", label: "CSAT" },
    ],
  },
  storytelling: {
    currentToNeed: "그렇다면, 왜 지금 AI 도입이 필요할까요?",
    currentToFit: "그렇다면, 지금 당장 자동화할 수 있는 업무는 무엇일까요?",
    fitToChecklist: "도입 전에 반드시 확인해야 할 것은요?",
    needToProcess: "그렇다면, 어떻게 도입해야 할까요?",
    processToAreas: "어디부터 적용하는 것이 효과적일까요?",
    areasToWhy: "그렇다면, 왜 AX Consulting이어야 할까요?",
    whyToCompare: "자체 도입과 무엇이 다를까요?",
    compareToGraph: "성과는 실제로 어떻게 나타날까요?",
    graphToOverseas: "해외에서는 어떤 성과가 있었을까요?",
  },
  current: {
    title: "중소기업 AI 도입 현황",
    subtitle: "대기업 대비 도입률은 낮지만, ROI 잠재력은 큽니다",
    points: [
      "중소기업의 AI 도입률은 25% 미만",
      "AI 도입 기업은 평균 18~30% 생산성 향상",
      "리소스·노하우 부족이 가장 큰 장벽",
    ],
  },
  fit: {
    title: "AI 자동화 Fit Map",
    subtitle: "자동화하기 쉬운 업무 vs 어려운 업무",
    easy: [
      "명확한 규칙 검토(계약/서류 규정 준수, 품질 검사)",
      "패턴 기반 예측(수요·매출·트렌드)",
      "패턴 인식(이미지·음성 분류)",
      "맞춤형 추천(상품·콘텐츠·광고)",
      "템플릿 기반 생성·분류(보고서 자동화, 데이터 입력)",
    ],
    hard: [
      "예측 불가능 상황 대응(위기·이슈 처리)",
      "감정 기반 커뮤니케이션(협상·갈등 조정)",
      "최종 책임 의사결정(인사·투자)",
      "전략적 방향 설정(신사업·M&A)",
      "윤리·사회적 판단(데이터 활용·고용 영향)",
    ],
  },
  checklist: {
    title: "AI 도입 체크리스트",
    items: [
      "업무 적합성: 규칙성·빈도·반복성·오류비용",
      "데이터: 양/질/정합성/접근권한",
      "KPI: 시간·비용·품질·CSAT 등 성공 기준",
      "보안/컴플라이언스: PII 분류·마스킹·감사로깅",
      "운영: 담당자·교육·모니터링 체계",
      "기술: API/DB 연동, RPA/LLM 스택 적합성",
    ],
  },
  need: {
    title: "왜 지금 AI 도입이 필요한가?",
    subtitle: "생존과 성장의 핵심 전략",
    points: [
      "시간 절약: 반복업무 자동화로 핵심 업무 집중",
      "비용 절감: 처리 효율 증대로 운영비 절감",
      "업무 만족도: 단순 작업 ↓, 전문성·창의성 ↑",
      "24시간 운영: 고객 대응의 시간/채널 제약 해소",
      "데이터 기반 의사결정: 자동 수집/분석 데이터 활용",
    ],
  },
  process4D: [
    { step: "Define", title: "진단/목표정의", desc: "KPI·데이터·제약 분석, 비즈니스 케이스" },
    { step: "Design", title: "설계/파일럿", desc: "PoC 가설·성공기준·보안 설계" },
    { step: "Deliver", title: "구축/확산", desc: "Agent·RPA·시스템 연동, 교육" },
    { step: "Drive", title: "운영/고도화", desc: "모니터링·튜닝·확장" },
  ],
  steps6: [
    { idx: 1, title: "사례 발굴", desc: "벤치마크·현업 인터뷰로 아이디어 수집" },
    { idx: 2, title: "문제정의", desc: "As-Is/To-Be 정리, KPI·요건 명세" },
    { idx: 3, title: "파일럿 제작", desc: "데모(5일~2주)로 가설 검증" },
    { idx: 4, title: "리파인", desc: "피드백 반영·성능/UX 개선" },
    { idx: 5, title: "실무 적용", desc: "API/DB 연동·교육·운영 런북" },
    { idx: 6, title: "운영/개선", desc: "모니터링·A/B·지속 업데이트" },
  ],
  areas: [
    { field: "제조", desc: "품질관리, 생산계획 자동화" },
    { field: "유통", desc: "고객응대, 재고최적화" },
    { field: "교육", desc: "강의계획, 평가 자동화" },
    { field: "서비스", desc: "콜센터 상담, 품질 모니터링" },
  ],
  why: [
    "KPI 중심 PoC로 빠르게 성과를 검증하고 확산",
    "툴 도입이 아닌 프로세스 혁신 설계",
    "보안·컴플라이언스 사전 설계로 안심 도입",
    "전략→개발→운영까지 단일 파트너",
  ],
  compare: {
    headers: ["구분", "자체 도입", "AX 컨설팅 도입"],
    rows: [
      ["접근", "툴 중심", "프로세스 중심(설계/지표)"],
      ["리스크", "산발 PoC·운영 공백", "단계별 게이트·품질보증"],
      ["보안", "사후 대응", "사전 정책·분류·로깅"],
      ["ROI", "불확실", "PoC 내 KPI로 조기 검증"],
      ["운영", "개인 의존", "운영 체계·교육 패키지"],
    ],
  },
  graph: {
    title: "AI 도입 효과 지표",
    subtitle: "중소기업의 평균 개선률 (PoC 기준)",
    bars: [
      { label: "리드타임", value: 70 },
      { label: "비용", value: 22 },
      { label: "품질", value: 19 },
      { label: "CSAT", value: 11 },
    ],
  },
  overseas: {
    title: "최신 해외 AI 컨설팅 성과 사례 (2025)",
    subtitle: "글로벌 기업의 ROI 데이터",
    cards: [
      { company: "글로벌컨설팅펌 리포트(2025)", percent: 22, label: "생산성 향상" },
      { company: "글로벌컨설팅펌 리서치(2025)", percent: 16, label: "비용 절감" },
      { company: "대기업 Survey(2025)", multiple: 2.3, label: "매출 성장률" },
    ],
    source: "출처: 글로벌컨설팅펌 및 대기업 AI Reports (2025)",
  },
  cta: {
    title: "지금, AX와 AI 전환을 시작하세요",
    subtitle: "30분 무료 컨설팅으로 도입 가능성과 ROI를 진단해드립니다.",
    primary: "무료 상담 신청",
    secondary: "사례집 다운로드",
  },
  footer: {
    contact: "axconkr@gmail.com · 010-4739-0704",
    address: "© 2025 AX Consulting",
  },
};

// ====== 테마 (Bold Dark 고정) ======
const THEME = {
  bg: "bg-slate-950",
  text: "text-slate-100",
  accent: "#22d3ee",
  heroBg:
    "bg-[radial-gradient(circle_at_20%_20%,#0ea5e9_0%,transparent_35%),radial-gradient(circle_at_80%_0%,#22d3ee_0%,transparent_40%)]",
  card: "bg-slate-900/70 border border-slate-800 shadow-xl",
  chip: "bg-cyan-400/20 text-cyan-300 border border-cyan-400/30",
  buttonPrimary:
    "bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-5 py-3 rounded-xl button-hover",
  buttonGhost:
    "bg-transparent hover:bg-slate-900 text-slate-200 px-5 py-3 rounded-xl border border-slate-700 button-hover",
  table: "border border-slate-800",
};

// ====== 유틸 컴포넌트 ======
function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-3">
      {kicker && (
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: THEME.accent }}
        >
          {kicker}
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-extrabold leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg opacity-80">{subtitle}</p>
      )}
    </div>
  );
}

function StoryText({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.4 }}
      className="text-center my-12"
    >
      <div className="inline-block px-4 py-2 rounded-2xl border border-slate-800 bg-slate-900/60">
        <span className="text-2xl md:text-3xl font-extrabold italic tracking-wide text-cyan-300">
          "{text}"
        </span>
      </div>
    </motion.div>
  );
}

function Donut({ value }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const v = Math.max(0, Math.min(100, value));
  const offset = circumference - (v / 100) * circumference;
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <circle cx="40" cy="40" r={radius} stroke="#334155" strokeWidth="8" fill="none" />
      <circle
        cx="40"
        cy="40"
        r={radius}
        stroke={THEME.accent}
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white text-xs font-bold">
        {v}%
      </text>
    </svg>
  );
}

// ====== 섹션 ======
function Hero() {
  return (
    <header className={`${THEME.heroBg} ${THEME.text} py-20 md:py-28 relative overflow-hidden`}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border" style={{borderColor: THEME.accent, color: THEME.accent}}>
            {CONTENT.brand.tagline}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            {CONTENT.hero.title}
          </h1>
          <p className="text-base md:text-lg opacity-80">
            {CONTENT.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {CONTENT.hero.ctas.map((c) => (
              <a key={c.label} href={c.href} className={c.variant === "primary" ? THEME.buttonPrimary : THEME.buttonGhost}>
                {c.label}
              </a>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {CONTENT.hero.stats.map((s) => (
              <div key={s.label} className={`${THEME.card} rounded-2xl p-4 card-hover`}>
                <div className="text-2xl font-extrabold" style={{ color: THEME.accent }}>{s.kpi}</div>
                <div className="text-xs opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className={`${THEME.card} rounded-3xl p-6 md:p-10 aspect-[4/3] flex items-center justify-center`}>
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={THEME.accent} stopOpacity=".6" />
                  <stop offset="100%" stopColor={THEME.accent} stopOpacity=".2" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="360" height="260" rx="18" fill="url(#g1)" />
              <rect x="40" y="60" width="200" height="20" rx="6" fill="white" opacity=".85" />
              <rect x="40" y="100" width="320" height="14" rx="4" fill="white" opacity=".75" />
              <rect x="40" y="124" width="280" height="14" rx="4" fill="white" opacity=".65" />
              <rect x="40" y="148" width="200" height="14" rx="4" fill="white" opacity=".55" />
              <circle cx="320" cy="220" r="38" fill="white" opacity=".9" />
              <path d="M300 220h20l10-12 10 24 10-12h20" stroke={THEME.accent} strokeWidth="4" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}

function Current() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.current.title} subtitle={CONTENT.current.subtitle} />
      <ul className="max-w-3xl mx-auto px-6 mt-8 list-disc list-inside space-y-2 opacity-90">
        {CONTENT.current.points.map((p,i)=>(<li key={i}>{p}</li>))}
      </ul>
    </section>
  );
}

function FitMap() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.fit.title} subtitle={CONTENT.fit.subtitle} />
      <div className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
        <div className={`${THEME.card} rounded-2xl p-6`}>
          <div className="font-bold text-cyan-300 mb-2">자동화하기 쉬운 업무</div>
          <ul className="list-disc list-inside space-y-2 opacity-90">
            {CONTENT.fit.easy.map((t,i)=>(<li key={i}>{t}</li>))}
          </ul>
        </div>
        <div className={`${THEME.card} rounded-2xl p-6`}>
          <div className="font-bold text-rose-300 mb-2">자동화하기 어려운 업무</div>
          <ul className="list-disc list-inside space-y-2 opacity-90">
            {CONTENT.fit.hard.map((t,i)=>(<li key={i}>{t}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Checklist() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.checklist.title} subtitle="도입 전 필수 점검 항목" />
      <div className="max-w-5xl mx-auto px-6 mt-8 grid md:grid-cols-2 gap-4">
        {CONTENT.checklist.items.map((c,i)=>(
          <div key={i} className={`${THEME.card} rounded-xl p-4 flex items-start gap-3`}>
            <span className="mt-1 inline-block w-2.5 h-2.5 rounded-full" style={{background: THEME.accent}} />
            <span className="opacity-90 text-sm">{c}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Need() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.need.title} subtitle={CONTENT.need.subtitle} />
      <ul className="max-w-3xl mx-auto px-6 mt-8 list-disc list-inside space-y-2 opacity-90">
        {CONTENT.need.points.map((p,i)=>(<li key={i}>{p}</li>))}
      </ul>
    </section>
  );
}

function ProcessInfographic() {
  return (
    <section className={`py-16 md:py-24 ${THEME.text}`}>
      <SectionHeader kicker="AX 방법론" title="AM-4D: Define → Design → Deliver → Drive" subtitle="발굴–파일럿–확산–운영으로 리스크를 단계적으로 관리" />
      <div className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {CONTENT.process4D.map((p, i) => (
          <motion.div key={i} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} transition={{duration:.5, delay:i*.05}} viewport={{once:true}} className={`${THEME.card} rounded-full w-full aspect-square flex flex-col items-center justify-center text-center p-4 card-hover`}>
            <div className="font-bold" style={{color: THEME.accent}}>{p.step}</div>
            <div className="mt-2 text-sm font-semibold">{p.title}</div>
            <p className="mt-1 text-xs opacity-80 max-w-[12rem]">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Steps6() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title="도입 절차(6단계)" subtitle="파일럿부터 운영까지, 빠르게 검증하고 안정적으로 확산" />
      <div className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-6">
        {CONTENT.steps6.map((s,i)=>(
          <motion.div key={i} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} transition={{duration:.4, delay:i*.05}} viewport={{once:true}} className={`${THEME.card} rounded-2xl p-6`}>
            <div className="text-sm font-bold" style={{color: THEME.accent}}>STEP {s.idx}</div>
            <div className="mt-2 font-semibold">{s.title}</div>
            <p className="mt-1 text-sm opacity-80">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title="어디에 먼저 적용할까요?" subtitle="산업별 대표 적용 영역" />
      <div className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
        {CONTENT.areas.map((a,i)=>(
          <div key={i} className={`${THEME.card} rounded-2xl p-6 card-hover`}>
            <div className="font-bold" style={{color:THEME.accent}}>{a.field}</div>
            <p className="mt-2 opacity-80 text-sm">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyAX() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title="왜 AX 컨설팅인가?" subtitle="성공적 도입을 위한 명확한 이유" />
      <div className="max-w-4xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
        {CONTENT.why.map((w, i) => (
          <div key={i} className={`${THEME.card} rounded-2xl p-6 card-hover`}>{w}</div>
        ))}
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title="자체 도입 vs AX 컨설팅" subtitle="설계 중심 접근의 차이" />
      <div className="max-w-6xl mx-auto px-6 mt-10 overflow-x-auto">
        <table className={`w-full text-sm rounded-2xl ${THEME.table}`}>
          <thead>
            <tr className="bg-white/5">
              {CONTENT.compare.headers.map((h, i) => (
                <th key={i} className="p-3 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CONTENT.compare.rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-800/70">
                {r.map((cell, j) => (
                  <td key={j} className="p-3 align-top">
                    {j === 0 ? (
                      <span className="font-semibold">{cell}</span>
                    ) : (
                      <span className={j === 2 ? "font-semibold" : "opacity-90"}>{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function GraphSection() {
  return (
    <section className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.graph.title} subtitle={CONTENT.graph.subtitle} />
      <div className="max-w-4xl mx-auto px-6 mt-10">
        <svg viewBox="0 0 420 200" className="w-full h-56">
          {CONTENT.graph.bars.map((b, i) => (
            <g key={b.label}>
              <rect x={40 + i*90} y={200 - (b.value*1.4)} width="48" height={b.value*1.4} fill={THEME.accent} opacity={0.5 + i*0.1} />
              <text x={40 + i*90} y="190" className="text-xs fill-white" >{b.label}</text>
            </g>
          ))}
        </svg>
      </div>
      <p className="text-center text-xs opacity-60 mt-4">※ 수치는 프로젝트·데이터 품질에 따라 달라질 수 있습니다.</p>
    </section>
  );
}

function Overseas() {
  return (
    <section id="cases" className={`py-16 md:py-20 ${THEME.text}`}>
      <SectionHeader title={CONTENT.overseas.title} subtitle={CONTENT.overseas.subtitle} />
      <div className="max-w-5xl mx-auto px-6 mt-10 grid md:grid-cols-3 gap-6">
        {CONTENT.overseas.cards.map((c, i) => (
          <div key={i} className={`${THEME.card} rounded-2xl p-6 flex items-center justify-between card-hover`}>
            <div>
              <div className="font-semibold">{c.company}</div>
              <div className="text-sm opacity-80 mt-1">{c.label}</div>
            </div>
            {typeof c.percent === 'number' ? (
              <Donut value={c.percent} />
            ) : (
              <div className="text-2xl font-extrabold" style={{color: THEME.accent}}>{c.multiple}x</div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs opacity-60 text-center">{CONTENT.overseas.source}</p>
    </section>
  );
}

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const fd = new FormData(e.currentTarget);
      const formData = {
        name: fd.get('name'),
        company: fd.get('company'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        message: fd.get('message')
      };

      // 백엔드 API로 상담 신청 전송
      const response = await fetch('http://localhost:5000/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        e.target.reset(); // 폼 초기화
        
        // 성공 메시지 표시 후 5초 후 제거
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('상담 신청 전송 실패:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={`py-16 md:py-24 ${THEME.text}`}>
      <SectionHeader title="무료 상담 신청" subtitle="연락처를 남겨주시면 1영업일 내 회신드립니다." />
      <form onSubmit={submit} className="max-w-3xl mx-auto px-6 mt-8 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="이름" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-colors"/>
          <input name="company" required placeholder="회사명" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-colors"/>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="email" name="email" required placeholder="이메일" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-colors"/>
          <input name="phone" placeholder="연락처(선택)" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-colors"/>
        </div>
        <textarea name="message" rows={5} placeholder="상담이 필요한 업무/과제를 간단히 적어주세요" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 transition-colors"/>
        
        {/* 제출 버튼 */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`${THEME.buttonPrimary} w-full md:w-auto flex items-center justify-center gap-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
              전송 중...
            </>
          ) : (
            '제출하기'
          )}
        </button>

        {/* 상태 메시지 */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-900/20 border border-green-700 rounded-xl text-green-300 text-center">
            ✅ 상담 신청이 성공적으로 전송되었습니다! 1영업일 내로 연락드리겠습니다.
          </div>
        )}
        

        
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-xl text-red-300 text-center">
            ❌ 전송에 실패했습니다. 아래 이메일로 직접 연락해주세요.
          </div>
        )}

        <p className="text-xs opacity-60">전송이 안 되는 경우, <a href="mailto:axconkr@gmail.com" className="underline hover:text-cyan-400 transition-colors">axconkr@gmail.com</a>로 직접 메일 주세요.</p>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className={`${THEME.text} py-10 border-t border-slate-800`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-semibold">{CONTENT.brand.name}</div>
        <div className="opacity-80 text-sm">{CONTENT.footer.contact}</div>
        <div className="opacity-60 text-sm">{CONTENT.footer.address}</div>
      </div>
    </footer>
  );
}

// ====== 페이지 컴포넌트 ======
export default function AXCustomerSite() {
  return (
    <div className={`${THEME.bg} min-h-screen ${THEME.text}`}>
      <Hero />
      <Current />
      <StoryText text={CONTENT.storytelling.currentToFit} />
      <FitMap />
      <StoryText text={CONTENT.storytelling.fitToChecklist} />
      <Checklist />
      <StoryText text={CONTENT.storytelling.currentToNeed} />
      <Need />
      <StoryText text={CONTENT.storytelling.needToProcess} />
      <ProcessInfographic />
      <Steps6 />
      <StoryText text={CONTENT.storytelling.processToAreas} />
      <Areas />
      <StoryText text={CONTENT.storytelling.areasToWhy} />
      <WhyAX />
      <StoryText text={CONTENT.storytelling.whyToCompare} />
      <Compare />
      <StoryText text={CONTENT.storytelling.compareToGraph} />
      <GraphSection />
      <StoryText text={CONTENT.storytelling.graphToOverseas} />
      <Overseas />
      <Contact />
      <Footer />
    </div>
  );
}
