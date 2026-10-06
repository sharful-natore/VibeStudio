export interface ScreenshotItem {
  title: string;
  desc: string;
  gradient?: string;
  icon?: string;
}

export interface AppItem {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  size: string;
  category: string;
  rating: number;
  reviewsCount?: string;
  downloads?: string;
  featured?: boolean;
  badge?: string;
  downloadUrl: string;
  developer: string;
  updatedDate: string;
  minAndroid: string;
  color: string;
  iconSymbol?: string;
  features: string[];
  releaseNotes: string;
  screenshots: ScreenshotItem[];
  tags: string[];
}

export type SortOption = 'rating' | 'downloads' | 'name' | 'size';

export interface DownloadState {
  appId: string | null;
  progress: number;
  isDownloading: boolean;
  isCompleted: boolean;
  speed: string;
}
