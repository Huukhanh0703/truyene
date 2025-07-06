"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Định nghĩa kiểu cho các thuộc tính (props) mà MangaCard nhận vào.
 * Dữ liệu này đã được xử lý sẵn ở component cha.
 */
interface MangaCardProps {
    manga: {
        title: string;
        slug: string;
        cover: string;
        latestChapter: string;
    };
}

/**
 * Component MangaCard dùng để hiển thị thông tin cơ bản của một truyện.
 * Nó nhận vào một đối tượng manga đã được đơn giản hóa và chỉ việc hiển thị.
 */
const MangaCard = ({ manga }: MangaCardProps) => {
    // Nếu không có prop `manga`, không render gì cả để tránh lỗi
    if (!manga) {
        return null;
    }

    return (
        <Link href={`/truyen/${manga.slug}`} className="group block">
            {/* Container cho ảnh bìa */}
            <div className="relative w-full overflow-hidden rounded-md bg-gray-700 aspect-[2/3]">
                <Image
                    src={manga.cover}
                    alt={manga.title}
                    fill // Lấp đầy container
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16.6vw" // Tối ưu hóa ảnh cho các kích thước màn hình
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    // Xử lý trong trường hợp ảnh không tải được
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x300/1f2937/ffffff?text=Error';
                    }}
                />
            </div>
            {/* Thông tin truyện */}
            <div className="mt-2">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400" title={manga.title}>
                    {manga.title}
                </h3>
                <p className="text-xs text-gray-400">
                    {manga.latestChapter}
                </p>
            </div>
        </Link>
    );
};

export default MangaCard;
