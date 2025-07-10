import { getMangaByGenre } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import Pagination from "@/components/shared/Pagination";
import { notFound } from "next/navigation";
import { Manga } from "@/lib/types";

export default async function Page({ params, searchParams }: { params: { slug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) {
    const page = typeof searchParams?.page === 'string' ? Number(searchParams.page) : 1;
    const data = await getMangaByGenre(params.slug, page);

    if (!data) {
        return notFound();
    }

    const { mangas, currentPage, hasNextPage } = data;

    const toMangaCardProps = (manga: Manga) => ({
        title: manga.name,
        slug: manga.slug,
        cover: manga.thumb_url,
        latestChapter: manga.chaptersLatest?.[0]?.chapter_name ? `Chapter ${manga.chaptersLatest[0].chapter_name}` : 'N/A',
        status: manga.status,
        rating: Number((Math.random() * 2 + 3).toFixed(1)),
        views: Math.floor(Math.random() * 100000) + 1000,
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 capitalize">
                Thể loại: {params.slug.replace(/-/g, " ")}
            </h1>
            {mangas.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {mangas.map((manga) => (
                            <MangaCard key={manga.slug} manga={toMangaCardProps(manga)} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        hasNextPage={hasNextPage}
                    />
                </>
            ) : (
                <p>Không tìm thấy truyện nào thuộc thể loại này.</p>
            )}
        </div>
    );
}
