import React from "react";
import Link from "next/link";
import { getTopViewedMangas } from "@/lib/api";
import Image from "next/image";

export default async function RankingSidebar() {
    const data = await getTopViewedMangas(1);
    // Lọc bỏ truyện 16+
    const mangas = (data?.mangas.slice(0, 10) || []).filter((manga: any) =>
        !(manga.category || []).some((cat: any) => cat.slug === "16" || cat.name === "16+")
    );

    return (
        <aside
            className="w-full md:w-80 bg-gray-900 rounded-lg shadow-lg p-4 mb-8 md:mb-0 md:ml-8 sticky top-24 order-2 md:order-1"
        >
            <h2 className="text-xl font-bold text-white mb-4">🔥 Bảng Xếp Hạng Lượt Xem</h2>
            <ol className="space-y-3">
                {mangas.map((manga: any, idx: number) => (
                    <li
                        key={manga.slug}
                        className="flex items-center gap-3 bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors min-h-[56px]"
                    >
                        <span className={`text-2xl font-bold w-7 text-center flex-shrink-0 ${idx < 3 ? "text-yellow-400" : "text-gray-400"}`}>{idx + 1}</span>
                        <Link href={`/truyen/${manga.slug}`} className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="relative w-10 h-14 flex-shrink-0">
                                <Image src={manga.thumb_url} alt={manga.name} fill className="object-cover rounded" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="truncate text-white font-medium text-sm w-32 md:w-40" title={manga.name}>{manga.name}</div>
                                <div className="text-xs text-gray-400">Lượt xem: {manga.views?.toLocaleString() ?? "-"}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ol>
            <div className="mt-4 text-center">
                <Link href="/bang-xep-hang" className="text-blue-400 hover:underline text-sm">Xem tất cả &rarr;</Link>
            </div>
        </aside>
    );
} 