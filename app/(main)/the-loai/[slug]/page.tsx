<<<<<<< HEAD
import { getMangaDetail } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChapterData } from "@/lib/types";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const manga = await getMangaDetail(params.slug);
    if (!manga) {
        return { title: "Không tìm thấy truyện" };
    }
    return {
        title: manga.name,
        description: manga.content,
    };
}

export default async function MangaDetailPage({ params }: Props) {
    const manga = await getMangaDetail(params.slug);

    if (!manga) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Không Tìm Thấy Truyện</h1>
                <p>Truyện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    // Gộp tất cả các chương từ các server lại và sắp xếp
    const allChapters: ChapterData[] = manga.chapters
        .flatMap(server => server.server_data)
        .sort((a, b) => parseFloat(b.chapter_name) - parseFloat(a.chapter_name));


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <Image
                        src={manga.thumb_url}
                        alt={manga.name}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg w-full"
                    />
                </div>
                <div className="md:col-span-3">
                    <h1 className="text-4xl font-bold mb-2">{manga.name}</h1>
                    <p className="text-lg text-gray-400 mb-4">{manga.origin_name.join(', ')}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <p><strong>Tác giả:</strong> {manga.author.join(', ') || "Đang cập nhật"}</p>
                        <p><strong>Tình trạng:</strong> {manga.status || "Đang cập nhật"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {manga.category.map((genre) => (
                            <Link
                                href={`/the-loai/${genre.slug}`}
                                key={genre.slug}
                                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm hover:bg-gray-300"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Nội dung</h2>
                    <p className="text-gray-700 mb-6">{manga.content}</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Danh sách chương</h2>
                <div className="max-h-96 overflow-y-auto border rounded-lg">
                    <ul className="divide-y">
                        {allChapters.length > 0 ? (
                             allChapters.map((chapter) => (
                                // Sửa lại key để sử dụng giá trị duy nhất
                                <li key={chapter.chapter_api_data}>
                                    <Link
                                        href={`/doc-truyen/${params.slug}/${chapter.chapter_name}`}
                                        className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                                    >
                                        Chapter {chapter.chapter_name} {chapter.chapter_title && `- ${chapter.chapter_title}`}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-3 text-gray-500">Chưa có chương nào.</li>
                        )}
                    </ul>
                </div>
            </div>
=======
import { getMangaByGenre } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import Pagination from "@/components/shared/Pagination";
import { notFound } from "next/navigation";
import { Manga } from "@/lib/types";

type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export default async function GenrePage({ params, searchParams }: Props) {
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
        rating: Math.random() * 2 + 3,
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
                        basePath={`/the-loai/${params.slug}`}
                    />
                </>
            ) : (
                <p>Không tìm thấy truyện nào thuộc thể loại này.</p>
            )}
>>>>>>> 0da66b2 (update trang chủ)
        </div>
    );
}
