import { motion } from 'motion/react';
import { MILESTONES, ASPIRATIONS } from '../data';

export default function CareerView() {
  return (
    <div id="career-view-container" className="w-full">
      {/* Hero Section */}
      <header id="career-hero" className="relative h-[40vh] min-h-[320px] w-full mb-16 overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            id="career-hero-image"
            className="absolute inset-0 w-full h-full object-cover grayscale-[10%]"
            alt="Career Desk Background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVPom1WlPeDKc-Dt61Xqr78laSgQIlm81vl_jhWydiZbuCiL1FAlGuWwgLyv3ST01zGCL4aDRaU59SIam-kI6JeRFXXio7kh3BAq17J4rxhoJxlN-NaYYlI15T9UqM_3YIMxXU1FhenvWGZE-cx83_UYDSwfpB-Qdl3VE1SB_F0eXLhYMtwkJUsWxQnTijI4NsJyv2UtUAtDe6Uhfq9wbv129d6iboKXDOApYMKTqpF0-Qcbjb0HNmA32vmq-5jh8C2obNHO_HltM"
          />
          <div className="absolute inset-0 bg-[#012d1d]/30 z-10"></div>
        </div>
        <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-8 sm:pb-12 w-full text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-10 max-w-2xl border border-white/20 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#012d1d] mb-4">진로 탐색 기록</h1>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              학문적 열정과 창의적인 호기심을 바탕으로 그려나가는 미래의 청사진입니다. 한 걸음씩 나아가는 성장의 발자취를 기록합니다.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Bento Grid Career Overview */}
      <section id="career-overview" className="max-w-7xl mx-auto px-6 sm:px-12 mb-20 text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Vision Card */}
          <div className="md:col-span-2 bg-neutral-50 p-8 rounded-xl border border-[#2b694d]/10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[#2b694d] font-semibold text-xs tracking-wider mb-3 block">CORE VISION</span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#012d1d] mb-4">
                지속 가능한 기술로 세상을 연결하는 아키텍트
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-xl">
                기술의 발전이 인간의 삶의 질을 높일 뿐만 아니라 환경과 공존할 수 있는 미래를 꿈꿉니다. 인공지능과 데이터 사이언스를 활용하여 사회적 가치를 창출하는 소프트웨어 엔지니어가 되고자 합니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <span className="material-symbols-outlined text-[#2b694d] text-lg">psychology</span>
                <span className="text-xs font-medium text-gray-700">인공지능</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <span className="material-symbols-outlined text-[#2b694d] text-lg">database</span>
                <span className="text-xs font-medium text-gray-700">데이터 분석</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <span className="material-symbols-outlined text-[#2b694d] text-lg">eco</span>
                <span className="text-xs font-medium text-gray-700">지속가능성</span>
              </div>
            </div>
          </div>

          {/* Fast Fact Card */}
          <div className="bg-[#012d1d] text-white p-8 rounded-xl flex flex-col justify-center items-center text-center shadow-md">
            <span className="material-symbols-outlined text-4xl text-[#b0f1cc] mb-4">
              workspace_premium
            </span>
            <h3 className="text-2xl font-bold mb-2">GPA 4.0/4.0</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              수학 및 컴퓨터 사이언스<br />심화 과정 최우수 수료
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="career-milestones" className="max-w-7xl mx-auto px-6 sm:px-12 mb-20 text-left">
        <h2 className="text-2xl font-bold text-[#012d1d] mb-12 flex items-center gap-3">
          <span className="material-symbols-outlined text-xl text-[#2b694d]">timeline</span>
          활동 마일스톤
        </h2>

        {/* Timeline body with center line on desktop, left line on mobile */}
        <div className="relative border-l border-[#c1c8c2] md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-[#c1c8c2] space-y-12 pl-6 md:pl-0">
          {MILESTONES.map((item, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center justify-between pointer-events-none ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Desktop Text Section */}
                <div className={`hidden md:block w-[45%] ${isEven ? 'text-left pl-10' : 'text-right pr-10'}`}>
                  <span className="text-[#2b694d] font-bold text-xs">{item.period}</span>
                  <h3 className="text-lg font-bold text-[#012d1d] mt-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">{item.description}</p>
                </div>

                {/* Timeline Icon Node */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 md:-translate-x-1/2 w-10 h-10 bg-white border-2 border-[#2b694d] rounded-full flex items-center justify-center z-10">
                  <span className="material-symbols-outlined text-[#2b694d] text-lg select-none">
                    {item.iconName}
                  </span>
                </div>

                {/* Mobile / Other half image or content */}
                <div className="w-full md:w-[45%] pl-4 md:pl-0">
                  <div className="md:hidden text-left mb-3">
                    <span className="text-[#2b694d] font-bold text-xs">{item.period}</span>
                    <h3 className="text-md sm:text-lg font-bold text-[#012d1d] mt-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">{item.description}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
                  >
                    <img
                      className="w-full h-44 sm:h-52 object-cover"
                      alt={item.title}
                      src={item.image}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Aspiration Cards */}
      <section id="career-aspirations" className="bg-neutral-100 py-16 text-left">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <h2 className="text-2xl font-bold text-[#012d1d] mb-12">미래를 위한 약속 (Aspirations)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ASPIRATIONS.map((asp, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl border border-gray-200/60 hover:border-[#2b694d] transition-all duration-300 shadow-sm hover:shadow"
              >
                <div className="w-12 h-12 bg-[#b0f1cc] rounded-lg flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#0c5136]">
                    {asp.iconName}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#012d1d] mb-3">{asp.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{asp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
