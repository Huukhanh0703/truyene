"use client";

import Image from "next/image";
import Link from "next/link";
<<<<<<< HEAD
=======
import { Eye, Star } from "lucide-react";
>>>>>>> 0da66b2 (update trang chủ)

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
<<<<<<< HEAD
=======
        status?: string;
        rating?: number;
        views?: number;
>>>>>>> 0da66b2 (update trang chủ)
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
<<<<<<< HEAD
            <div className="relative w-full overflow-hidden rounded-md bg-gray-700 aspect-[2/3]">
=======
            <div className="relative w-full overflow-hidden rounded-lg bg-gray-700 aspect-[2/3] shadow-lg">
>>>>>>> 0da66b2 (update trang chủ)
                <Image
                    src={manga.cover}
                    alt={manga.title}
                    fill // Lấp đầy container
<<<<<<< HEAD
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16.6vw" // Tối ưu hóa ảnh cho các kích thước màn hình
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
=======
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16.6vw" // Tối ưu hóa ảnh cho các kích thước màn hình
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
>>>>>>> 0da66b2 (update trang chủ)
                    // Xử lý trong trường hợp ảnh không tải được
                    onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/200x300/1f2937/ffffff?text=Error';
                    }}
                />
<<<<<<< HEAD
            </div>
            {/* Thông tin truyện */}
            <div className="mt-2">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400" title={manga.title}>
                    {manga.title}
                </h3>
                <p className="text-xs text-gray-400">
                    {manga.latestChapter}
                </p>
=======
                
                {/* Overlay với thông tin bổ sung */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                        {manga.status && (
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
                                manga.status.toLowerCase().includes('hoàn thành') 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-blue-600 text-white'
                            }`}>
                                {manga.status}
                            </span>
                        )}
                        {manga.rating && (
                            <div className="flex items-center gap-1 text-yellow-400 text-xs">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{manga.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Badge cho chapter mới */}
                {manga.latestChapter && manga.latestChapter !== 'N/A' && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Mới
                    </div>
                )}
            </div>
            
            {/* Thông tin truyện */}
            <div className="mt-3 space-y-1">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400 transition-colors" title={manga.title}>
                    {manga.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                    {manga.latestChapter}
                </p>
                {manga.views && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="w-3 h-3" />
                        <span>{manga.views.toLocaleString()}</span>
                    </div>
                )}
>>>>>>> 0da66b2 (update trang chủ)
            </div>
        </Link>
    );
};

export default MangaCard;
