import { getComicDetail } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Book, Clock, Rss, User } from 'lucide-react';

export default async function ComicDetailPage({ params }: { params: { slug: string } }) {
  const comic = await getComicDetail(params.slug);

  if (!comic) {
    return notFound();
  }

  // Domain của CDN chứa ảnh
  const cdnImage = "https://img.otruyenapi.com";
  const chapters = comic.chapters[0]?.server_data || [];
  const firstChapter = chapters[0];
  const latestChapter = chapters[chapters.length - 1];

  // ================================================================
  // SỬA LỖI Ở ĐÂY: Tạo URL ảnh bìa hoàn chỉnh
  // ================================================================
  const imageUrl = `${cdnImage}/uploads/comics/${comic.thumb_url}`;

  return (
    <div className="space-y-12">
      {/* PHẦN THÔNG TIN TRUYỆN */}
      <section className="flex flex-col md:flex-row gap-8">
        {/* Ảnh bìa */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <Image
            src={imageUrl} // <-- SỬ DỤNG URL ĐÃ SỬA
            alt={comic.name}
            width={300}
            height={450}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
            unoptimized={true} // <-- THÊM THUỘC TÍNH NÀY
          />
        </div>

        {/* Thông tin chi tiết */}
        <div className="w-full md:w-3/4 space-y-4">
          <h1 className="text-3xl font-bold text-white">{comic.name}</h1>
          <div className="flex flex-wrap gap-2">
            {comic.category.map(cat => (
              <span key={cat.id} className="px-3 py-1 bg-gray-700 text-xs text-gray-200 rounded-full">{cat.name}</span>
            ))}
          </div>
          <div className="flex flex-col space-y-2 text-sm text-gray-300">
            <div className="flex items-center gap-2"><User size={16} /> Tác giả: <span className="text-white">{comic.author[0]}</span></div>
            <div className="flex items-center gap-2"><Rss size={16} /> Tình trạng: <span className="text-white">{comic.status === 'ongoing' ? 'Đang tiến hành' : 'Hoàn thành'}</span></div>
            <div className="flex items-center gap-2"><Clock size={16} /> Lượt xem: <span className="text-white">1,234,567</span></div>
          </div>
          <div className="flex gap-4 pt-4">
            {firstChapter && (
              <Link href={`/doc-truyen/${comic.slug}/${firstChapter.chapter_api_data.split('/').pop()}`} className="px-6 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-700 transition-colors">
                Đọc từ đầu
              </Link>
            )}
            {latestChapter && (
              <Link href={`/doc-truyen/${comic.slug}/${latestChapter.chapter_api_data.split('/').pop()}`} className="px-6 py-2 bg-gray-600 rounded-md font-semibold hover:bg-gray-700 transition-colors">
                Đọc mới nhất
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* MÔ TẢ & DANH SÁCH CHƯƠNG */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Giới thiệu</h2>
            <div className="text-gray-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: comic.content }} />
        </div>
        <div className="lg:col-span-1">
            <h2 className="text-xl font-bold border-b-2 border-gray-700 pb-2 mb-4">Danh sách chương</h2>
            <div className="max-h-96 overflow-y-auto bg-gray-800/50 p-2 rounded-lg space-y-1">
              {chapters.slice().reverse().map((chap) => {
                const chapterId = chap.chapter_api_data.split('/').pop();
                return (
                  <Link key={chapterId} href={`/doc-truyen/${comic.slug}/${chapterId}`} className="block p-3 rounded-md text-sm text-gray-200 border-b border-gray-700/50 hover:bg-gray-700 transition-colors">
                    Chapter {chap.chapter_name}
                  </Link>
                )
              })}
            </div>
        </div>
      </section>
    </div>
  );
}