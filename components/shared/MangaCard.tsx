import Link from 'next/link';
import Image from 'next/image';
import { ComicListItem } from '@/lib/types'; // Import kiểu dữ liệu đã định nghĩa

interface MangaCardProps {
  comic: ComicListItem;
}

const MangaCard = ({ comic }: MangaCardProps) => {
  const cdnImage = "https://img.otruyenapi.com";
  const latestChapter = comic.chaptersLatest?.[0];

  return (
    <Link href={`/truyen/${comic.slug}`} className="group block">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-gray-800">
        <Image
          src={`${cdnImage}/${comic.thumb_url}`}
          alt={comic.name}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        {latestChapter && (
           <div className="absolute bottom-2 left-2 text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded">
            Chap {latestChapter.chapter_name}
           </div>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-white truncate group-hover:text-red-500">
        {comic.name}
      </h3>
      <p className="mt-1 text-xs text-gray-400">
        Cập nhật {new Date(comic.updatedAt).toLocaleDateString('vi-VN')}
      </p>
    </Link>
  );
};

export default MangaCard;