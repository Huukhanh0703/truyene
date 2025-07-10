import { getTopViewedMangas } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import Pagination from "@/components/shared/Pagination";
import { notFound } from "next/navigation";

export default async function RankingPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;
    const data = await getTopViewedMangas(page);
    if (!data) return notFound();
    const { mangas, currentPage, hasNextPage } = data;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">🔥 Bảng Xếp Hạng Lượt Xem</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {mangas.map((manga, idx) => (
                    <div key={manga.slug} className="relative">
                        <span className={`absolute -top-3 -left-3 z-10 text-3xl font-bold ${idx < 3 ? 'text-yellow-400' : 'text-gray-400'}`}>{(page-1)*24 + idx + 1}</span>
                        <MangaCard manga={{
                            title: manga.name,
                            slug: manga.slug,
                            cover: manga.thumb_url,
                            latestChapter: manga.chaptersLatest?.[0]?.chapter_name ? `Chapter ${manga.chaptersLatest[0].chapter_name}` : 'N/A',
                            status: manga.status,
                            rating: Math.random() * 2 + 3,
                            views: manga.views,
                        }} />
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
                <Pagination currentPage={currentPage} hasNextPage={hasNextPage} basePath="/bang-xep-hang" />
            </div>
        </div>
    );
} 