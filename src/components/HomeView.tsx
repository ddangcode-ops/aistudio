import { motion } from 'motion/react';
import { TabType } from '../types';

interface HomeViewProps {
  onSelectTab: (tab: TabType) => void;
}

export default function HomeView({ onSelectTab }: HomeViewProps) {
  return (
    <div id="home-view-container" className="w-full">
      {/* Hero Section */}
      <section id="home-hero-section" className="relative h-screen min-h-[600px] w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            id="home-hero-image"
            alt="Portfolio Hero"
            className="w-full h-full object-cover grayscale-[15%] brightness-[65%] contrast-[105%]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEZZtXRLbgizZbNUXdHk06jsTk1RARrzxw279w5_JWK_a-cUlKOAwxQkiqFBLysb9lv6msTOWHHYdWtzXPZEPY493hEpuMX3clGoiJzJYDqg0nSJbhrJze0PVi-BFNo8FrMCJ40eQhy1BgxuZvHYvp44ve8keuHRJBcVWXHpVbY3bfwUkHwZi8Qx4-c_hQRtoBLq6XTt_s3Yh_wL07zZmZee-fMAfGxmrvdNvs_i03JoyTiFaQ7D6Cr-AETF24Fucn0eYHJi89P0"
          />
          {/* Subtle green overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#012d1d]/60 via-[#012d1d]/30 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-2xl border-l-2 border-white/30 pl-6 md:pl-10 text-left"
          >
            <p className="text-[#cee9d3] font-medium text-xs md:text-sm tracking-[0.15em] mb-4 uppercase">
              PREMIUM EDUCATION PORTFOLIO
            </p>
            <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.2] tracking-tight">
              꿈을 향한 기록,<br />
              <span className="text-[#b0f1cc]">아이컴쌤</span>의 포트폴리오
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-10 leading-relaxed font-light">
              진로 탐색의 발걸음, 깊이 있는 독서 활동,<br />
              그리고 일상의 소소한 프로젝트들을 정성껏 담았습니다.
            </p>
            <div className="flex gap-4">
              <button
                id="btn-discover"
                onClick={() => onSelectTab('career')}
                className="bg-[#2b694d] text-white px-7 py-3.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all hover:bg-[#1b4332] active:scale-95 shadow-lg shadow-black/10 group cursor-pointer"
              >
                더 알아보기
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Projects Intro */}
      <section id="portfolio-overview" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-12 text-left">
            <span className="text-[#2b694d] text-sm font-semibold tracking-wider uppercase block mb-2">Structure</span>
            <h2 className="text-3xl font-bold text-[#012d1d] mb-3">Portfolio Overview</h2>
            <p className="text-gray-500 text-sm md:text-base">성장의 발자취를 세 가지 핵심 영역으로 분류하였습니다. 각각의 카드를 눌러 상세 내용을 확인해보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Career Card */}
            <motion.div
              onClick={() => onSelectTab('career')}
              whileHover={{ y: -8 }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-[#c1c8c2]/50 transition-all hover:border-[#2b694d] shadow-sm hover:shadow-md"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Career Path"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp4rKG16HTvggeuvDoAY-rra-a2VJDhOLAKSdXtd_kpiiAuvNI2kGiSGajRhuDtPVj74W_3RJuPKYlCHkq4ACtE4pMZKul9UsOu3pNMqFy8jllFTEBo1pDm9v76Iv4dsSMIrFkroHyvWIXZ1lLRT-tTWmgnoyd4fwoCJzjWcx3-abRtnnqURZcRUaeTEuhkotSAzn9xVzlFbWzPnIeZ3tFklDnK4UMpL2tIv8koIDbJwkTLRON7fM1E9m5Q7N2QY-vSkDZXy0W3SU"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-6 text-left">
                <span className="bg-[#b0f1cc] text-[#0c5136] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                  진로 탐색
                </span>
                <h3 className="text-xl font-bold text-[#012d1d] mb-2 group-hover:text-[#2b694d] transition-colors">
                  나의 미래 설계
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  소프트웨어 엔지니어를 꿈꾸며 진행한 전공 탐색 및 관련 마일스톤 활동들을 정밀하게 대입하여 탐사했습니다.
                </p>
              </div>
            </motion.div>

            {/* Reading Card */}
            <motion.div
              onClick={() => onSelectTab('reading')}
              whileHover={{ y: -8 }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-[#c1c8c2]/50 transition-all hover:border-[#2b694d] shadow-sm hover:shadow-md"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Reading List"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiyemTJTEywxC3uUS5LCtoGnRkZnmHyvvIw8xz1QKp79wCIT-G03EJhSqJqfJRfOWD1RK56v0QuFWs4-96vUuKE4JcST2B5aZg9yXaSoEMP9tjLNOrNyauGzuW7SvPASvG2foBuDH0p5qCXaO2b27s8T5hDitXtYyOcIDDw2V-ijD076Hv_czNeQl-vJV8A_LU2UY-txhESW-dIztQV_kqYxn7RZa3X94XWPQdMjOBrZgBQl_syMUXCyyLFH1wiMD4d3s5ccVC8ao"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-6 text-left">
                <span className="bg-[#b0f1cc] text-[#0c5136] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                  독서 활동
                </span>
                <h3 className="text-xl font-bold text-[#012d1d] mb-2 group-hover:text-[#2b694d] transition-colors">
                  지혜의 기록
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  인문학적 소양과 전공 지식을 넓히기 위해 꾸준히 정독한 세게 고전 및 현대 과학 서적들의 서평입니다.
                </p>
              </div>
            </motion.div>

            {/* Project Card */}
            <motion.div
              onClick={() => onSelectTab('retro')}
              whileHover={{ y: -8 }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-[#c1c8c2]/50 transition-all hover:border-[#2b694d] shadow-sm hover:shadow-md"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  alt="Retro Projects"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJj-7b55tzj-MGWj1ujep8fGB3gbatbbJ7Qtkru2JNUlJKb1wa4KqDUycyBoReqPmQwIbzX0Hk2bcmu1GK1u1azEbPdDfNDVsviFHXbT5CwyHmImuGABFZXs9v-jUVobO9ekxwa_M5KTiwibUr8VPxYVf01WaU-MrXJYTQfoFIWg1SRVU91JcJ-NgIPNhfytVfSkckod3KYcbMwwVzcjysE7X2mZAieOZxYW-LBwtsK_4QJGoUy4KOuTTHv3-nWQqUBMzFHFcUdtE"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-6 text-left">
                <span className="bg-[#b0f1cc] text-[#0c5136] px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3">
                  프로젝트
                </span>
                <h3 className="text-xl font-bold text-[#012d1d] mb-2 group-hover:text-[#2b694d] transition-colors">
                  창의적 도전
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  레트로 디자인의 JS 게임 개발부터 웹 급식 서비스 연동까지, 즐거웠던 개발 경험과 코드를 공유합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academic Quote Section */}
      <section id="academic-quote-section" className="relative py-28 overflow-hidden bg-[#012d1d] text-white">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <span className="material-symbols-outlined text-5xl mb-6 text-[#cee9d3]">
            format_quote
          </span>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-8 text-neutral-100 font-light">
            "배움은 멈추지 않는 여정이며, 나의 포트폴리오는 그 여정의 소중한 나침반입니다."
          </p>
          <div className="h-px w-16 bg-[#b0f1cc] mx-auto mb-6"></div>
          <p className="text-xs md:text-sm tracking-[0.25em] text-[#cee9d3]/80 uppercase">
            ICOMSSAM PORTFOLIO 2024
          </p>
        </div>
      </section>
    </div>
  );
}
