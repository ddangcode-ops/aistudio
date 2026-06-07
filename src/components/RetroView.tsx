import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RETRO_PROJECTS } from '../data';

export default function RetroView() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const mainProject = RETRO_PROJECTS[0]; // Pixel Odyssey
  const secondaryProject = RETRO_PROJECTS[1]; // Neon Runner
  const thirdProject = RETRO_PROJECTS[2]; // Algorithm Poker

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setShowContactModal(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 2000);
  };

  return (
    <div id="retro-view-container" className="w-[#100%] text-left">
      {/* Grid Banner decorative hero header */}
      <section id="retro-hero" className="relative py-16 bg-neutral-50 border-b border-gray-200 overflow-hidden">
        {/* Subtle matrix-like grid background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="bg-[#b3cdb7] text-[#012d1d] px-4 py-1.5 rounded-full text-xs font-bold font-mono inline-flex items-center gap-2 mb-6 shadow-sm border border-[#2b694d]/10">
            <span className="material-symbols-outlined text-[13px] fill-current">videogame_asset</span>
            CREATIVE GAME PROJECTS
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-[#012d1d] mb-6 leading-tight">
            즐거운 상상,<br />레트로 게임
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-10">
            직관적인 조작과 창의적인 로직을 담아낸 게임 포트폴리오입니다. 고전 게임의 재미를 현대적인 감각으로 재해석한 프로젝트들을 만나보세요.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#retro-projects-grid"
              className="bg-[#012d1d] text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-[#1b4332] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span> 플레이 하기
            </a>
            <button
              onClick={() => setShowContactModal(true)}
              className="border border-[#012d1d] text-[#012d1d] hover:bg-[#012d1d] hover:text-white px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              프로젝트 더보기
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section id="retro-projects-grid" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Massive Card (Pixel Odyssey) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div className="h-64 sm:h-96 w-full relative overflow-hidden bg-emerald-950">
              <img
                className="w-full h-full object-cover opacity-85"
                alt={mainProject.title}
                src={mainProject.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6 pointer-events-none"></div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] text-[#2b694d] font-bold tracking-widest block font-mono">
                  {mainProject.category}
                </span>
                <span className="material-symbols-outlined text-gray-400 hover:text-[#012d1d] transition-colors text-lg cursor-pointer">
                  open_in_new
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#012d1d] mb-4">
                {mainProject.title}
              </h3>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6">
                {mainProject.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {mainProject.tags.map((tg, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded text-xs font-semibold">
                    {tg}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Cards Stack */}
          <div className="flex flex-col gap-6">
            {/* Neon Runner */}
            <div className="bg-[#050f0b] text-white rounded-xl border border-emerald-950/20 overflow-hidden flex flex-col flex-1 p-6 justify-between shadow-sm">
              <div>
                <div className="aspect-video w-full rounded bg-emerald-950/20 mb-4 overflow-hidden relative">
                  <img
                    className="w-full h-full object-cover"
                    alt={secondaryProject.title}
                    src={secondaryProject.image}
                  />
                  <div className="absolute inset-0 bg-teal-950/40"></div>
                </div>
                <span className="text-[10px] text-[#b0f1cc] font-bold tracking-widest block font-mono mb-1">
                  NEON RUNNER
                </span>
                <h4 className="text-lg font-bold mb-2 text-white">{secondaryProject.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                  {secondaryProject.description}
                </p>
              </div>
              <button
                onClick={() => {
                  alert(`${secondaryProject.title}: 아직 개발 중인 알파 빌드 단계입니다. 추후 리드미 파일이 릴리즈됩니다!`);
                }}
                className="text-[#b0f1cc] hover:text-white transition-colors text-xs font-bold flex items-center gap-1 mt-6 cursor-pointer"
              >
                Review Details <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>

            {/* Now Working On (Space Colony Tycoon) */}
            <div className="bg-neutral-50 rounded-xl border border-gray-200/50 p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-50 to-amber-50/10">
              <div>
                <span className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mb-3 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  NOW WORKING ON
                </span>
                <h4 className="text-base font-bold text-[#012d1d] mb-2">Space Colony Tycoon</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  화성 기지를 건설하고 희귀 자원을 채굴하여 지속 가능한 문명을 설계하는 정교한 실시간 우주 경영 시뮬레이션 게임을 기획하고 있습니다.
                </p>
              </div>
              <div className="text-[10px] text-gray-400 font-mono mt-6">
                Expected Launch: Q4 2024
              </div>
            </div>
          </div>
        </div>

        {/* Third Project & Custom toolkit row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Algorithm Poker */}
          <div className="bg-[#b0f1cc]/15 rounded-xl border border-[#b0f1cc]/50 p-6 flex flex-col justify-between">
            <div className="mb-6">
              <span className="text-[10px] text-[#2b694d] font-bold tracking-widest block font-mono mb-2 uppercase">
                {thirdProject.category}
              </span>
              <h4 className="text-base font-bold text-[#012d1d] mb-3">{thirdProject.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                확률 통계를 활용한 심리전 게임으로, 주관과 데이터의 간극 속에서 정량적인 승리 전략을 수집하는 독창적인 프로젝트입니다.
              </p>
              <div className="flex flex-wrap gap-1">
                {thirdProject.tags.map((t, idx) => (
                  <span key={idx} className="bg-[#b0f1cc]/45 text-[#0c5136] text-[10px] px-2 py-0.5 rounded font-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 shadow-inner">
              <img className="w-full h-full object-cover" alt="Poker Algorithm" src={thirdProject.image} />
            </div>
          </div>

          {/* Dev Toolkit */}
          <div className="bg-[#1c2c24] text-white rounded-xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#cee9d3]/80 font-bold tracking-widest block font-mono mb-4 uppercase">
                Game Dev Toolkit
              </span>
              <div className="space-y-4 text-left">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#b0f1cc] text-lg mt-0.5">code</span>
                  <div>
                    <h5 className="text-xs font-bold text-gray-300">Logic &amp; Scripts</h5>
                    <p className="text-[#cee9d3] text-sm">Vanilla JS, TypeScript, Canvas API</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#b0f1cc] text-lg mt-0.5">palette</span>
                  <div>
                    <h5 className="text-xs font-bold text-gray-300">Artwork &amp; Asset</h5>
                    <p className="text-[#cee9d3] text-sm">Aseprite, Photoshop Pixelator</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-emerald-950/20 pt-4 text-center">
              <p className="text-xs text-neutral-400 font-serif italic">"코딩은 즐거움의 원동력입니다."</p>
            </div>
          </div>

          {/* Brief Steps Process (Dev Process) */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-left flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#2b694d] font-bold tracking-widest block font-mono mb-4 uppercase">
                나의 개발 과정
              </span>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg font-mono font-bold text-gray-300">01</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#012d1d]">기획 및 리서치</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">게임의 핵심 메커니즘을 정의하고 타겟 유저 피드백 모델을 구성합니다.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg font-mono font-bold text-gray-300">02</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#012d1d]">프로토타이핑</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">가장 중요한 조작감과 키 입력을 구현하여 실제 조작 느낌을 검증합니다.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg font-mono font-bold text-gray-300">03</span>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#012d1d]">디버깅 및 폴리싱</h5>
                    <p className="text-xs text-gray-500 leading-normal mt-0.5">예외 처리를 완벽히 설계하고 사운드, 시각 이벤트를 덧입혀 가치를 완성합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration banner */}
      <section id="retro-collab" className="bg-[#021d13] text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">함께 게임을 만들어볼까요?</h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-8">
            창의적인 아이디어와 기술적인 도전은 언제나 환영입니다. 저의 프로젝트가 마음에 드셨다면 간편히 노크해주세요.
          </p>
          <button
            onClick={() => setShowContactModal(true)}
            className="bg-white text-[#012d1d] hover:bg-neutral-100 px-8 py-3 rounded-md text-xs sm:text-sm font-bold transition-all transform active:scale-95 cursor-pointer shadow-lg"
          >
            메시지 보내기
          </button>
        </div>
      </section>

      {/* Contact Quick Form Modal */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white max-w-md w-full rounded-xl shadow-2xl p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-xl font-bold text-[#012d1d] mb-2 text-left">메시지 보내기</h3>
              <p className="text-gray-500 text-xs text-left mb-6">아이컴쌤에게 프로젝트 협업 혹은 격려의 편지를 전달해보세요.</p>

              {isSent ? (
                <div className="py-10 text-center">
                  <span className="material-symbols-outlined text-[#2b694d] text-5xl mb-3 animate-ping">check_circle</span>
                  <p className="text-[#012d1d] font-bold text-sm">메시지가 발송되었습니다!</p>
                  <p className="text-gray-400 text-xs mt-1">곧 입력하신 연락처나 학급으로 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">성명 / 소속</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="예) 홍길동 / 컴퓨터동아리 부장"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d] focus:border-[#2b694d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">이메일 혹은 학번</label>
                    <input
                      type="text"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="예) guest@gmail.com"
                      className="w-full px-3 py-2 border border-[#c1c8c2] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">내용</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="포트폴리오에 인상 깊은 점이나 제안 내용을 입력하세요..."
                      className="w-full px-3 py-2 border border-[#c1c8c2] rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d] resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#012d1d] text-white py-2.5 rounded text-sm font-bold hover:bg-[#1b4332] transition-colors cursor-pointer"
                  >
                    메시지 전송
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
