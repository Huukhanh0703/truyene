import { getMangaByGenre } from "@/lib/api"; // Đảm bảo import đúng tên hàm
import MangaCard from "@/components/shared/MangaCard";
import Pagination from "@/components/shared/Pagination";
import { notFound } from "next/navigation";
import { Manga } from "@/lib/types";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GenrePage({ params, searchParams }: Props) {
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    
    // Gọi đúng tên hàm là getMangaByGenre
    const data = await getMangaByGenre(params.slug, page);

    if (!data) {
        return notFound();
    }

    const { mangas, totalPages, currentPage } = data;

    // Hàm trợ giúp để chuyển đổi dữ liệu cho component MangaCard
    const toMangaCardProps = (manga: Manga) => ({
        title: manga.name,
        slug: manga.slug,
        cover: manga.thumb_url,
        latestChapter: manga.chaptersLatest?.[0]?.chapter_name ? `Chapter ${manga.chaptersLatest[0].chapter_name}` : 'N/A',
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
                        totalPages={totalPages}
                        basePath={`/the-loai/${params.slug}`}
                    />
                </>
            ) : (
                <p>Không tìm thấy truyện nào thuộc thể loại này.</p>
            )}
        </div>
    );
}
