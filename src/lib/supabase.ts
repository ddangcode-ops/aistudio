import { createClient } from '@supabase/supabase-js';
import { Book } from '../types';
import { BOOKS as initialBooks } from '../data';

// Storage keys
const SUPABASE_URL_KEY = 'icomssam_supabase_url';
const SUPABASE_KEY_KEY = 'icomssam_supabase_key';
const LOCAL_BOOKS_KEY = 'icomssam_local_books';

// Get current Supabase credentials (checks local override first, then Vite env vars)
export function getSupabaseCredentials() {
  let localUrl = '';
  let localKey = '';
  
  if (typeof window !== 'undefined') {
    localUrl = localStorage.getItem(SUPABASE_URL_KEY) || '';
    localKey = localStorage.getItem(SUPABASE_KEY_KEY) || '';
  }
  
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  return {
    url: localUrl || envUrl || '',
    key: localKey || envKey || '',
    isLocalOverride: !!(localUrl && localKey),
    isEnvProvided: !!(envUrl && envKey),
    isConfigured: !!(localUrl || envUrl) && !!(localKey || envKey),
  };
}

// Save credentials to localStorage (local override)
export function saveSupabaseCredentials(url: string, key: string) {
  if (typeof window !== 'undefined') {
    if (url && key) {
      localStorage.setItem(SUPABASE_URL_KEY, url.trim());
      localStorage.setItem(SUPABASE_KEY_KEY, key.trim());
    } else {
      localStorage.removeItem(SUPABASE_URL_KEY);
      localStorage.removeItem(SUPABASE_KEY_KEY);
    }
  }
}

// Reset credentials to environment variables
export function clearSupabaseCredentials() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SUPABASE_URL_KEY);
    localStorage.removeItem(SUPABASE_KEY_KEY);
  }
}

let cachedClient: any = null;

// Initialize Supabase Client dynamically
export function getSupabaseClient() {
  const { url, key } = getSupabaseCredentials();
  if (!url || !key) return null;

  if (cachedClient && cachedClient.url === url && cachedClient.key === key) {
    return cachedClient.client;
  }

  try {
    const client = createClient(url, key, {
      auth: {
        persistSession: false
      }
    });
    cachedClient = { client, url, key };
    return client;
  } catch (error) {
    console.error('Supabase client initialization error:', error);
    return null;
  }
}

// DB Record interface
export interface DBBookRecord {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  publish_date: string;
  rating: number;
  category: string;
  cover_image: string;
  summary: string;
  review_title: string;
  review_quote: string;
  review_quote_source: string;
  review_paragraphs: string[] | string;
  review_tags: string[] | string;
  created_at?: string;
}

// Map database record to native Book model
export function mapDBRecordToBook(record: DBBookRecord): Book {
  let paragraphs: string[] = [];
  try {
    if (Array.isArray(record.review_paragraphs)) {
      paragraphs = record.review_paragraphs;
    } else if (typeof record.review_paragraphs === 'string') {
      paragraphs = JSON.parse(record.review_paragraphs);
    }
  } catch (e) {
    paragraphs = [];
  }

  let tags: string[] = [];
  try {
    if (Array.isArray(record.review_tags)) {
      tags = record.review_tags;
    } else if (typeof record.review_tags === 'string') {
      tags = JSON.parse(record.review_tags);
    }
  } catch (e) {
    tags = [];
  }

  const category = (record.category || 'humanities') as Book['category'];
  const categoryLabels: Record<string, string> = {
    all: '전체',
    humanities: '인문/사회',
    science: '과학/기술',
    art: '예술/대중문화',
    novel: '소설/에세이',
  };

  return {
    id: record.id,
    title: record.title || '',
    subtitle: record.subtitle || '',
    author: record.author || '',
    publisher: record.publisher || '',
    publishDate: record.publish_date || '',
    rating: Number(record.rating) || 5.0,
    category,
    categoryLabel: categoryLabels[category] || '인문/사회',
    coverImage: record.cover_image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80',
    summary: record.summary || '',
    review: {
      title: record.review_title || '',
      quote: record.review_quote || '',
      quoteSource: record.review_quote_source || '',
      paragraphs: paragraphs.length > 0 ? paragraphs : ['작성된 서평이 없습니다.'],
      tags: tags,
    }
  };
}

// Map native Book model to database record
export function mapBookToDBRecord(book: Book): Partial<DBBookRecord> {
  return {
    id: book.id,
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    publisher: book.publisher,
    publish_date: book.publishDate,
    rating: Number(book.rating),
    category: book.category,
    cover_image: book.coverImage,
    summary: book.summary,
    review_title: book.review.title,
    review_quote: book.review.quote,
    review_quote_source: book.review.quoteSource,
    review_paragraphs: book.review.paragraphs,
    review_tags: book.review.tags,
  };
}

// SQL helper statement for the user to copy/paste in Supabase SQL editor
export const SUPABASE_SQL_INSTRUCTION = `-- [아이컴쌤 독서기록 테이블 생성 SQL]
-- 이 스크립트를 복사하여 Supabase 대시보드 -> SQL Editor에 붙여넣고 실행하세요.

CREATE TABLE IF NOT EXISTS icomssam_books (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  author TEXT DEFAULT '',
  publisher TEXT DEFAULT '',
  publish_date TEXT DEFAULT '',
  rating NUMERIC DEFAULT 5.0,
  category TEXT DEFAULT 'humanities',
  cover_image TEXT DEFAULT '',
  summary TEXT DEFAULT '',
  review_title TEXT DEFAULT '',
  review_quote TEXT DEFAULT '',
  review_quote_source TEXT DEFAULT '',
  review_paragraphs JSONB DEFAULT '[]'::jsonb,
  review_tags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE icomssam_books ENABLE ROW LEVEL SECURITY;

-- 1. 모든 사용자(익명 포함)에게 조회 권한 허용
CREATE POLICY "Allow public read access" ON icomssam_books
  FOR SELECT TO public USING (true);

-- 2. 모든 사용자에게 삽입 권한 허용 (학업 테스트용)
CREATE POLICY "Allow public insert" ON icomssam_books
  FOR INSERT TO public WITH CHECK (true);

-- 3. 모든 사용자에게 수정 권한 허용 (학업 테스트용)
CREATE POLICY "Allow public update" ON icomssam_books
  FOR UPDATE TO public USING (true) WITH CHECK (true);

-- 4. 모든 사용자에게 삭제 권한 허용 (학업 테스트용)
CREATE POLICY "Allow public delete" ON icomssam_books
  FOR DELETE TO public USING (true);
`;

// Helper: Seed initial local books if empty
function initializeLocalBooksFallback(): Book[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(LOCAL_BOOKS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local fallback books:', e);
      }
    }
    // Seed initial
    localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(initialBooks));
    return initialBooks;
  }
  return initialBooks;
}

// Fetch all books (with dynamic Supabase / Local storage switching)
export async function fetchBooks(): Promise<{ books: Book[]; source: 'supabase' | 'local'; error?: string }> {
  const client = getSupabaseClient();
  
  if (!client) {
    // Falls back to LocalStorage
    const b = initializeLocalBooksFallback();
    return { books: b, source: 'local' };
  }

  try {
    const { data, error } = await client
      .from('icomssam_books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error (might table not exist yet):', error.message);
      const b = initializeLocalBooksFallback();
      return { 
        books: b, 
        source: 'local', 
        error: `Supabase 조회 중 문제가 발생했습니다: ${error.message}. 테이블이 아직 생성되지 않았을 수 있습니다. SQL 스크립트를 실행해 주세요.` 
      };
    }

    if (data) {
      const booksMapped = data.map((rec: DBBookRecord) => mapDBRecordToBook(rec));
      return { books: booksMapped, source: 'supabase' };
    }

    return { books: [], source: 'supabase' };
  } catch (err: any) {
    console.error('Supabase query exception:', err);
    const b = initializeLocalBooksFallback();
    return { books: b, source: 'local', error: err?.message || '네트워크 연결 오류가 발생했습니다.' };
  }
}

// Add a single book
export async function createBook(book: Book): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  if (!client) {
    // Local fallback
    if (typeof window !== 'undefined') {
      const current = initializeLocalBooksFallback();
      current.unshift(book);
      localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(current));
      return { success: true };
    }
    return { success: false, error: 'localStorage is not available' };
  }

  try {
    const dbRecord = mapBookToDBRecord(book);
    const { error } = await client.from('icomssam_books').insert(dbRecord);
    
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || '네트워크 연결 오류' };
  }
}

// Update a book
export async function updateBook(book: Book): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  if (!client) {
    // Local fallback
    if (typeof window !== 'undefined') {
      const current = initializeLocalBooksFallback();
      const updated = current.map(b => b.id === book.id ? book : b);
      localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(updated));
      return { success: true };
    }
    return { success: false, error: 'localStorage is not available' };
  }

  try {
    const dbRecord = mapBookToDBRecord(book);
    const { error } = await client.from('icomssam_books').update(dbRecord).eq('id', book.id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || '네트워크 연결 오류' };
  }
}

// Delete a book
export async function deleteBook(id: string): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  if (!client) {
    // Local fallback
    if (typeof window !== 'undefined') {
      const current = initializeLocalBooksFallback();
      const filtered = current.filter(b => b.id !== id);
      localStorage.setItem(LOCAL_BOOKS_KEY, JSON.stringify(filtered));
      return { success: true };
    }
    return { success: false, error: 'localStorage is not available' };
  }

  try {
    const { error } = await client.from('icomssam_books').delete().eq('id', id);
    
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || '네트워크 연결 오류' };
  }
}

// Push local/sample books to Supabase (Seeding)
export async function seedBooksToSupabase(books: Book[]): Promise<{ count: number; error?: string }> {
  const client = getSupabaseClient();
  if (!client) return { count: 0, error: 'Supabase가 아직 구성되지 않았습니다.' };

  try {
    const dbRecords = books.map(b => mapBookToDBRecord(b));
    const { error } = await client.from('icomssam_books').upsert(dbRecords);
    if (error) {
      return { count: 0, error: error.message };
    }
    return { count: books.length };
  } catch (err: any) {
    return { count: 0, error: err?.message || '네트워크 연결 오류' };
  }
}
