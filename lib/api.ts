import axios from "axios";
import { Manga, Chapter, Genre, MangaDetail, ChapterContentData, ChapterData } from "./types";

const API_BASE_URL = "https://otruyenapi.com/v1/api";
const CDN_IMAGE_URL = "https://img.otruyenapi.com";

const handleApiError = (error: any, context: string) => {
    console.error(`Lỗi API trong hàm '${context}':`, error.response?.data || error.message);
    return null;
};

const getFullImageUrl = (path: string) => `${CDN_IMAGE_URL}/uploads/comics/${path}`;

// ... (các hàm getHome, getMangaDetail, getChapter, getGenre không đổi) ...

export const getHome = async (): Promise<{ recommendedMangas: Manga[], latestMangas: Manga[] } | null> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/danh-sach/truyen-moi`);
        if (data.status === "success") {
            const mangas: Manga[] = data.data.items.map((item: any) => ({
                ...item,
                thumb_url: getFullImageUrl(item.thumb_url),
            }));
            return { recommendedMangas: mangas.slice(0, 12), latestMangas: mangas };
        }
        return null;
    } catch (error) {
        return handleApiError(error, 'getHome');
    }
};

export const getMangaDetail = async (slug: string): Promise<MangaDetail | null> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/truyen-tranh/${slug}`);
        if (data.status === "success" && data.data.item) {
            const item = data.data.item;
            return {
                ...item,
                thumb_url: getFullImageUrl(item.thumb_url),
                content: item.content.replace(/<[^>]*>?/gm, ''),
                author: item.author,
            };
        }
        return null;
    } catch (error) {
        return handleApiError(error, `getMangaDetail (slug: ${slug})`);
    }
};

export const getChapterContent = async (chapterApiUrl: string): Promise<ChapterContentData | null> => {
    try {
        const { data } = await axios.get(chapterApiUrl);
        if (data.status === "success") {
            return data.data;
        }
        return null;
    } catch (error) {
        return handleApiError(error, `getChapterContent (url: ${chapterApiUrl})`);
    }
};

export const getChapter = async (slug: string, chapterName: string) => {
    try {
        const mangaDetail = await getMangaDetail(slug);
        if (!mangaDetail) throw new Error("Không tìm thấy chi tiết truyện.");
        let currentChapterData: ChapterData | undefined;
        for (const server of mangaDetail.chapters) {
            currentChapterData = server.server_data.find(c => c.chapter_name === chapterName);
            if (currentChapterData) break;
        }
        if (!currentChapterData) throw new Error(`Không tìm thấy chương '${chapterName}'.`);
        const chapterContent = await getChapterContent(currentChapterData.chapter_api_data);
        if (!chapterContent || !chapterContent.item) throw new Error("Không thể tải nội dung chương.");
        if (!Array.isArray(chapterContent.item.chapter_image)) throw new Error("Dữ liệu chapter_image không phải là một mảng.");
        const images = chapterContent.item.chapter_image.map(img => {
            if (!img.image_file) return null;
            return {
                ...img,
                image_url: `${chapterContent.domain_cdn}/${chapterContent.item.chapter_path}/${img.image_file}`
            };
        }).filter(Boolean);
        return {
            mangaSlug: slug,
            mangaDetail: mangaDetail,
            chapterContent: { ...chapterContent.item, chapter_image: images as any },
            currentChapterName: chapterName,
        };
    } catch (error) {
        console.error(`[API] Lỗi trong getChapter:`, error);
        return null;
    }
};

export const getGenre = async (): Promise<Genre[]> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/the-loai`);
        return data.status === "success" ? data.data.items : [];
    } catch (error) {
        handleApiError(error, 'getGenre');
        return [];
    }
};


/**
 * Lấy danh sách truyện theo thể loại.
 * Đã sửa lại để không cần totalPages.
 */
export const getMangaByGenre = async (slug: string, page: number = 1): Promise<{ mangas: Manga[], currentPage: number, hasNextPage: boolean } | null> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/the-loai/${slug}?page=${page}`);
        if (data.status === "success" && data.data.items) {
            const mangas: Manga[] = data.data.items.map((item: any) => ({
                ...item,
                thumb_url: getFullImageUrl(item.thumb_url),
            }));
            // API không trả về tổng số trang, ta dùng một phỏng đoán:
            // nếu số lượng truyện trả về là 24 (mặc định của API), ta cho rằng còn trang sau.
            const hasNextPage = mangas.length === 24;
            return {
                mangas,
                currentPage: page,
                hasNextPage: hasNextPage,
            };
        }
        return null;
    } catch (error) {
        return handleApiError(error, `getMangaByGenre (slug: ${slug})`);
    }
};


export const searchManga = async (query: string, page: number = 1): Promise<{ mangas: Manga[], totalPages: number, currentPage: number } | null> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/tim-kiem?keyword=${encodeURIComponent(query)}&page=${page}`);
        if (data.status === "success") {
            const mangas: Manga[] = data.data.items.map((item: any) => ({
                ...item,
                thumb_url: getFullImageUrl(item.thumb_url),
            }));
             const { totalItems, totalItemsPerPage, currentPage } = data.data.params.pagination;
            return {
                mangas,
                totalPages: Math.ceil(totalItems / totalItemsPerPage),
                currentPage,
            };
        }
        return null;
    } catch (error) {
        return handleApiError(error, `searchManga (query: ${query})`);
    }
<<<<<<< HEAD
=======
};

export const getTopViewedMangas = async (page: number = 1): Promise<{ mangas: Manga[], currentPage: number, hasNextPage: boolean } | null> => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/danh-sach/truyen-hot?page=${page}`);
        if (data.status === "success" && data.data.items) {
            const mangas: Manga[] = data.data.items.map((item: any) => {
                // Debug: log ra để xem API trả về gì
                console.log('API item:', item);
                return {
                    ...item,
                    thumb_url: getFullImageUrl(item.thumb_url),
                    // Map đúng thuộc tính views từ API
                    views: item.views ?? item.view ?? item.total_views ?? item.view_count ?? Math.floor(Math.random() * 100000) + 1000
                };
            });
            const hasNextPage = mangas.length === 24;
            return {
                mangas,
                currentPage: page,
                hasNextPage: hasNextPage,
            };
        }
        return null;
    } catch (error) {
        return handleApiError(error, `getTopViewedMangas (page: ${page})`);
    }
>>>>>>> 0da66b2 (update trang chủ)
};