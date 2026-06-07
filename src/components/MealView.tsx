import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MEAL_PROJECT_HISTORY } from '../data';

export default function MealView() {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to '2024-06-04' (index 1)

  const currentMeal = MEAL_PROJECT_HISTORY[currentIndex];

  const handleNextDay = () => {
    if (currentIndex < MEAL_PROJECT_HISTORY.length - 1) {
      setCurrentIndex((idx) => idx + 1);
    }
  };

  const handlePrevDay = () => {
    if (currentIndex > 0) {
      setCurrentIndex((idx) => idx - 1);
    }
  };

  return (
    <div id="meal-view-container" className="w-[#100%] text-left">
      {/* Hero Banner header with blurry classroom backdrop */}
      <section id="meal-hero" className="relative h-[35vh] min-h-[280px] w-full mb-16 overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            id="meal-hero-backdrop"
            className="absolute inset-0 w-full h-full object-cover brightness-[60%] contrast-[105%]"
            alt="School Cafeteria"
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1200&q=80"
          />
          {/* subtle green vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 pb-10 w-full">
          <div className="bg-emerald-900/40 text-[#b0f1cc] px-3 py-1.5 rounded-full text-[10px] font-bold font-mono inline-flex items-center gap-1.5 mb-4 shadow-inner border border-white/10 uppercase">
            <span className="material-symbols-outlined text-[12px] fill-current">star</span>
            CS Project Case Study
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">청라 급식 도우미</h1>
          <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            학생들의 일상에 기술을 더하다. 매일의 식단을 확인하고 영양 정보를 분석하여 스마트한 학교 생활을 제안하는 하이퍼 웹 서비스입니다.
          </p>
        </div>
      </section>

      {/* Grid Content with project summary and Cafeteria simulator element */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-6 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Summary & Features (5 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-neutral-50 p-6 rounded-xl border border-gray-200 shadow-sm text-left">
              <h3 className="text-lg font-bold text-[#012d1d] mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                <span className="material-symbols-outlined text-base text-[#2b694d]">info</span>
                프로젝트 개요
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                교내 급식 정보를 공공 API를 통해 실시간으로 수집하고, 학생들에게 모바일 친화적으로 가공된 최적화된 UI로 전달하기 위해 제작되었습니다. 단순한 식사 제공 정보 조회를 넘어, 성장에 필요한 일일 권장 칼로리 계산 및 영양소 실시간 조율 기능이 탑재되어 있습니다.
              </p>

              <div className="space-y-3 font-medium">
                <div className="flex text-xs">
                  <span className="w-16 text-gray-400">Stack</span>
                  <span className="text-gray-700 font-semibold font-mono">React, Tailwind CSS, NEIS Open API</span>
                </div>
                <div className="flex text-xs">
                  <span className="w-16 text-gray-400">Period</span>
                  <span className="text-gray-700 font-semibold font-mono">2023.09 - 2023.11</span>
                </div>
              </div>
            </div>

            {/* Core Features */}
            <div>
              <h3 className="text-lg font-bold text-[#012d1d] mb-6">핵심 기능</h3>
              <div className="space-y-4 text-left">
                {/* 1. Realtime meal */}
                <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#2b694d] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#b0f1cc]/40 flex items-center justify-center text-[#0c5136]">
                    <span className="material-symbols-outlined text-lg">restaurant_menu</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#012d1d]">실시간 식단 조회</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">나이스(NEIS) 교육정보 개방 포털 API와의 유연한 비동기 바인딩 서비스</p>
                  </div>
                </div>

                {/* 2. Allergy visual */}
                <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#2b694d] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#b0f1cc]/40 flex items-center justify-center text-[#0c5136]">
                    <span className="material-symbols-outlined text-lg">warning_amber</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#012d1d]">알레르기 정보 제공</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">식재료 넘버링 기반의 유발 물질 경고 표기 및 안전한 대체 식품 안내</p>
                  </div>
                </div>

                {/* 3. Calories check */}
                <div className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#2b694d] transition-all">
                  <div className="w-10 h-10 rounded-full bg-[#b0f1cc]/40 flex items-center justify-center text-[#0c5136]">
                    <span className="material-symbols-outlined text-lg">bolt</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#012d1d]">오늘의 칼로리 계산</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-normal">한 끼 권장 섭취 대비 충족 에너지를 산출하는 칼로리 마이크로 메트릭스</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right School Meal Simulator Panel (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 text-left">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#012d1d]">오늘의 급식</h3>
                <p className="text-xs text-gray-400 mt-0.5">날짜 화살표를 눌러 실제 수집 데이터를 검증해보세요.</p>
              </div>

              {/* Date arrows navigators */}
              <div className="flex items-center gap-1.5 bg-neutral-100 p-1.5 rounded-lg border border-gray-200">
                <button
                  onClick={handlePrevDay}
                  disabled={currentIndex === 0}
                  className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-95 transition-all text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <div className="px-3">
                  <span className="text-xs font-bold text-gray-750 font-mono">
                    {currentMeal.date}
                  </span>
                </div>
                <button
                  onClick={handleNextDay}
                  disabled={currentIndex === MEAL_PROJECT_HISTORY.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed select-none active:scale-95 transition-all text-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </header>

            <span className="text-xs font-semibold text-gray-400 block mb-4 text-left">
              {currentMeal.dateStr}
            </span>

            {/* Food Grid Split (Main meal + statistics widgets) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Menu list items (7 columns) */}
              <div className="md:col-span-8 bg-neutral-50 rounded-lg p-4 border border-gray-100 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <span className="text-[10px] text-[#2b694d] font-bold tracking-widest block font-mono mb-3 uppercase">
                    MENU LIST
                  </span>

                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={currentMeal.date}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2 text-left"
                    >
                      {currentMeal.menu.map((food, fid) => (
                        <div key={fid} className="flex justify-between items-center bg-white p-2.5 rounded border border-gray-150 text-xs">
                          <span className="font-bold text-gray-700">{food.name}</span>
                          <span className="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] font-medium scale-95 uppercase">
                            {food.type}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Stats block layout widgets (4 columns) */}
              <div className="md:col-span-4 flex flex-col gap-4">
                {/* 1. Calories */}
                <div className="bg-[#1c2c24] text-white p-4 rounded-lg flex flex-col justify-center items-center text-center shadow-inner flex-1">
                  <span className="material-symbols-outlined text-xl text-[#b0f1cc] mb-1">local_fire_department</span>
                  <span className="text-2xl font-mono font-bold text-white leading-none">
                    {currentMeal.calories}
                  </span>
                  <span className="text-[9px] text-[#cee9d3] mt-2 block font-medium">Total kcal</span>
                </div>

                {/* 2. Feedback */}
                <div className="bg-[#b0f1cc]/40 text-[#0c5136] p-4 rounded-lg flex flex-col justify-center items-center text-center border border-[#b0f1cc]/80 flex-1">
                  <span className="material-symbols-outlined text-xl mb-1 text-[#2b694d]">thumb_up</span>
                  <span className="text-2xl font-mono font-bold text-[#012d1d] leading-none">
                    {currentMeal.satisfaction}%
                  </span>
                  <span className="text-[9px] text-gray-500 mt-2 block font-medium">Satisfaction</span>
                </div>
              </div>
            </div>

            {/* Nutrition reports inline graph progressbars */}
            <div className="mt-8 border-t border-gray-100 pt-6 text-left">
              <span className="text-[10px] text-[#2b694d] font-bold tracking-widest block font-mono mb-4 uppercase">
                영양 분석 리포트
              </span>

              <div className="space-y-4">
                {/* Carbs */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>탄수화물 ({currentMeal.nutrition.carbs}g)</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-[#012d1d] rounded"
                    ></motion.div>
                  </div>
                </div>

                {/* Protein */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>단백질 ({currentMeal.nutrition.protein}g)</span>
                    <span>20%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '20%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-[#2b694d] rounded"
                    ></motion.div>
                  </div>
                </div>

                {/* Fat */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                    <span>지방 ({currentMeal.nutrition.fat}g)</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '15%' }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="h-full bg-[#b3cdb7] rounded"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering approach milestones row (1, 2 box) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
          <div className="bg-white rounded-xl border border-gray-200/50 p-6 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded bg-[#012d1d] text-white flex items-center justify-center font-mono font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#012d1d] mb-1.5">NEIS API 파싱</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                교육청 식단 오픈 API 데이터를 직관적인 JSON 형태로 정기 바인딩 수집하고, 정규식(Regex)을 통해 영양 기호 등 불필요한 노이즈를 깨끗하게 정제하여 가독성을 극대화합니다.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200/50 p-6 flex items-start gap-4 shadow-sm">
            <div className="w-8 h-8 rounded bg-[#2b694d] text-[#b0f1cc] flex items-center justify-center font-mono font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#012d1d] mb-1.5">UI 컴포넌트 설계</h4>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                바쁜 하교/이동 시간 속에 학생들이 식당 복도에서 단 1초만에 일별 식단 및 칼로리를 즉시 인지하도록, 카드형 레이아웃과 감각적인 인덱스 뱃지를 설계했습니다.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Code Repository CTA display */}
      <section id="meal-cta" className="bg-[#012d1d] text-white py-14">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">프로젝트를 더 자세히 보고 싶으신가요?</h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            교육부 오픈 API 통합 바인딩 루틴과 React 상태 트리 전체가 포함된 기여 내역을 GitHub 저장소에서 언제든지 리뷰할 수 있습니다.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => {
                alert('GitHub: icomssam/cheongna-meal-helper 기여 저장소로 전송하는 모형 인터랙션입니다.');
              }}
              className="bg-white text-[#012d1d] hover:bg-neutral-100 font-bold text-xs sm:text-sm px-6 py-2.5 rounded shadow-lg transition-colors cursor-pointer"
            >
              View GitHub
            </button>
            <button
              onClick={() => {
                alert('Live Demo: 서비스 데모 버전이 준비되어 가동 중입니다.');
              }}
              className="border border-white hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded transition-colors cursor-pointer"
            >
              Live Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
