import React from "react";
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
    needToProcess: "그렇다면, 어떻게 도입해야 할까요?",
    processToAreas: "어디부터 적용하는 것이 효과적일까요?",
    areasToWhy: "그렇다면, 왜 AX Consulting이어야 할까요?",
    whyToCompare: "자체 도입과 무엇이 다를까요?",
    compareToGraph: "성과는 실제로 어떻게 나타날까요?",
    graphToOverseas: "해외에서는 어떤 성과가 있었을까요?",
  },
  current: {
    title: "중소기업 AI 도입 현황",
    subtitle: "대기업 대비 낮은 도입률, 그러나 ROI 잠재력은 큼",
    points: [
      "중소기업의 AI 도입률은 25% 미만",
      "AI 도입 기업은 평균 18~30% 생산성 향상",
      "리소스·노하우 부족이 가장 큰 장벽",
    ],
  },
  need: {
    title: "왜 지금 AI 도입이 필요한가?",
    subtitle: "생존과 성장의 핵심 전략",
    points: [
      "반복 업무 자동화로 인력 효율 극대화",
      "고객경험 개선: 챗봇·개인화 마케팅",
      "의사결정 보조: 수요예측·재고 최적화",
    ],
  },
  process: [
    { step: "Define", title: "진단/목표정의", desc: "KPI·데이터·제약 분석, 비즈니스 케이스" },
    { step: "Design", title: "설계/파일럿", desc: "PoC 가설·성공기준·보안 설계" },
    { step: "Deliver", title: "구축/확산", desc: "Agent·RPA·시스템 연동, 교육" },
    { step: "Drive", title: "운영/고도화", desc: "모니터링·튜닝·확장" },
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
    "bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-5 py-3 rounded-xl",
  buttonGhost:
    "bg-transparent hover:bg-slate-900 text-slate-200 px-5 py-3 rounded-xl border border-slate-700",
  table: "border border-slate-800",
};

// ====== 유틸 컴포넌트 ======
function SectionHeader({ kicker, title, subtitle }: any) {
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

function StoryText({ text }: { text: string }) {
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
          “{text}”
        </span>
      </div>
    </motion.div>
  );
}

function Donut({ value }: { value: number }) {
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
              <div key={s.label} className={`${THEME.card} rounded-2xl p-4`}>
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
        {CONTENT.process.map((p, i) => (
          <motion.div key={i} initial={{opacity:0, y:16}} whileInView={{opacity:1, y:0}} transition={{duration:.5, delay:i*.05}} viewport={{once:true}} className={`${THEME.card} rounded-full w-full aspect-square flex flex-col items-center justify-center text-center p-4`}>
            <div className="font-bold" style={{color: THEME.accent}}>{p.step}</div>
            <div className="mt-2 text-sm font-semibold">{p.title}</div>
            <p className="mt-1 text-xs opacity-80 max-w-[12rem]">{p.desc}</p>
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
          <div key={i} className={`${THEME.card} rounded-2xl p-6`}>
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
          <div key={i} className={`${THEME.card} rounded-2xl p-6`}>{w}</div>
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
              <text x={40 + i*90} y={190} className="text-xs fill-white" >{b.label}</text>
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
          <div key={i} className={`${THEME.card} rounded-2xl p-6 flex items-center justify-between`}>
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
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get('name');
    const company = fd.get('company');
    const email = fd.get('email');
    const phone = fd.get('phone');
    const message = fd.get('message');
    const subject = encodeURIComponent(`[AX 상담요청] ${name} (${company})`);
    const body = encodeURIComponent(`이름: ${name}\n회사: ${company}\n이메일: ${email}\n연락처: ${phone}\n내용: ${message}`);
    window.location.href = `mailto:axconkr@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className={`py-16 md:py-24 ${THEME.text}`}>
      <SectionHeader title="무료 상담 신청" subtitle="연락처를 남겨주시면 1영업일 내 회신드립니다." />
      <form onSubmit={submit} className="max-w-3xl mx-auto px-6 mt-8 grid gap-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="name" required placeholder="이름" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
          <input name="company" required placeholder="회사명" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="email" name="email" required placeholder="이메일" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
          <input name="phone" placeholder="연락처(선택)" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
        </div>
        <textarea name="message" rows={5} placeholder="상담이 필요한 업무/과제를 간단히 적어주세요" className="bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"/>
        <button className={`${THEME.buttonPrimary} w-full md:w-auto`}>제출하기</button>
        <p className="text-xs opacity-60">전송이 안 되는 경우, <a href="mailto:axconkr@gmail.com" className="underline">axconkr@gmail.com</a>로 직접 메일 주세요.</p>
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
      <StoryText text={CONTENT.storytelling.currentToNeed} />
      <Need />
      <StoryText text={CONTENT.storytelling.needToProcess} />
      <ProcessInfographic />
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
