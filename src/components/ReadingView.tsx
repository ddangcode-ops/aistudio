import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book } from '../types';
import { BOOKS as defaultBooks } from '../data';
import { 
  fetchBooks, 
  createBook, 
  updateBook, 
  deleteBook, 
  getSupabaseCredentials, 
  saveSupabaseCredentials, 
  clearSupabaseCredentials,
  seedBooksToSupabase,
  SUPABASE_SQL_INSTRUCTION,
  getSupabaseClient
} from '../lib/supabase';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Settings, 
  Check, 
  Cloud, 
  Database, 
  Star, 
  ArrowLeft, 
  ArrowRight, 
  X, 
  ChevronLeft, 
  ChevronRight,
  DatabaseZap,
  Copy,
  AlertCircle,
  RefreshCw,
  Library,
  HelpCircle,
  Info,
  LogOut,
  Lock,
  User,
  Key
} from 'lucide-react';

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

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'
];

export default function ReadingView() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbSource, setDbSource] = useState<'supabase' | 'local'>('local');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filter and view states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Supabase Credentials Dialog State
  const [showCredModal, setShowCredModal] = useState(false);
  const [credUrl, setCredUrl] = useState('');
  const [credKey, setCredKey] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // User Authentication / Admin Mode state for GitHub / Vercel public distribution security (Option A)
  const [isAdminActive, setIsAdminActive] = useState<boolean>(false);
  const [adminPasscodeInput, setAdminPasscodeInput] = useState<string>('');
  
  // Supabase Official Auth Options
  const [authMethod, setAuthMethod] = useState<'supabase_auth' | 'passcode'>('supabase_auth');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [showDbSettingsForm, setShowDbSettingsForm] = useState<boolean>(false);

  // CRUD Form Dialog State
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    author: '',
    publisher: '',
    publishDate: '',
    rating: 5,
    category: 'humanities' as Book['category'],
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    summary: '',
    reviewTitle: '',
    reviewQuote: '',
    reviewQuoteSource: '',
    reviewParagraphsText: '',
    reviewTagsText: '',
  });

  // Reusable custom non-blocking popup dialog state (to bypass iframe window.alert/confirm blockages)
  const [customDialog, setCustomDialog] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'info' | 'error' | 'confirm' | 'success';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    show: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showAlert = (title: string, message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setCustomDialog({
      show: true,
      title,
      message,
      type,
      confirmText: '확인'
    });
  };

  const showConfirm = (title: string, message: string, onConfirm: () => void, confirmText = '확인', cancelText = '취소') => {
    setCustomDialog({
      show: true,
      title,
      message,
      type: 'confirm',
      confirmText,
      cancelText,
      onConfirm
    });
  };

  // Load books & credentials
  const loadData = async () => {
    setLoading(true);
    setErrorMessage(null);
    const res = await fetchBooks();
    setBooks(res.books);
    setDbSource(res.source);
    if (res.error) {
      setErrorMessage(res.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // Prefill credentials config inputs
    const creds = getSupabaseCredentials();
    setCredUrl(creds.url);
    setCredKey(creds.key);
    
    // Check local admin active status
    const isLocalAdmin = localStorage.getItem('icomssam_admin_active_local') === 'true' || localStorage.getItem('icomssam_admin_active') === 'true';
    setIsAdminActive(isLocalAdmin);
  }, []);

  // Supabase Auth session listener to auto-authenticate
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) return;

    // Check existing active session on load
    client.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAdminActive(true);
        localStorage.setItem('icomssam_admin_active', 'true');
      }
    });

    // Subscribe to auth state transitions
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAdminActive(true);
        localStorage.setItem('icomssam_admin_active', 'true');
      } else {
        const isLocalAdmin = localStorage.getItem('icomssam_admin_active_local') === 'true';
        if (!isLocalAdmin) {
          setIsAdminActive(false);
          localStorage.removeItem('icomssam_admin_active');
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [credUrl, credKey]);

  // Compute stats on current loaded list dynamically
  const stats = useMemo(() => {
    const totalCount = books.length;
    const reviewWithParagraphs = books.filter(b => b.review?.paragraphs && b.review.paragraphs.length > 0 && b.review.paragraphs[0] !== '작성된 서평이 없습니다.').length;
    const totalLines = books.reduce((acc, b) => acc + (b.review?.paragraphs?.join(' ').length || 0), 0);
    const avgRating = totalCount > 0 
      ? (books.reduce((sum, b) => sum + (b.rating || 0), 0) / totalCount).toFixed(1) 
      : '0.0';

    return [
      { label: '전체 기록 책 수', value: String(totalCount) },
      { label: '서평 작성', value: String(reviewWithParagraphs) },
      { label: '기록된 글자수', value: totalLines.toLocaleString() + '자' },
      { label: '평균 평점', value: String(avgRating) },
    ];
  }, [books]);

  // Category mapping
  const categories = [
    { key: 'all', label: '전체' },
    { key: 'humanities', label: '인문/사회' },
    { key: 'science', label: '과학/기술' },
    { key: 'art', label: '예술/대중문화' },
    { key: 'novel', label: '소설/에세이' },
  ];

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchCategory =
        activeCategory === 'all' || book.category === activeCategory;
      const matchSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [books, activeCategory, searchQuery]);

  // Pagination logic (8 books per page)
  const itemsPerPage = 8;
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
    const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex < books.length - 1) {
      setSelectedBook(books[currentIndex + 1]);
    }
  };

  const goToPrevBook = () => {
    if (!selectedBook) return;
    const currentIndex = books.findIndex((b) => b.id === selectedBook.id);
    if (currentIndex > 0) {
      setSelectedBook(books[currentIndex - 1]);
    }
  };

  // Star Rating rendering helper
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 fill-[#2b694d] text-[#2b694d]" />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative w-3.5 h-3.5 text-gray-300">
            <Star className="absolute top-0 left-0 w-3.5 h-3.5 fill-[#2b694d] text-[#2b694d] clip-half" />
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-gray-300" />
        );
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Admin Mode activation codes for security (Option A)
  const handleUnlockAdminMode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authMethod === 'passcode') {
      if (adminPasscodeInput === 'icomssam77' || adminPasscodeInput === '1024') {
        localStorage.setItem('icomssam_admin_active_local', 'true');
        localStorage.setItem('icomssam_admin_active', 'true');
        setIsAdminActive(true);
        setAdminPasscodeInput('');
        showAlert("관리자 인증 성공", "독서 기록의 추가, 수정, 삭제 및 데이터 주입(Seed) 관리 권한이 모두 활성화되었습니다.", "success");
      } else {
        showAlert("인증 실패", "관리자 패스코드가 일치하지 않습니다. 다시 입력해 주세요.", "error");
      }
    } else {
      // Supabase Authenticated Login
      const client = getSupabaseClient();
      if (!client) {
        showAlert("연동 오류", "Supabase 클라우드가 현재 설정되어 있지 않습니다. 책 검색창 오른쪽에 배치된 '관리자 로그인' (톱니바퀴 아이콘 ⚙️) 버튼을 눌러 연동 설정을 먼저 완료해 주세요.", "error");
        return;
      }
      
      if (!authEmail || !authPassword) {
        showAlert("입력 필요", "이메일과 비밀번호를 모두 입력해 주세요.", "error");
        return;
      }

      setIsAuthenticating(true);
      try {
        const { data, error } = await client.auth.signInWithPassword({
          email: authEmail.trim(),
          password: authPassword,
        });

        if (error) {
          showAlert("인증 실패", `Supabase Auth 로그인 오류: ${error.message}`, "error");
        } else if (data?.user) {
          localStorage.setItem('icomssam_admin_active', 'true');
          setIsAdminActive(true);
          showAlert("공식 Auth 인증 성공", `환영합니다! (${data.user.email}) 데이터베이스 수준의 완벽한 독서 기록 관리 권한이 부여되었습니다.`, "success");
          setAuthEmail('');
          setAuthPassword('');
        }
      } catch (err: any) {
        showAlert("오류", err.message || "인증 처리 도중 예기치 못한 네트워크 오류가 발생했습니다.", "error");
      } finally {
        setIsAuthenticating(false);
      }
    }
  };

  const handleLockAdminMode = async () => {
    localStorage.removeItem('icomssam_admin_active');
    localStorage.removeItem('icomssam_admin_active_local');
    setIsAdminActive(false);
    
    const client = getSupabaseClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (e) {
        console.warn('Supabase signout issue:', e);
      }
    }
    
    showAlert("관리자 해제 완료", "관리자 모드가 완전히 종료되었습니다. 이제 일반 방문자 모드로만 화면이 로드됩니다.", "info");
  };

  // Credential Management actions
  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseCredentials(credUrl, credKey);
    setShowCredModal(false);
    loadData();
  };

  const handleResetCredentials = () => {
    clearSupabaseCredentials();
    setCredUrl('');
    setCredKey('');
    setShowCredModal(false);
    loadData();
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_INSTRUCTION);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleUploadSeeds = async () => {
    if (!isAdminActive) {
      showAlert(
        "권한 조치 필요",
        "초기 명작 샘플 데이터를 전송하기 위해서는 먼저 관리자 권한을 인증해 주세요. (DB 연동 설정에서 인증이 가능합니다.)",
        "error"
      );
      return;
    }

    // If they typed in the inputs, but have not saved yet, let's auto-save to make it seamless!
    const currentCreds = getSupabaseCredentials();
    if (!currentCreds.isConfigured && credUrl.trim() && credKey.trim()) {
      saveSupabaseCredentials(credUrl, credKey);
      await loadData();
    }

    // Checking if config is fully ready
    const finalCreds = getSupabaseCredentials();
    if (!finalCreds.isConfigured) {
      showAlert(
        "연동 정보 및 설정 누락",
        "먼저 상단의 SUPABASE URL과 ANON KEY를 입력해 주세요! 입력 후 이 버튼을 누르시면 자동 저장 및 초기 명작 샘플 데이터 연동(Seed)이 완료됩니다.",
        "info"
      );
      return;
    }

    showConfirm(
      "초기 데이터 연동",
      "본인의 Supabase 테이블(icomssam_books)에 데미안 등 6개 초기 샘플 데이터를 업로드하시겠습니까? (기존 데이터와 충돌 시 덮어씁니다.)",
      async () => {
        setIsSeeding(true);
        const res = await seedBooksToSupabase(defaultBooks);
        setIsSeeding(false);
        if (res.error) {
          showAlert("동기화 오류", "동기화 중 오류가 발생했습니다: " + res.error, "error");
        } else {
          showAlert("설정 완료", `성공적으로 ${res.count}개의 독서 기록을 본인의 Supabase에 연동 저장(Seed)을 완료했습니다!`, "success");
          loadData();
        }
      },
      "예, 전송합니다 (Seed)",
      "취소"
    );
  };

  // CRUD events
  const handleOpenCreate = () => {
    if (!isAdminActive) {
      showAlert("인증 권한 없음", "새 도서 기록을 추가하기 위해서는 관리자 권한이 요구됩니다.", "error");
      return;
    }
    setFormMode('create');
    setFormData({
      id: 'book-' + Math.random().toString(36).substring(2, 9),
      title: '',
      subtitle: '',
      author: '',
      publisher: '',
      publishDate: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
      rating: 5,
      category: 'humanities',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
      summary: '',
      reviewTitle: '',
      reviewQuote: '',
      reviewQuoteSource: '본문 중에서',
      reviewParagraphsText: '',
      reviewTagsText: '',
    });
    setShowFormModal(true);
  };

  const handleOpenEdit = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdminActive) {
      showAlert("인증 권한 없음", "도서 기록을 수정하기 위해서는 관리자 권한이 요구됩니다.", "error");
      return;
    }
    setFormMode('edit');
    setFormData({
      id: book.id,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      publisher: book.publisher,
      publishDate: book.publishDate,
      rating: book.rating,
      category: book.category,
      coverImage: book.coverImage,
      summary: book.summary,
      reviewTitle: book.review?.title || '',
      reviewQuote: book.review?.quote || '',
      reviewQuoteSource: book.review?.quoteSource || '본문 중에서',
      reviewParagraphsText: book.review?.paragraphs ? book.review.paragraphs.join('\n\n') : '',
      reviewTagsText: book.review?.tags ? book.review.tags.join(', ') : '',
    });
    setShowFormModal(true);
  };

  const handleDeleteBook = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdminActive) {
      showAlert("인증 권한 없음", "도서 기록을 삭제하기 위해서는 관리자 권한이 요구됩니다.", "error");
      return;
    }
    showConfirm(
      "기록 삭제",
      "정말로 이 독서 기록을 완전히 삭제하시겠습니까?",
      async () => {
        const res = await deleteBook(id);
        if (res.success) {
          if (selectedBook && selectedBook.id === id) {
            setSelectedBook(null);
          }
          loadData();
        } else {
          showAlert("삭제 실패", "삭제에 실패했습니다: " + res.error, "error");
        }
      },
      "삭제",
      "취소"
    );
  };

  const handleSaveBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showAlert("입력 항목 누락", "책 제목은 필수 항목입니다.", "error");
      return;
    }

    const prs = formData.reviewParagraphsText
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);

    const tags = formData.reviewTagsText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const refinedBook: Book = {
      id: formData.id,
      title: formData.title,
      subtitle: formData.subtitle,
      author: formData.author,
      publisher: formData.publisher,
      publishDate: formData.publishDate,
      rating: Number(formData.rating),
      category: formData.category,
      coverImage: formData.coverImage,
      summary: formData.summary,
      review: {
        title: formData.reviewTitle || `${formData.title}을 읽고`,
        quote: formData.reviewQuote,
        quoteSource: formData.reviewQuoteSource || '본문 중에서',
        paragraphs: prs.length > 0 ? prs : ['작성된 서평이 없습니다.'],
        tags: tags
      }
    };

    let result;
    if (formMode === 'create') {
      result = await createBook(refinedBook);
    } else {
      result = await updateBook(refinedBook);
    }

    if (result.success) {
      setShowFormModal(false);
      loadData();
    } else {
      showAlert("독서 기록 저장 실패", "독서 기록 저장에 실패했습니다: " + result.error, "error");
    }
  };

  return (
    <div id="reading-view-container" className="w-full relative text-left bg-[#f8f9fa] pb-24">
      {/* Top Warning Banner if table does not exist or connection failed */}
      {errorMessage && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 py-3 px-6 sm:px-12 flex items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button 
            onClick={() => setShowCredModal(true)}
            className="underline hover:text-amber-700 font-bold flex-shrink-0 cursor-pointer"
          >
            설정 가이드 열기
          </button>
        </div>
      )}

      {/* Hero Section Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 pt-8">
        <section id="reading-hero" className="relative min-h-[220px] py-8 sm:py-0 w-full rounded-lg overflow-hidden flex items-center shadow-xs">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center" 
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent z-10" />
          
          <div className="relative z-20 px-8 sm:px-12 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl text-left"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#b0f1cc]/30 text-[#b0f1cc] mb-3 uppercase">
                Academic Portfolio
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">생각의 깊이를 더하는 독서</h1>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                인문학적 사유와 기술 혁신에 관한 책들을 정갈히 탐독하고 가꾼 지적 발자취입니다.
              </p>
            </motion.div>

            {/* Cleaned Top Hero space without redundant elements */}
          </div>
        </section>
      </div>

      {/* Stats Counter section */}
      <section id="reading-stats" className="max-w-7xl mx-auto px-6 sm:px-12 mt-6 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-5 rounded-lg border border-gray-150 shadow-sm">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center py-2 sm:py-3 border-r last:border-r-0 border-gray-100 last:border-none">
              <span className="block text-xl sm:text-2xl font-bold text-[#144234] font-mono leading-none">{st.value}</span>
              <span className="block text-[11px] sm:text-xs text-gray-400 mt-2 font-semibold uppercase tracking-wider">{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Reading Shelf Grid */}
      <section id="reading-content" className="max-w-7xl mx-auto px-6 sm:px-12 py-10">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-8">
          {/* Quick category tabs */}
          <div className="flex flex-wrap gap-2">
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

          {/* Action buttons (Search & Create) */}
          <div className="flex flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="w-4 h-4" />
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

            {/* Supabase Settings Gear Icon Button */}
            <button
               onClick={() => setShowCredModal(true)}
               className="border border-[#2b694d] text-[#2b694d] hover:bg-[#2b694d] hover:text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
               title="Supabase 데이터베이스 연동 및 관리 설정"
            >
              <Settings className="w-4 h-4 text-[#2b694d] group-hover:text-white" />
              <span>{isAdminActive ? 'DB 및 관리자 설정' : '관리자 로그인'}</span>
            </button>

            {/* Logout button on Dashboard if Admin Mode is active */}
            {isAdminActive && (
              <button
                onClick={handleLockAdminMode}
                className="border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer flex-shrink-0"
                title="관리자 로그아웃"
              >
                <LogOut className="w-4 h-4 text-rose-600 group-hover:text-white" />
                <span>로그아웃</span>
              </button>
            )}

            {/* Add Book Button conditionally on admin mode */}
            {isAdminActive ? (
              <button
                onClick={handleOpenCreate}
                className="bg-[#2b694d] hover:bg-[#1b4332] text-white text-xs sm:text-sm font-bold pl-3 pr-4 py-1.5 rounded flex items-center gap-1 shadow-sm leading-6 transition-all active:scale-95 cursor-pointer flex-shrink-0 animate-fade-in"
              >
                <Plus className="w-4 h-4" />
                <span>독서 기록 추가</span>
              </button>
            ) : (
              <div className="text-[11px] font-bold text-gray-500 bg-gray-150 px-3 py-1.5 rounded flex items-center gap-1 cursor-default select-none transition-all border border-gray-200">
                <span>방문자 모드 (읽기전용 🔒)</span>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic book grid */}
        {loading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-10 h-10 text-[#2b694d] animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">독서 기록 데이터를 불러오는 중입니다...</p>
          </div>
        ) : paginatedBooks.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-gray-200 rounded bg-gray-50/50">
            <Library className="text-gray-300 w-12 h-12 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">기록된 서평이 아직 없습니다.</p>
            <p className="text-gray-400 text-xs mt-1">상단의 "독서 기록 추가" 버튼을 눌러 첫 번째 생각 비축 기록을 만들어 보세요!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {paginatedBooks.map((book) => (
              <motion.div
                key={book.id}
                layoutId={`book-card-${book.id}`}
                className="bg-white border border-gray-200 rounded p-0 flex flex-col justify-between hover:shadow-md transition-all text-left overflow-hidden relative group"
              >
                <div>
                  {/* Book cover visual frame (Sharp rectangles, zero rounded corners) */}
                  <div className={`relative h-[220px] w-full flex items-center justify-center p-6 ${getCardBgColor(book.category, book.id)} transition-colors duration-200`}>
                    <div className="relative h-[80%] aspect-[2/3] max-h-[170px] bg-white shadow-[6px_10px_20px_rgba(0,0,0,0.35)] cursor-pointer" onClick={() => handleOpenReview(book)}>
                      <img
                        className="w-full h-full object-cover rounded-none"
                        alt={book.title}
                        src={book.coverImage}
                      />
                    </div>
                    
                    {/* Badge at top-left */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-[#1b4332] text-white text-[10px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                        {book.categoryLabel || (book.category === 'humanities' ? '인문' : book.category === 'science' ? '과학' : book.category === 'art' ? '예술' : '소설')}
                      </span>
                    </div>

                    {/* Operational controls overlay (Hover action button bar - Only shown for Admin Mode) */}
                    {isAdminActive && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                        <button
                          onClick={(e) => handleOpenEdit(book, e)}
                          className="p-1.5 bg-white text-[#2b694d] hover:bg-[#b0f1cc] rounded shadow-md transition-all cursor-pointer"
                          title="수정"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteBook(book.id, e)}
                          className="p-1.5 bg-white text-rose-600 hover:bg-rose-50 rounded shadow-md transition-all cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rating + Title inside custom padding */}
                  <div className="p-4 flex flex-col cursor-pointer" onClick={() => handleOpenReview(book)}>
                    <div className="flex justify-between items-start gap-1 pb-1">
                      <h3 className="font-extrabold text-[#112d22] text-[15px] sm:text-base leading-snug truncate pr-1" title={book.title}>
                        {book.title}
                      </h3>
                      <div className="flex-shrink-0 mt-0.5">
                        {renderStars(book.rating)}
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-[11px] font-medium block truncate">저자: {book.author} • {book.publisher}</p>
                    
                    <p className="text-gray-500 text-xs sm:text-xs leading-relaxed line-clamp-3 min-h-[54px] mt-2 border-t border-gray-50 pt-2">
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
                    서평 읽기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && pageCount > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded bg-[#e2e4e8] hover:bg-[#dbdcde] text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-8 h-8 text-xs font-bold rounded ${
                  currentPage === idx + 1
                    ? 'bg-[#112d22] text-white'
                    : 'bg-gray-100 hover:bg-[#e2e4e8] text-gray-650'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((c) => Math.min(c + 1, pageCount))}
              disabled={currentPage === pageCount}
              className="w-8 h-8 flex items-center justify-center rounded bg-[#e2e4e8] hover:bg-[#dbdcde] text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>



      {/* 2. Supabase Integration Setup Credentials Modal */}
      <AnimatePresence>
        {showCredModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCredModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-lg shadow-2xl p-6 overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <DatabaseZap className="w-5 h-5 text-[#2b694d]" />
                  <h3 className="text-lg font-bold text-[#012d1d]">Supabase 클라우드 연동 정보 설정</h3>
                </div>
                <button 
                  onClick={() => setShowCredModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 py-4">
                {!isAdminActive ? (
                  <div className="space-y-4">
                    {/* STEP 1: Supabase DB 연결 설정 */}
                    <div className="bg-[#f3f9f6] border border-emerald-150 rounded-lg p-5 shadow-xs text-left">
                      <div className="flex gap-2.5 items-start mb-3">
                        <DatabaseZap className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 leading-tight">1단계: Supabase 연결 정보 설정 (필수)</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed mt-1 font-light">
                            포트폴리오 본인 소유의 Supabase DB를 브라우저 로컬 저장소에 연동합니다. 연동이 저장되어야 관리자 기능(글쓰기/수정/삭제)과 공식 로그인을 사용할 수 있습니다.
                          </p>
                        </div>
                      </div>

                      {!(credUrl.trim() && credKey.trim()) || showDbSettingsForm ? (
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          saveSupabaseCredentials(credUrl, credKey);
                          loadData();
                          setShowDbSettingsForm(false);
                          showAlert("연동 완료", "Supabase 클라우드 연결 정보가 성공적으로 저장되었습니다. 계속해서 2단계 인증을 진행해 주세요.", "success");
                        }} className="space-y-3 pt-1 border-t border-emerald-100/50">
                          <div>
                            <label className="block text-[10px] font-bold text-[#012d1d] mb-1">
                              SUPABASE URL
                            </label>
                            <input
                              type="url"
                              placeholder="https://yourprojectid.supabase.co"
                              required
                              value={credUrl}
                              onChange={(e) => setCredUrl(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-[#012d1d] mb-1">
                              SUPABASE ANON KEY (PUBLIC KEY)
                            </label>
                            <input
                              type="password"
                              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                              required
                              value={credKey}
                              onChange={(e) => setCredKey(e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                            />
                          </div>

                          <div className="flex justify-end gap-2 pt-1">
                            {credUrl && credKey && (
                              <button
                                type="button"
                                onClick={() => setShowDbSettingsForm(false)}
                                className="px-3 py-1.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-[10px] font-bold rounded cursor-pointer transition-colors"
                              >
                                취소
                              </button>
                            )}
                            <button
                              type="submit"
                              className="px-3 py-1.5 bg-[#2b694d] hover:bg-[#1b4332] text-white text-[10px] font-bold rounded cursor-pointer hover:shadow-sm"
                            >
                              연동 정보 저장 및 활성화
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="pt-2.5 border-t border-emerald-100/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-2.5 rounded border border-emerald-100">
                          <div className="text-xs">
                            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-[11px]">
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span>📡 Supabase 연결 활성화됨</span>
                            </div>
                            <span className="block text-[10px] text-gray-400 mt-0.5 truncate max-w-[320px]">
                              URL: {credUrl} (저장 완료)
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowDbSettingsForm(true)}
                            className="px-2.5 py-1 text-emerald-700 hover:text-white hover:bg-emerald-700 border border-emerald-600 rounded text-[10px] font-bold transition-all cursor-pointer"
                          >
                            연동 정보 수정
                          </button>
                        </div>
                      )}
                    </div>

                    {/* STEP 2: 관리자 인증/로그인 */}
                    <div className="bg-[#fcfdfd] border border-gray-200 rounded-lg p-5 space-y-4 shadow-xs text-left">
                      <div className="flex gap-2.5 text-left">
                        <HelpCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 leading-tight">2단계: 관리자 로그인 인증</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed mt-1 font-light">
                            실제 웹 서버 배포 시, <strong>제3자가 마음대로 명작 목록을 훼손하거나 전면 초기화하는 행위를 차단</strong>하기 위해 공식 DB 인증 수단이 구비되어 있습니다.
                          </p>
                        </div>
                      </div>

                      {/* Method Selector Tabs */}
                      <div className="flex border-b border-gray-200 mt-2">
                        <button
                          type="button"
                          onClick={() => setAuthMethod('supabase_auth')}
                          className={`flex-1 pb-2 text-center text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            authMethod === 'supabase_auth'
                              ? 'border-[#2b694d] text-[#2b694d]'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          🛡️ Supabase 공식 Auth 연동 (추천)
                        </button>
                        <button
                          type="button"
                          onClick={() => setAuthMethod('passcode')}
                          className={`flex-1 pb-2 text-center text-xs font-bold border-b-2 transition-all cursor-pointer ${
                            authMethod === 'passcode'
                              ? 'border-amber-500 text-amber-600'
                              : 'border-transparent text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          🔑 간이 패스코드 인증 (로컬)
                        </button>
                      </div>

                      <form onSubmit={handleUnlockAdminMode} className="space-y-4 pt-1.5">
                        {authMethod === 'supabase_auth' ? (
                          <div className="space-y-3">
                            <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                              개인 Supabase 대시보드의 {"Authentication -> Users"} 메뉴에서 가입 완료한 본인만의 이메일 계정으로 안전하게 접근 권한을 얻습니다. RLS(보안 규칙)와 직접 연계되어 해킹이 원천 불가합니다.
                            </p>
                            
                            {!(credUrl.trim() && credKey.trim()) ? (
                              <div className="bg-rose-50 border border-rose-100 p-3 rounded text-rose-800 text-[11px] leading-relaxed font-semibold">
                                ⚠️ Supabase 연결 설정이 완료되지 않았습니다. 위 **'1단계: Supabase 연결 정보 설정'**에서 연결 정보(URL, Key)를 먼저 입력하여 저장 완료해 주세요.
                              </div>
                            ) : (
                              <>
                                <div>
                                  <label className="block text-[10px] font-bold text-[#012d1d] mb-1">
                                    관리자 이메일 계정 (EMAIL)
                                  </label>
                                  <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                      <User className="w-3.5 h-3.5" />
                                    </span>
                                    <input
                                      type="email"
                                      placeholder="admin@example.com"
                                      value={authEmail}
                                      onChange={(e) => setAuthEmail(e.target.value)}
                                      className="w-full pl-9 pr-3 py-2 bg-[#f8f9fa] border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-[#012d1d] mb-1">
                                    관리자 비밀번호 (PASSWORD)
                                  </label>
                                  <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                      <Lock className="w-3.5 h-3.5" />
                                    </span>
                                    <input
                                      type="password"
                                      placeholder="••••••••"
                                      value={authPassword}
                                      onChange={(e) => setAuthPassword(e.target.value)}
                                      className="w-full pl-9 pr-3 py-2 bg-[#f8f9fa] border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                                    />
                                  </div>
                                </div>
                                
                                <button
                                  type="submit"
                                  disabled={isAuthenticating}
                                  className="w-full py-2 bg-[#2b694d] hover:bg-[#1b4332] text-white text-xs font-bold rounded cursor-pointer transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-xs"
                                >
                                  {isAuthenticating ? (
                                    <>
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                      <span>Supabase Auth 로그인 중...</span>
                                    </>
                                  ) : (
                                    <>
                                      <Lock className="w-3.5 h-3.5" />
                                      <span>Supabase 관리자 로그온인증</span>
                                    </>
                                  )}
                                </button>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-[11px] text-amber-800 bg-amber-50 rounded-md p-2.5 leading-relaxed font-light">
                              💡 초기 간단 테스트용 로컬 브라우저 패스코드 방식입니다. <br />
                              자신의 포트폴리오를 외부에 완전히 배포하여 공인 서평 보드를 운영하시려면 **전체 RLS 규칙을 차단한 후 공식 Auth 해결책**으로 전환할 것을 적극 권장합니다.
                            </p>
                            
                            <div>
                              <label className="block text-[10px] font-bold text-amber-900 mb-1">
                                관리자 패스코드 (PASSCODE)
                              </label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                  <Key className="w-3.5 h-3.5" />
                                </span>
                                <input
                                  type="password"
                                  placeholder="인증 패스코드를 입력해 주세요."
                                  value={adminPasscodeInput}
                                  onChange={(e) => setAdminPasscodeInput(e.target.value)}
                                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-250 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded cursor-pointer transition-all active:scale-95 shadow-xs flex items-center justify-center gap-1.5"
                            >
                              <Key className="w-3.5 h-3.5" />
                              <span>간이 패스코드 인증완료</span>
                            </button>
                          </div>
                        )}
                      </form>

                      <div className="flex justify-end pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setShowCredModal(false)}
                          className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded cursor-pointer transition-colors"
                        >
                          취소 및 닫기 (읽기 전용 방문자 모드로 보기)
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-emerald-900 font-bold text-emerald-900">관리자 인증 완료 (편집 및 Supabase 데이터 쓰기 권한이 활성화됨)</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleLockAdminMode}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold rounded shadow-xs active:scale-95 cursor-pointer flex-shrink-0"
                      >
                        로그아웃 (방문자 모드로 전환)
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed text-left">
                      본인의 Supabase 클라우드 주소와 키를 설정하여 실시간 데이터베이스에 데이터를 저장 및 동기화할 수 있습니다. <br />
                      키를 비워두거나 삭제하면 브라우저 LocalStorage 단독 모드(로컬 기록 동작)로 전환됩니다.
                    </p>

                    {/* DB Config Credentials Form */}
                    <form onSubmit={handleSaveCredentials} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-[#012d1d] mb-1 text-left">
                          SUPABASE URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://yourprojectid.supabase.co"
                          required
                          value={credUrl}
                          onChange={(e) => setCredUrl(e.target.value)}
                          className="w-full px-3 py-1.8 bg-[#f8f9fa] border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#012d1d] mb-1 text-left">
                          SUPABASE ANON KEY (PUBLIC KEY)
                        </label>
                        <input
                          type="password"
                          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                          required
                          value={credKey}
                          onChange={(e) => setCredKey(e.target.value)}
                          className="w-full px-3 py-1.8 bg-[#f8f9fa] border border-gray-200 rounded text-xs focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-between items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={handleResetCredentials}
                          className="text-xs text-rose-600 hover:underline border-none bg-transparent cursor-pointer font-semibold text-left"
                        >
                          기록 초기화 (LocalStorage 모드로 환원)
                        </button>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowCredModal(false)}
                            className="px-4 py-1.8 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded cursor-pointer"
                          >
                            닫기
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.8 bg-[#2b694d] hover:bg-[#1b4332] text-white text-xs font-bold rounded cursor-pointer flex items-center gap-1 shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" />
                            연동정보 저장
                          </button>
                        </div>
                      </div>
                    </form>

                    <hr className="border-gray-100" />

                    {/* SQL setup guidelines */}
                    <div className="space-y-4 text-left">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold text-[#012d1d] flex items-center gap-1">
                            <span>1. 필수 테이블 및 기본 RLS 정책 생성하기</span>
                          </h4>
                          <button
                            onClick={handleCopySql}
                            className="text-xs text-[#2b694d] hover:text-[#011a12] font-semibold flex items-center gap-1 border border-gray-200 rounded px-2.5 py-1 bg-white hover:bg-gray-50 cursor-pointer"
                          >
                            {copiedSql ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>복사 완료!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>SQL 스크립트 복사</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-relaxed">
                          수퍼베이스 대시보드로 이동하여 <strong>SQL Editor</strong>에 아래의 쿼리를 입력하고 실행(Run)해 주세요:
                        </p>
                        
                        <div className="max-h-36 overflow-y-auto w-full bg-slate-900 rounded p-3 text-[10px] font-mono text-slate-300 leading-normal border border-slate-800">
                          <pre className="whitespace-pre-wrap text-left select-all">{SUPABASE_SQL_INSTRUCTION}</pre>
                        </div>
                      </div>

                      {/* Solutions A standard advice section */}
                      <div className="p-3.5 bg-sky-50/50 border border-sky-150 rounded-lg space-y-2">
                        <h5 className="text-[11px] font-bold text-sky-950 flex items-center gap-1">
                          <span>🛡️ [해결책 A] 공식 Auth 로그온 완료 후, 쓰기권한 보안 RLS 적용 (권장)</span>
                        </h5>
                        <p className="text-[10px] text-sky-850 leading-relaxed font-light">
                          자신의 Supabase 대시보드 {"Authentication -> Users"} 메뉴에서 본인의 관리자 계정 생성 및 로그인을 마치셨다면, 누구나 접근 가능한 기존 학업 테스트용 쓰기 권한을 차단하고 <strong>오직 가입 본인 계정만 글을 추가/수정/삭제하도록</strong> 아래 쿼리를 SQL Editor에서 대신 실행해 보안 설정을 교체해 주세요:
                        </p>
                        <div className="max-h-28 overflow-y-auto w-full bg-slate-900 rounded p-2.5 text-[10px] font-mono text-emerald-400 leading-normal border border-slate-800">
                          <pre className="whitespace-pre-wrap select-all">{`-- 1. 기존 비로그인/익명 기입용 RLS 정책 삭제
DROP POLICY IF EXISTS "Allow public insert" ON icomssam_books;
DROP POLICY IF EXISTS "Allow public update" ON icomssam_books;
DROP POLICY IF EXISTS "Allow public delete" ON icomssam_books;

-- 2. 새롭게 공식 로그인 완료한(authenticated) 사용자에게만 모든 쓰기/수정 권한 적용
CREATE POLICY "Allow write for authenticated users only" ON icomssam_books
  FOR ALL TO authenticated USING (true) WITH CHECK (true);`}</pre>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Seed default values */}
                    <div className="p-4 bg-emerald-50 rounded border border-emerald-100 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                        <SparklesIcon className="w-3.5 h-3.5 text-emerald-700" />
                        <span>2. 초기 명작 샘플 서평 연동하기</span>
                      </h4>
                      <p className="text-[11px] text-emerald-800 leading-relaxed">
                        본인의 Supabase 테이블 생성이 완료되었다면, 원하실 때 데미안, 이기적 유전자, 서양 미술사 등 고품격 초기 샘플 데이터들을 Supabase 테이블에 한 번에 주입(Seed)할 수 있습니다.
                      </p>
                      <button
                        onClick={handleUploadSeeds}
                        disabled={isSeeding}
                        className="w-full mt-1 bg-emerald-700 hover:bg-emerald-850 text-white font-bold py-2 px-4 rounded text-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        {isSeeding ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>데이터 주입 전송중...</span>
                          </>
                        ) : (
                          <>
                            <Cloud className="w-3.5 h-3.5" />
                            <span>초기 샘플 데이터 Supabase 클라우드로 전송 (Seed)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. CRUD dialog Create / Edit Book modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFormModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              {/* Form header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#2b694d]" />
                  <h3 className="text-base font-bold text-[#012d1d]">
                    {formMode === 'create' ? '새 독서 기록 추가' : '독서기록 및 서평 정보 수정'}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowFormModal(false)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleSaveBookSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-left text-xs text-gray-700">
                
                {/* Section A: Core Metadata Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title and Subtitle */}
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">책 제목 *</label>
                    <input
                      type="text"
                      required
                      placeholder="예시) 이기적 유전자"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-900 mb-1">한줄 부제</label>
                    <input
                      type="text"
                      placeholder="예시) 다윈주의 자연선택을 유전자 단위에서 논하다"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Author and Publisher */}
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">저자</label>
                    <input
                      type="text"
                      placeholder="예시) 리처드 도킨스"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-900 mb-1">출판사</label>
                    <input
                      type="text"
                      placeholder="예시) 을유문화사"
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Publish Date and Rating */}
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">기록일 / 발행일</label>
                    <input
                      type="text"
                      placeholder="예시) 2013.12.24"
                      value={formData.publishDate}
                      onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-900 mb-1">나의 평점 (1.0 ~ 5.0)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.5"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5 })}
                        className="w-20 px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                      />
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            onClick={() => setFormData({ ...formData, rating: i + 1 })}
                            className={`w-4 h-4 cursor-pointer ${
                              i < Math.floor(formData.rating) ? 'fill-yellow-400 text-yellow-500' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Category Selection radio pills */}
                  <div className="md:col-span-2">
                    <label className="block font-bold text-gray-900 mb-2">분야 카테고리</label>
                    <div className="flex flex-wrap gap-2">
                      {(['humanities', 'science', 'art', 'novel'] as Book['category'][]).map((cat) => {
                        const labelsMap = {
                          humanities: '인문/사회',
                          science: '과학/기술',
                          art: '예술/대중문화',
                          novel: '소설/에세이'
                        };
                        const isSelected = formData.category === cat;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat })}
                            className={`px-4 py-2 rounded font-bold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#2b694d] text-white shadow-xs'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {labelsMap[cat]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Cover Image Selector */}
                <div className="p-4 bg-gray-50 rounded border border-gray-150">
                  <label className="block font-bold text-[#144234] mb-2 font-sans">도서 커버 이미지 설정</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-16 h-24 bg-white border border-gray-250 flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center">
                      {formData.coverImage ? (
                        <img src={formData.coverImage} className="w-full h-full object-cover" alt="미리보기" />
                      ) : (
                        <Library className="w-6 h-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2 text-left">
                      <input
                        type="url"
                        placeholder="지정하고 싶은 도서 표지 이미지 절대 주소 URL"
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="w-full px-3 py-1.8 bg-white border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                      />
                      
                      {/* Presets Grid */}
                      <span className="block text-[10px] text-gray-400 font-semibold uppercase tracking-wider">추천 분위기 프리셋 (선택 가능):</span>
                      <div className="flex gap-2">
                        {COVER_PRESETS.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setFormData({ ...formData, coverImage: p })}
                            className={`w-10 h-14 bg-cover bg-center rounded-xs opacity-80 hover:opacity-100 border transition-all cursor-pointer ${
                              formData.coverImage === p ? 'border-2 border-[#2b694d] scale-[1.05]' : 'border-gray-200'
                            }`}
                            style={{ backgroundImage: `url('${p}')` }}
                            title={`테마 프리셋 ${pIdx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section B: Synopsis / Summary */}
                <div>
                  <label className="block font-bold text-gray-900 mb-1">책 요약 / 시놉시스 *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="책의 줄거리나 핵심 주제를 요약해 주세요. (카드 목록에 상시 노출됩니다)"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white resize-y"
                  />
                </div>

                {/* Section C: Detailed Essay & Quote */}
                <div className="space-y-4 p-4 border border-dashed border-gray-200 rounded">
                  <div className="font-bold text-[#144234] border-b border-gray-100 pb-2">나의 맞춤형 상세 서평 정보</div>
                  
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">서평 에세이 제목</label>
                    <input
                      type="text"
                      placeholder="제목 예시) 과학적으로 사유하는 삶 - 이기적 유전자를 마주하고"
                      value={formData.reviewTitle}
                      onChange={(e) => setFormData({ ...formData, reviewTitle: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Highlights and quotes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">마음에 와닿은 구절 (인용구)</label>
                      <input
                        type="text"
                        placeholder="예시) 우리는 유전자의 보존을 위해 맹목적으로 프로그램된 로봇 기계들이다."
                        value={formData.reviewQuote}
                        onChange={(e) => setFormData({ ...formData, reviewQuote: e.target.value })}
                        className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-900 mb-1">인용구 출처</label>
                      <input
                        type="text"
                        placeholder="예시) 본문 제1장 중에서"
                        value={formData.reviewQuoteSource}
                        onChange={(e) => setFormData({ ...formData, reviewQuoteSource: e.target.value })}
                        className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Review detailed paragraphs separated by double enter */}
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">
                      상세 서평 단락 (엔터 키를 두 번 입력하면 별도의 단락으로 나뉩니다.)
                    </label>
                    <textarea
                      rows={6}
                      placeholder="서평 단락을 자세히 입력하고 생각의 깊이를 남겨보세요.
                      
처음 읽었을 때 과학 전면에 흐르는 물질주의적 환원에 긴장했으나...

두 번째 단락..."
                      value={formData.reviewParagraphsText}
                      onChange={(e) => setFormData({ ...formData, reviewParagraphsText: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none focus:bg-white font-sans resize-y"
                    />
                  </div>

                  {/* Review tags */}
                  <div>
                    <label className="block font-bold text-gray-900 mb-1">서평 인식 태그 (쉼표로 구분)</label>
                    <input
                      type="text"
                      placeholder="수행평가, 유전자론, 리처드도킨스, 독서기록"
                      value={formData.reviewTagsText}
                      onChange={(e) => setFormData({ ...formData, reviewTagsText: e.target.value })}
                      className="w-full px-3 py-1.8 bg-gray-50 border border-gray-200 rounded focus:ring-1 focus:ring-[#2b694d] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Form submit footer */}
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowFormModal(false)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded cursor-pointer transition-all"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2b694d] hover:bg-[#1b4332] text-white font-bold rounded cursor-pointer shadow-sm transition-all"
                  >
                    기록 완료 및 저장
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal detailed presentation card */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReview}
              className="absolute inset-0 bg-black/55 backdrop-blur-xs"
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
                <X className="w-5 h-5" />
              </button>

              {/* Left Section: Book Metadata (35%) */}
              <div className="w-full md:w-[35%] bg-neutral-50 p-6 md:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
                <div className="flex flex-col items-center w-full">
                  {/* Book Cover Frame */}
                  <div className="w-full max-w-[140px] md:max-w-[180px] aspect-[2/3] shadow-lg rounded-md overflow-hidden bg-white mb-6 transform hover:scale-[1.03] transition-transform border border-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      alt={selectedBook.title}
                      src={selectedBook.coverImage}
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
                          <span className="font-bold text-gray-750">{selectedBook.author || '미지정'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">출판사</span>
                          <span className="font-bold text-gray-700">{selectedBook.publisher || '미지정'}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">발행일</span>
                          <span className="font-bold text-gray-700">{selectedBook.publishDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* rating review bar */}
                    <div className="text-left bg-white p-4 rounded-lg border border-gray-100 flex justify-between items-center">
                      <span className="text-[10px] text-[#2b694d] font-bold tracking-widest uppercase block">
                        MY RATINGS
                      </span>
                      <div className="flex items-center gap-1.5">
                        {renderStars(selectedBook.rating)}
                        <span className="text-xs font-mono font-bold text-[#012d1d]">{(selectedBook.rating || 5.0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full text-center text-[10px] text-gray-450 font-serif mt-6">
                  ICOMSSAM READING DIARY
                </div>
              </div>

              {/* Right Section: Content Review Body (65%) */}
              <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto flex flex-col bg-white text-left">
                <div className="flex-1">
                  <header className="mb-6 pb-6 border-b border-gray-100 text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#012d1d] mb-2">{selectedBook.review?.title || `${selectedBook.title} 서평`}</h2>
                    <p className="text-[#2b694d] font-medium text-xs sm:text-sm italic border-l-4 border-[#2b694d] pl-3 py-1">
                      "{selectedBook.subtitle || '부제가 없습니다.'}"
                    </p>
                  </header>

                  <article className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-5 text-left mb-8">
                    {selectedBook.review?.paragraphs && selectedBook.review.paragraphs.map((par, pidx) => (
                      <p key={pidx} className="whitespace-pre-line">{par}</p>
                    ))}

                    {/* Elegant quote highlighted */}
                    {selectedBook.review?.quote && (
                      <div className="bg-neutral-50 p-5 rounded-lg border-l-4 border-[#012d1d] mt-6">
                        <p className="italic text-gray-800 font-medium text-xs sm:text-sm">
                          "{selectedBook.review.quote}"
                        </p>
                        <p className="text-right text-[11px] font-bold text-[#2b694d] mt-2">
                          - {selectedBook.review.quoteSource || '본문 중에서'}
                        </p>
                      </div>
                    )}
                  </article>

                  {/* tags footer */}
                  {selectedBook.review?.tags && selectedBook.review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 justify-start mb-8">
                      {selectedBook.review.tags.map((tag, tid) => (
                        <span key={tid} className="bg-[#b0f1cc]/80 text-[#0c5136] px-2.5 py-1 rounded text-xs font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow navigation inside review footer */}
                <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-mono">SUPABASE PERSISTED RECORD</span>
                  <div className="flex gap-4">
                    <button
                      onClick={goToPrevBook}
                      disabled={books.findIndex((b) => b.id === selectedBook.id) === 0}
                      className="text-[#2b694d] hover:text-[#012d1d] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> 이전 기록
                    </button>
                    <button
                      onClick={goToNextBook}
                      disabled={books.findIndex((b) => b.id === selectedBook.id) === books.length - 1}
                      className="text-[#2b694d] hover:text-[#012d1d] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-0.5 cursor-pointer"
                    >
                      다음 기록 <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Reusable Non-blocking Dialog (Alert / Confirm fallbacks for iframe compatibility) */}
      <AnimatePresence>
        {customDialog.show && (
          <div className="fixed inset-0 bg-[#011a11]/60 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white w-full max-w-md rounded-lg shadow-2xl p-6 relative overflow-hidden border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  customDialog.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                  customDialog.type === 'error' ? 'bg-rose-50 text-rose-600' :
                  customDialog.type === 'confirm' ? 'bg-amber-50 text-amber-600' :
                  'bg-sky-50 text-sky-600'
                }`}>
                  {customDialog.type === 'success' && <Check className="w-5 h-5 font-bold" />}
                  {customDialog.type === 'error' && <AlertCircle className="w-5 h-5" />}
                  {customDialog.type === 'confirm' && <HelpCircle className="w-5 h-5" />}
                  {customDialog.type === 'info' && <Info className="w-5 h-5" />}
                </div>

                <div className="flex-1 text-left">
                  <h4 className="text-sm font-bold text-gray-900 leading-tight">
                    {customDialog.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed whitespace-pre-line">
                    {customDialog.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                {customDialog.type === 'confirm' && (
                  <button
                    onClick={() => setCustomDialog(prev => ({ ...prev, show: false }))}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-750 text-xs font-bold rounded cursor-pointer transition-colors"
                  >
                    {customDialog.cancelText || '취소'}
                  </button>
                )}
                <button
                  onClick={() => {
                    setCustomDialog(prev => ({ ...prev, show: false }));
                    if (customDialog.onConfirm) {
                      customDialog.onConfirm();
                    }
                  }}
                  className={`px-4 py-1.5 text-white text-xs font-bold rounded cursor-pointer transition-colors shadow-sm active:scale-95 ${
                    customDialog.type === 'error' ? 'bg-rose-600 hover:bg-rose-700' :
                    customDialog.type === 'confirm' ? 'bg-amber-600 hover:bg-amber-700' :
                    'bg-[#2b694d] hover:bg-[#1b4332]'
                  }`}
                >
                  {customDialog.confirmText || '확인'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sparkles local sub-component
function SparklesIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z" />
      <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}
