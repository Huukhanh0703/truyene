// Định nghĩa cấu trúc cơ bản cho một truyện tranh (Manga)
export interface Manga {
    _id: string;
    name: string;
    slug: string;
    origin_name: string[];
    status: string;
    thumb_url: string;
    sub_docquyen: boolean;
    category: Genre[];
    updatedAt: string;
    chaptersLatest?: {
        filename: string;
        chapter_name: string;
        chapter_title: string;
        chapter_api_data: string;
    }[];
    views?: number; // Thêm thuộc tính lượt xem
}

// Định nghĩa cấu trúc cho một thể loại (Genre)
export interface Genre {
    id?: string;
    _id?: string;
    name: string;
    slug: string;
}

// Định nghĩa cấu trúc cho một chương (Chapter) trong danh sách chi tiết
export interface Chapter {
    server_name: string;
    server_data: ChapterData[];
}

export interface ChapterData {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
}

// Định nghĩa chi tiết đầy đủ của một truyện
export interface MangaDetail {
    _id: string;
    name: string;
    slug: string;
    origin_name: string[];
    content: string;
    status: string;
    thumb_url: string;
    author: string[];
    category: Genre[];
    chapters: Chapter[];
    updatedAt: string;
}

// Định nghĩa cho hình ảnh của một chương - Đã sửa
export interface ChapterImage {
    image_page: number;
    image_file: string; // Sửa từ file_name thành image_file
    image_url?: string; // image_url sẽ được tạo ra, nên là optional
}

// Cấu trúc dữ liệu trả về từ API cho nội dung một chương - ĐÃ SỬA
export interface ChapterContentData {
    domain_cdn: string;
    item: {
        _id: string;
        comic_name: string;
        chapter_name: string;
        chapter_title: string;
        chapter_path: string; // Thêm chapter_path
        chapter_image: ChapterImage[];
    };
}
