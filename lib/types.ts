// Định nghĩa cấu trúc cho một truyện tranh
export interface Comic {
  _id: string;
  name: string;
  origin_name: string[];
  content: string;
  status: 'ongoing' | 'completed';
  thumb_url: string;
  sub_docquyen: boolean;
  author: string[];
  slug: string;
  category: { id: string; name: string; slug: string }[];
  chapters: {
    server_name: string;
    server_data: ChapterInfo[];
  }[];
}

// Định nghĩa cấu trúc cho một chương trong danh sách
export interface ChapterInfo {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

// Định nghĩa cấu trúc cho một item truyện trong danh sách (vd: trang chủ)
export interface ComicListItem {
  _id: string;
  name:string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: { id: string; name: string; slug: string }[];
  updatedAt: string;
  chaptersLatest: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }[];
}