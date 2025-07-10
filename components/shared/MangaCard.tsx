"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, Star } from "lucide-react";

interface MangaCardProps {
    manga: {
        slug: string;
        title: string;
        cover: string;
        latestChapter: string;
        status?: string;
        rating?: number;
        views?: number;
    };
}

export default function MangaCard({ manga }: MangaCardProps) {
    // Định nghĩa hàm xử lý lỗi ảnh ở đây
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/200x300/1f2937/ffffff?text=Error';
    };
    return (
        <Link href={`/truyen/${manga.slug}`} className="group block">
            <div className="relative w-full overflow-hidden rounded-lg bg-gray-700 aspect-[2/3] shadow-lg">
                <Image
                    src={manga.cover}
                    alt={manga.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16.6vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    onError={handleImageError}
                />
            </div>
            <div className="mt-2">
                <h3 className="text-sm font-semibold text-white truncate group-hover:text-blue-400" title={manga.title}>
                    {manga.title}
                </h3>
                <p className="text-xs text-gray-400">
                    {manga.latestChapter}
                </p>
                <div className="flex items-center gap-2 mt-1">
                    {typeof manga.views === "number" && (
                        <span className="flex items-center text-xs text-gray-400">
                            <Eye className="w-4 h-4 mr-1" />
                            {manga.views}
                        </span>
                    )}
                    {typeof manga.rating === "number" && (
                        <span className="flex items-center text-xs text-yellow-400">
                            <Star className="w-4 h-4 mr-1" />
                            {manga.rating}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
