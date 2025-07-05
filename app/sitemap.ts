import { MetadataRoute } from 'next'
import { getNewComics } from '@/lib/api'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.com'; // <-- THAY BẰNG TÊN MIỀN CỦA BẠN

  // Lấy danh sách truyện để tạo link động
  const comics = await getNewComics(); 
  const comicRoutes = comics.map((comic) => ({
    url: `${baseUrl}/truyen/${comic.slug}`,
    lastModified: new Date(comic.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Các đường dẫn tĩnh
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    }
  ];

  return [...staticRoutes, ...comicRoutes];
}