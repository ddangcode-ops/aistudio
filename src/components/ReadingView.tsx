import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BOOKS } from '../data';
import { Book } from '../types';

const getCardBgColor = (category: string, id: string) => {
  switch (category) {
    case 'novel':
      return 'bg-[#dbdcde]'; // Soft cool light gray/slate (like Little Prince)
    case 'humanities':
      return 'bg-[#1c3c31]'; // Deep forest green/teal (like Demian, Sapiens)
    case 'science':
      if (id === 'clean-code' || id === '4') {
        return 'bg-[#153a2d]'; // Custom deep green for Clean Code
      }
      return 'bg-[#0f2e22]'; // Dark deep forest teal for AI
    case 'art':
      return 'bg-[#1a3a2e]'; // Art category custom bg
    default:
      return 'bg-[#1c3c31]';
  }
};

export default function ReadingView() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Stats Data
  const stats = [
    { label: '올해 읽은 책', value: '42' },
    { label: '서평 작성', value: '12' },
    { label: '기록된 생각', value: '1,580' },
    { label: '평균 평점', value: '4.8' },
  ];

  // Category map
  const categories = [
    { key: 'all', label: '전체' },
    { key: 'humanities', label: '인문/사회' },
    { key: 'science', label: '과학/기술' },
    { key: 'art', label: '예술/대중문화' },
    { key: 'novel', label: '소설/에세이' },
  ];

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const matchCategory =
        activeCategory === 'all' || book.category === activeCategory;
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  // Pagination logic (6 books per page)
  const itemsPerPage = 8; // Showing 8 items per page now so it fills up the grid beautifully!
  const pageCount = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBooks.slice(start, start + itemsPerPage);
  }, [filteredBooks, currentPage]);

  const handleOpenReview = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseReview = () => {
    setSelectedBook(null);
  };

  const goToNextBook = () => {
    if (!selectedBook) return;
    const currentIndex = ARTICLES.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex < ARTICLES.length - 1) {
      setSelectedBook(ARTICLES[currentIndex + 1]);
    }
  };

  const goToPrevBook = () => {
    if (!selectedBook) return;
    const currentIndex = ARTICLES.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex > 0) {
      setSelectedBook(ARTICLES[currentIndex - 1]);
    }
  };

  // List of all books available for prev/next navigation inside modal
  const ARTICLES = BOOKS;

  // Star Rating Helper
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[#2b694d] text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <span key={i} className="material-symbols-outlined text-[#2b694d] text-[15px]" style={{ fontVariationSettings: "'FILL' 0.5" }}>
            star_half
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="material-symbols-outlined text-gray-300 text-[15px]">
            star
          </span>
        );
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  return (
    <div id="reading-view-container" className="w-full relative text-left bg-[#f8f9fa] pb-24">
      {/* Hero Section Container matching width */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">
        <section id="reading-hero" className="relative h-[240px] w-full rounded-lg overflow-hidden flex items-center shadow-xs">
          {/* Backdrop library image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80')` }}
          ></div>
          {/* Subtle gradient dark overlay for readability without washing out colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10"></div>
          
          <div className="relative z-20 px-8 sm:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl text-left"
            >
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">생각의 깊이를 더하는 독서</h1>
              <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-lg font-light">
                지식의 경계를 넓히고 성찰의 시간을 갖는 저의 독서 활동 기록입니다.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Stats Counter section */}
      <section id="reading-stats" className="max-w-7xl mx-auto px-6 sm:px-12 mt-6 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-lg border border-gray-150 shadow-xs">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center py-2 sm:py-3 border-r last:border-r-0 border-gray-100">
              <span className="block text-xl sm:text-2xl font-bold text-[#144234] font-mono leading-none">{st.value}</span>
              <span className="block text-[11px] sm:text-xs text-gray-500 mt-1.5 font-medium">{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Reading Shelf Grid */}
      <section id="reading-content" className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8">
          {/* Quick category tabs */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#112d22] text-white shadow-sm'
                    : 'bg-[#f0f1f3] text-[#475569] hover:bg-[#e2e4e8]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <span className="material-symbols-outlined text-base">search</span>
            </span>
            <input
              type="text"
              placeholder="책 제목 또는 저자 검색"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-1.5 bg-[#f0f1f3] border-none rounded-md text-xs sm:text-sm text-[#112d22] focus:outline-none focus:ring-1 focus:ring-[#2b694d] focus:bg-white transition-all placeholder-gray-400"
            />
          </div>
        </div>

        {/* Dynamic book grid */}
        {paginatedBooks.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-200 rounded-none bg-gray-50">
            <span className="material-symbols-outlined text-gray-300 text-5xl mb-3">menu_book</span>
            <p className="text-gray-500 text-sm">검색 결과나 해당 카테고리에 일치하는 서평이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedBooks.map((book) => (
              <motion.div
                key={book.id}
                layoutId={`book-card-${book.id}`}
                className="bg-white border border-gray-200 rounded-none p-0 flex flex-col justify-between hover:shadow-md transition-all text-left overflow-hidden"
              >
                <div>
                  {/* Book cover visual frame (Sharp rectangles, zero rounded corners) */}
                  <div className={`relative h-[220px] w-full flex items-center justify-center p-6 ${getCardBgColor(book.category, book.id)} transition-colors duration-200`}>
                    <div className="relative h-[80%] aspect-[2/3] max-h-[170px] bg-white shadow-[6px_10px_20px_rgba(0,0,0,0.35)]">
                      <img
                        className="w-full h-full object-cover rounded-none"
                        alt={book.title}
                        src={book.coverImage}
                      />
                    </div>
                    
                    {/* Tiny badge at the top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#1b4332] text-white text-[10px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                        {book.categoryLabel || (book.category === 'humanities' ? '인문' : book.category === 'science' ? '과학' : book.category === 'art' ? '예술' : '소설')}
                      </span>
                    </div>
                  </div>

                  {/* Rating + Title inside custom padding */}
                  <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-start gap-1 pb-1">
                      <h3 className="font-extrabold text-[#112d22] text-[15px] sm:text-base leading-snug truncate pr-1" title={book.title}>
                        {book.title}
                      </h3>
                      <div className="flex-shrink-0 mt-0.5">
                        {renderStars(book.rating)}
                      </div>
                    </div>
                    
                    {/* Summary without author line, exactly matches the design layout */}
                    <p className="text-gray-500 text-xs sm:text-xs leading-relaxed line-clamp-3 min-h-[54px] mt-2">
                      {book.summary}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center bg-white text-xs">
                  <span className="text-gray-400 font-mono text-[10px] tracking-tight">{book.publishDate}</span>
                  <button
                    onClick={() => handleOpenReview(book)}
                    className="text-[#2b694d] hover:text-[#112d22] text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                  >
                    서평 읽기 <span className="material-symbols-outlined text-[12px] font-bold">chevron_right</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {pageCount > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded bg-gray-155 hover:bg-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 text-xs font-bold rounded ${
                  currentPage === idx + 1
                    ? 'bg-[#112d22] text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((c) => Math.min(c + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="w-8 h-8 flex items-center justify-center rounded bg-gray-155 hover:bg-gray-200 text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        )}
      </section>

      {/* Persistent "Currently Reading" Indicator (Bottom Right floating sticker) */}
      <div id="currently-reading-box" className="fixed bottom-6 right-6 z-40 max-w-[280px] bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex items-center gap-3 animate-bounce-subtle">
        <div className="relative w-11 h-11 flex-shrink-0">
          {/* Circular progress bar SVG */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#e1e3e4"
              strokeWidth="3.5"
              fill="transparent"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              stroke="#2b694d"
              strokeWidth="4.5"
              fill="transparent"
              strokeDasharray="113"
              strokeDashoffset="33.9" /* 70% progress: 113 * (1 - 0.70) = 33.9 */
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-600">70%</span>
          </div>
        </div>
        <div className="text-left overflow-hidden">
          <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">현재 읽고 있는 책</span>
          <span className="block text-xs font-bold text-[#012d1d] truncate">이기적 유전자</span>
          <span className="block text-[10px] text-gray-500 truncate">리처드 도킨스</span>
        </div>
      </div>

      {/* Review Modal - Rendered nicely with framer motion overlay */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReview}
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            />

            {/* Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative bg-white w-full max-w-5xl h-[85vh] max-h-[750px] rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseReview}
                className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>

              {/* Left Section: Book Metadata (35%) */}
              <div className="w-full md:w-[35%] bg-neutral-50 p-6 md:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
                <div className="flex flex-col items-center w-full">
                  {/* Book Cover Frame (3D feeling) */}
                  <div className="w-full max-w-[160px] md:max-w-[200px] aspect-[2/3] shadow-lg rounded-md overflow-hidden bg-white mb-6 transform hover:scale-[1.03] transition-transform border border-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      alt={selectedBook.title}
                      src={selectedBook.detailImage || selectedBook.coverImage}
                    />
                  </div>

                  <div className="w-full space-y-4">
                    <div className="text-left bg-white p-4 rounded-lg border border-gray-100">
                      <span className="text-[10px] text-[#2b694d] font-bold tracking-widest uppercase block mb-3">
                        About the book
                      </span>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">저자</span>
                          <span className="font-bold text-gray-700">{selectedBook.author}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">출판사</span>
                          <span className="font-bold text-gray-700">{selectedBook.publisher}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">발행일</span>
                          <span className="font-bold text-gray-700">{selectedBook.publishDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quality rating review bar */}
                    <div className="text-left bg-white p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                      <span className="text-[10px] text-[#2b694d] font-bold tracking-widest uppercase block">
                        MY RATINGS
                      </span>
                      <div className="flex items-center gap-2">
                        {renderStars(selectedBook.rating)}
                        <span className="text-xs font-mono font-bold text-[#012d1d]">{selectedBook.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full text-center text-[10px] text-gray-400 font-serif mt-6">
                  ICOMSSAM READING DIARY
                </div>
              </div>

              {/* Right Section: Content Review Body (65%) */}
              <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto flex flex-col bg-white">
                <div className="flex-1">
                  <header className="mb-6 pb-6 border-b border-gray-100 text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#012d1d] mb-2">{selectedBook.review.title}</h2>
                    <p className="text-[#2b694d] font-medium text-xs sm:text-sm italic border-l-4 border-[#2b694d] pl-3 py-1">
                      "{selectedBook.subtitle}"
                    </p>
                  </header>

                  <article className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-5 text-left mb-8">
                    {selectedBook.review.paragraphs.map((par, pidx) => (
                      <p key={pidx}>{par}</p>
                    ))}

                    {/* Beautiful Golden Box blockquote */}
                    <div className="bg-neutral-50 p-5 rounded-lg border-l-4 border-[#012d1d] mt-6">
                      <p className="italic text-gray-800 font-medium text-xs sm:text-sm">
                        "{selectedBook.review.quote}"
                      </p>
                      <p className="text-right text-[11px] font-bold text-[#2b694d] mt-2">
                        - {selectedBook.review.quoteSource}
                      </p>
                    </div>
                  </article>

                  {/* Badges footer */}
                  <div className="flex flex-wrap gap-1.5 justify-start mb-8">
                    {selectedBook.review.tags.map((tag, tid) => (
                      <span key={tid} className="bg-[#b0f1cc]/80 text-[#0c5136] px-2.5 py-1 rounded text-xs font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow navigation at modal footer */}
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-[#012d1d] transition-colors text-xs font-bold cursor-pointer">
                    <span className="material-symbols-outlined text-sm">share</span> 공유하기
                  </button>
                  <div className="flex gap-4">
                    <button
                      onClick={goToPrevBook}
                      disabled={BOOKS.findIndex((b) => b.id === selectedBook.id) === 0}
                      className="text-[#2b694d] hover:text-[#012d1d] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span> 이전 기록
                    </button>
                    <button
                      onClick={goToNextBook}
                      disabled={BOOKS.findIndex((b) => b.id === selectedBook.id) === BOOKS.length - 1}
                      className="text-[#2b694d] hover:text-[#012d1d] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      다음 기록 <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
