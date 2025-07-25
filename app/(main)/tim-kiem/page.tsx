import { searchManga } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import { Suspense } from 'react';

// Component SearchPage sẽ không fetch data trực tiếp
export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Lấy keyword từ URL, đảm bảo nó là một chuỗi
  const keyword = typeof searchParams?.keyword === 'string' ? searchParams.keyword : "";

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6">
        Kết quả tìm kiếm cho: <span className="text-red-500">{keyword}</span>
      </h1>
      
      {/* Suspense giúp hiển thị UI tạm thời trong khi chờ dữ liệu */}
      <Suspense fallback={<div className="text-white text-center py-10">Đang tải kết quả...</div>}>
        {/* Component SearchResults sẽ là nơi gọi API */}
        <SearchResults keyword={keyword} />
      </Suspense>
    </section>
  );
}

// Component này được tạo ra để gọi API và hiển thị kết quả
async function SearchResults({ keyword }: { keyword: string }) {
  if (!keyword) {
    return <div className="text-center text-gray-400 py-10">Vui lòng nhập từ khóa để tìm kiếm.</div>;
  }

  const results = await searchManga(keyword);
  const mangas = results?.mangas || [];

  if (mangas.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10">
        <p>Không tìm thấy truyện nào khớp với từ khóa của bạn.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
      {mangas.map((manga) => (
        <MangaCard key={manga._id} manga={{
          title: manga.name,
          slug: manga.slug,
          cover: manga.thumb_url,
          latestChapter: manga.chaptersLatest?.[0]?.chapter_name ? `Chapter ${manga.chaptersLatest[0].chapter_name}` : 'N/A',
          status: manga.status,
          rating: Math.random() * 2 + 3,
          views: Math.floor(Math.random() * 100000) + 1000,
        }} />
      ))}
    </div>
  );
}