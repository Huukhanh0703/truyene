import { getHome } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import { Manga } from "@/lib/types";

export default async function Home() {
    const homeData = await getHome();

    if (!homeData) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-500">Lỗi</h1>
                <p>Không thể tải dữ liệu từ máy chủ. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    const { recommendedMangas, latestMangas } = homeData;

    // Chuyển đổi kiểu dữ liệu để phù hợp với MangaCard
    const toMangaCardProps = (manga: Manga) => ({
        title: manga.name,
        slug: manga.slug,
        cover: manga.thumb_url,
        latestChapter: manga.chaptersLatest?.[0]?.chapter_name ? `Chapter ${manga.chaptersLatest[0].chapter_name}` : 'N/A',
    });

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-4">
                    Truyện Đề Cử
                </h2>
                {recommendedMangas.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {recommendedMangas.map((manga) => (
                            <MangaCard key={manga.slug} manga={toMangaCardProps(manga)} />
                        ))}
                    </div>
                ) : (
                    <p>Không có truyện đề cử nào.</p>
                )}
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-4">
                    Mới Cập Nhật
                </h2>
                {latestMangas.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {latestMangas.map((manga) => (
                            <MangaCard key={manga.slug} manga={toMangaCardProps(manga)} />
                        ))}
                    </div>
                ) : (
                    <p>Không có truyện nào mới được cập nhật.</p>
                )}
            </section>
        </main>
    );
}