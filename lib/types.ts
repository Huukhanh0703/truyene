// Định nghĩa cấu trúc cho thông tin phân trang
export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

// Định nghĩa cấu trúc cho một Thể loại
export interface Category {
  _id: string;
  name: string;
  slug: string;
}

// Định nghĩa cấu trúc cho một truyện tranh đầy đủ
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
  category: Category[];
  chapters: {
    server_name: string;
    server_data: ChapterInfo[];
  }[];
}

// Định nghĩa cấu trúc cho một chương trong danh sách chi tiết
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
  category: Category[];
  updatedAt: string;
  chaptersLatest: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }[];
}

// Định nghĩa cấu trúc cho dữ liệu một chương truyện
export interface ChapterData {
  domain_cdn: string;
  item: {
    comic_name: string;
    chapter_name: string;
    chapter_path: string;
    chapter_image: { image_page: number; image_file: string }[];
  };
}