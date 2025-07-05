import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getChapterData, getComicDetail } from '@/lib/api';
import ReaderControls from '@/components/features/reader/ReaderControls';

// Hàm này sẽ giúp Next.js tạo metadata động cho trang (tốt cho SEO)
export async function generateMetadata({ params }: { params: { chapterId: string } }) {
  const chapterData = await getChapterData(params.chapterId);
  if (!chapterData) {
    return {
      title: "Không tìm thấy chương",
    }
  }
  return {
    title: `${chapterData.item.comic_name} - ${chapterData.item.chapter_name}`,
    description: `Đọc truyện ${chapterData.item.comic_name} chương ${chapterData.item.chapter_name} nhanh nhất.`,
  }
}

// Component chính của trang
export default async function ReaderPage({ params }: { params: { slug: string; chapterId: string } }) {
  // Gọi cả hai API cùng lúc để tăng tốc độ
  const [chapterData, comic] = await Promise.all([
    getChapterData(params.chapterId),
    getComicDetail(params.slug)
  ]);

  // Nếu một trong hai không có dữ liệu, trả về trang 404
  if (!chapterData || !comic) {
    return notFound();
  }

  const { domain_cdn, item } = chapterData;

  return (
    <div>
      <ReaderControls comic={comic} currentChapterId={params.chapterId} />

      <main className="max-w-4xl mx-auto flex flex-col items-center pt-20 pb-10">
        <h1 className="text-2xl font-bold text-white text-center mb-1 px-4">
          {comic.name}
        </h1>
        <h2 className="text-lg text-gray-300 text-center mb-6">
          Chapter {item.chapter_name}
        </h2>

        {/* Hiển thị các trang của chương truyện */}
        {item.chapter_image.map(image => (
          <div key={image.image_page} className="w-full">
            <Image
              src={`${domain_cdn}/${item.chapter_path}/${image.image_file}`}
              alt={`Trang ${image.image_page}`}
              width={800}
              height={1200}
              sizes="(max-width: 896px) 100vw, 896px"
              className="w-full h-auto"
              priority={image.image_page <= 2} // Ưu tiên tải 2 ảnh đầu tiên
            />
          </div>
        ))}
      </main>
    </div>
  );
}