import { ComicListItem, Comic, ChapterData, Category, Pagination } from "./types"; // Thêm Pagination

const API_URL = process.env.OTRUYEN_API_URL;
const BROWSER_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
};

// Cập nhật hàm getNewComics để trả về cả thông tin phân trang
export async function getNewComics(page: number = 1): Promise<{ comics: ComicListItem[], pagination: Pagination } | null> {
  try {
    const res = await fetch(`${API_URL}/danh-sach/truyen-moi?page=${page}`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Failed to fetch new comics. Status: ${res.status}`);
    const data = await res.json();
    return {
      comics: data.data?.items || [],
      pagination: data.data?.params?.pagination || null
    };
  } catch (error) {
    console.error("Error in getNewComics:", error);
    return null;
  }
}
// ... (Các hàm còn lại giữ nguyên, không cần thay đổi)
// ...
export async function getComicDetail(slug: string): Promise<Comic | null> {
  try {
    const res = await fetch(`${API_URL}/truyen-tranh/${slug}`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Failed to fetch comic detail. Status: ${res.status}`);
    const data = await res.json();
    return data.data?.item || null;
  } catch (error) {
    console.error("Error in getComicDetail:", error);
    return null;
  }
}

export async function getChapterData(chapterId: string): Promise<ChapterData | null> {
  try {
    const res = await fetch(`https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Failed to fetch chapter data. Status: ${res.status}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error in getChapterData:", error);
    return null;
  }
}

export async function searchComics(keyword: string, page: number = 1): Promise<ComicListItem[]> {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const res = await fetch(`${API_URL}/tim-kiem?keyword=${encodedKeyword}&page=${page}`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Search request failed. Status: ${res.status}`);
    const data = await res.json();
    return data.data?.items || [];
  } catch (error) {
    console.error("Error in searchComics:", error);
    return [];
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/the-loai`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Failed to fetch categories. Status: ${res.status}`);
    const data = await res.json();
    return data.data?.items || [];
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return [];
  }
}

export async function getComicsByCategory(slug: string, page: number = 1): Promise<{ comics: ComicListItem[], titlePage: string } | null> {
  try {
    const res = await fetch(`${API_URL}/the-loai/${slug}?page=${page}`, { headers: BROWSER_HEADERS });
    if (!res.ok) throw new Error(`Failed to fetch comics by category. Status: ${res.status}`);
    const data = await res.json();
    if (data.status === 'success') {
      return {
        comics: data.data?.items || [],
        titlePage: data.data?.titlePage || ""
      };
    }
    return null;
  } catch (error) {
    console.error(`Error in getComicsByCategory for slug ${slug}:`, error);
    return null;
  }
}