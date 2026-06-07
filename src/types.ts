export type TabType = 'home' | 'career' | 'reading' | 'retro' | 'meal';

export interface Milestone {
  period: string;
  title: string;
  description: string;
  iconName: string;
  image: string;
}

export interface Aspiration {
  title: string;
  description: string;
  iconName: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  publishDate: string;
  rating: number;
  category: 'humanities' | 'science' | 'art' | 'novel';
  categoryLabel?: string;
  coverImage: string;
  detailImage?: string;
  summary: string;
  review: {
    title: string;
    quote: string;
    quoteSource: string;
    paragraphs: string[];
    tags: string[];
  };
}

export interface RetroProject {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  btnLink?: string;
}

export interface MealMenu {
  name: string;
  type: string; // 'grain', 'soup', 'main', 'side', 'fruit' 등
}

export interface MealData {
  date: string;
  dateStr: string;
  menu: MealMenu[];
  calories: number;
  satisfaction: number;
  nutrition: {
    carbs: number; // g
    protein: number; // g
    fat: number; // g
  };
}
