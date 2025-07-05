import { ComicListItem, Comic, ChapterData } from "./types";

const API_URL = process.env.OTRUYEN_API_URL;

// Hàm cho trang chủ
export async function getNewComics(page: number = 1): Promise<ComicListItem[]> {
  try {
    const res = await fetch(`${API_URL}/danh-sach/truyen-moi?page=${page}`);
    if (!res.ok) throw new Error(`Failed to fetch new comics. Status: ${res.status}`);
    const data = await res.json();
    return data.data?.items || [];
  } catch (error) {
    console.error("Error in getNewComics:", error);
    return [];
  }
}

// Hàm cho trang chi tiết truyện
export async function getComicDetail(slug: string): Promise<Comic | null> {
  try {
    const res = await fetch(`${API_URL}/truyen-tranh/${slug}`);
    if (!res.ok) throw new Error(`Failed to fetch comic detail. Status: ${res.status}`);
    const data = await res.json();
    return data.data?.item || null;
  } catch (error) {
    console.error("Error in getComicDetail:", error);
    return null;
  }
}

// Hàm cho trang đọc truyện
export async function getChapterData(chapterId: string): Promise<ChapterData | null> {
  try {
    const res = await fetch(`https://sv1.otruyencdn.com/v1/api/chapter/${chapterId}`);
    if (!res.ok) throw new Error(`Failed to fetch chapter data. Status: ${res.status}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Error in getChapterData:", error);
    return null;
  }
}