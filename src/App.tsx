import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TabType } from './types';
import HomeView from './components/HomeView';
import CareerView from './components/CareerView';
import ReadingView from './components/ReadingView';
import RetroView from './components/RetroView';
import MealView from './components/MealView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activeTab');
      if (saved === 'home' || saved === 'career' || saved === 'reading' || saved === 'retro' || saved === 'meal') {
        return saved as TabType;
      }
    }
    return 'home';
  });

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showGlobalContact, setShowGlobalContact] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setMobileMenuOpen(false);
  }, [activeTab]);

  const handleSendGlobalMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setShowGlobalContact(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 2000);
  };

  const navItems: { key: TabType; label: string }[] = [
    { key: 'home', label: '홈' },
    { key: 'career', label: '진로' },
    { key: 'reading', label: '독서활동' },
    { key: 'retro', label: '레트로게임' },
    { key: 'meal', label: '급식 도우미' },
  ];

  return (
    <div id="portfolio-app-root" className="min-h-screen bg-[#f8f9fa] text-[#191c1d] font-sans flex flex-col justify-between selection:bg-[#b0f1cc] selection:text-[#002113]">
      
      {/* Dynamic Header Navbar */}
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-[#c1c8c2]/30 shadow-sm py-3'
            : 'bg-white/70 backdrop-blur-sm border-b border-transparent py-4'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center w-full">
          {/* Logo Name */}
          <div
            onClick={() => setActiveTab('home')}
            className="text-xl sm:text-2xl font-bold text-[#012d1d] tracking-tight cursor-pointer select-none"
          >
            icomssam
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`relative text-sm font-medium transition-colors pb-1 cursor-pointer select-none ${
                    isActive
                      ? 'text-[#012d1d] font-bold'
                      : 'text-gray-500 hover:text-[#012d1d]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#012d1d] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Header Action Button (Contact) - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => setShowGlobalContact(true)}
              className="bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs sm:text-sm font-semibold px-5 py-2 rounded-full shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Mobile menu hamburger icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#012d1d] p-1.5 focus:outline-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile menu panels dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-left">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={`text-sm font-semibold py-1 border-b border-gray-50 text-left cursor-pointer ${
                      activeTab === item.key ? 'text-[#2b694d] font-bold' : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowGlobalContact(true);
                  }}
                  className="bg-[#012d1d] text-white text-xs font-bold py-2.5 rounded text-center w-full cursor-pointer mt-2"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Views - Tab Switcher with animations */}
      <main id="app-main-content" className="pt-16 flex-1 w-full bg-[#f8f9fa]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {activeTab === 'home' && <HomeView onSelectTab={setActiveTab} />}
            {activeTab === 'career' && <CareerView />}
            {activeTab === 'reading' && <ReadingView />}
            {activeTab === 'retro' && <RetroView />}
            {activeTab === 'meal' && <MealView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer view details */}
      <footer id="app-footer" className="bg-[#ffffff] border-t border-[#c1c8c2]/50 py-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <span className="font-bold text-base text-[#012d1d]">Student Portfolio</span>
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 High School Student Portfolio. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 text-xs sm:text-sm flex-wrap justify-center">
            <a href="#" className="text-gray-400 hover:text-[#012d1d] transition-colors leading-none">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#012d1d] transition-colors leading-none">Terms of Service</a>
            <a href="https://github.com/icomssam" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#012d1d] transition-colors leading-none">Github</a>
            <a href="#" className="text-gray-400 hover:text-[#012d1d] transition-colors leading-none">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Global Contact Form Modal */}
      <AnimatePresence>
        {showGlobalContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGlobalContact(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white max-w-md w-full rounded-xl shadow-2xl p-6 sm:p-8 z-10"
            >
              <button
                onClick={() => setShowGlobalContact(false)}
                className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <h3 className="text-xl font-bold text-[#012d1d] mb-2 text-left">메시지 보내기</h3>
              <p className="text-gray-500 text-xs text-left mb-6">아이컴쌤에게 포트폴리오 제언이나 교류 메시지를 남겨보세요.</p>

              {isSent ? (
                <div className="py-10 text-center">
                  <span className="material-symbols-outlined text-[#2b694d] text-5xl mb-3 animate-pulse">check_circle</span>
                  <p className="text-[#012d1d] font-bold text-sm">메시지가 정상 전송되었습니다!</p>
                  <p className="text-gray-400 text-xs mt-1">감사합니다. 입력하신 이메일/학번으로 답장드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handleSendGlobalMessage} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">성명 / 소속</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="예) 홍길동 / 컴퓨터 부서 부장"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d] focus:border-[#2b694d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">연락처 (이메일 수신)</label>
                    <input
                      type="text"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="예) name@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">전달할 메시지</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="내용을 입력하세요..."
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#2b694d] resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#012d1d] text-white py-2.5 rounded text-sm font-bold hover:bg-[#1b4332] transition-colors cursor-pointer"
                  >
                    전송하기
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
