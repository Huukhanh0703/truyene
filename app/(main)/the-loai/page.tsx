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
import { getGenre } from "@/lib/api";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default async function GenreListPage() {
    let genres = await getGenre();
    genres = genres.filter(genre => genre.slug !== "16" && genre.name !== "16+");
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Tất Cả Thể Loại</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {genres.map((genre) => (
                    <Link
                        key={genre.slug}
                        href={`/the-loai/${genre.slug}`}
                        className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-center group"
                    >
                        <BookOpen className="w-8 h-8 text-blue-400 mb-2 group-hover:text-blue-300" />
                        <span className="text-base font-medium text-white group-hover:text-gray-200 truncate w-full" title={genre.name}>{genre.name}</span>
                    </Link>
                ))}
            </div>
 0da66b2 (update trang chủ)
        </div>
    );
}
