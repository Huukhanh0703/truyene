import { getHome, getGenre, getMangaByGenre } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import { Manga, Genre } from "@/lib/types";
import Link from "next/link";
import { Suspense } from "react";
import { 
    BookOpen, 
    Clock, 
    CheckCircle, 
    Search,
    Filter,
    Grid3X3,
    List
} from "lucide-react";
import RankingSidebar from "@/components/shared/RankingSidebar";
import Image from "next/image";
import React from "react";

// Component loading cho các section
const SectionSkeleton = () => (
    <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="bg-gray-700 rounded aspect-[2/3]"></div>
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    </div>
);

// Component Hero Section với truyện nổi bật
const HeroSection = ({ featuredManga }: { featuredManga: Manga }) => (
    <section className="relative mb-12 overflow-hidden rounded-xl">
        <div className="relative h-64 md:h-96 lg:h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
            <Image
                src={featuredManga.thumb_url}
                alt={featuredManga.name}
                fill
                className="w-full h-full object-cover"
                priority
                sizes="100vw"
            />
            <div className="absolute inset-0 z-20 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            {featuredManga.name}
                        </h1>
                        <p className="text-gray-300 mb-6 line-clamp-3">
                            {featuredManga.origin_name?.join(", ")}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {featuredManga.category?.slice(0, 3).map((genre) => (
                                <span
                                    key={genre.slug}
                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href={`/truyen/${featuredManga.slug}`}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Đọc ngay
                            </Link>
                            <Link
                                href={`/truyen/${featuredManga.slug}`}
                                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Chi tiết
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Component Category Navigation
const CategoryNav = ({ genres }: { genres: Genre[] }) => (
    <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Thể loại</h2>
            <Link 
                href="/the-loai" 
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
                Xem tất cả
            </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {genres.slice(0, 12).map((genre) => (
                <Link
                    key={genre.slug}
                    href={`/the-loai/${genre.slug}`}
                    className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-center group"
                >
                    <div className="text-blue-400 mb-2 group-hover:text-blue-300">
                        <BookOpen className="w-6 h-6 mx-auto" />
                    </div>
                    <h3 className="text-sm font-medium text-white group-hover:text-gray-200">
                        {genre.name}
                    </h3>
                </Link>
            ))}
        </div>
    </section>
);

// Component Manga Section với controls
const MangaSection = ({ 
    title, 
    mangas, 
    icon: Icon, 
    viewAllLink,
    showControls = false 
}: { 
    title: string; 
    mangas: Manga[]; 
    icon: React.ElementType; 
    viewAllLink?: string;
    showControls?: boolean;
}) => {
    const toMangaCardProps = (manga: Manga) => ({
        title: manga.name,
        slug: manga.slug,
        cover: manga.thumb_url,
        latestChapter: manga.chaptersLatest?.[0]?.chapter_name 
            ? `Chapter ${manga.chaptersLatest[0].chapter_name}` 
            : 'N/A',
        status: manga.status,
        rating: Number((Math.random() * 2 + 3).toFixed(1)), // Làm tròn 1 số thập phân
        views: Math.floor(Math.random() * 100000) + 1000, // Giả lập lượt xem
    });

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                </div>
                {viewAllLink && (
                    <Link 
                        href={viewAllLink} 
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                        Xem tất cả
                    </Link>
                )}
            </div>
            
            {showControls && (
                <div className="flex items-center justify-between mb-4 p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Search className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm trong danh sách..."
                                className="bg-gray-700 text-white px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors">
                            <Filter className="w-4 h-4" />
                            Lọc
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                            <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors">
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {mangas.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {mangas.map((manga) => (
                        <MangaCard key={manga.slug} manga={toMangaCardProps(manga)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Không có truyện nào trong danh mục này.</p>
                </div>
            )}
        </section>
    );
};

// Component Quick Stats
const QuickStats = () => (
    <section className="mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-blue-100 text-sm">Truyện tranh</div>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-green-100 text-sm">Chương truyện</div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-purple-100 text-sm">Thể loại</div>
            </div>
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-white">1M+</div>
                <div className="text-orange-100 text-sm">Độc giả</div>
            </div>
        </div>
    </section>
);

const genreSections = [
    { slug: "manhua", name: "Truyện Manhua" },
    { slug: "manga", name: "Truyện Manga" },
    { slug: "trinh-tham", name: "Trinh Thám" },
    { slug: "one-shot", name: "One Shot" },
    { slug: "xuyen-khong", name: "Xuyên Không" },
    { slug: "ngon-tinh", name: "Ngôn Tình" },
    { slug: "chuyen-sinh", name: "Chuyển Sinh" },
];

export default async function Home() {
    const [homeData, genres, ...genreData] = await Promise.all([
        getHome(),
        getGenre(),
        ...genreSections.map(g => getMangaByGenre(g.slug, 1)),
    ]);

    if (!homeData) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl">!</span>
                    </div>
                    <h1 className="text-2xl font-bold text-red-500 mb-2">Lỗi kết nối</h1>
                    <p className="text-gray-400 mb-4">
                        Không thể tải dữ liệu từ máy chủ. Vui lòng kiểm tra kết nối internet và thử lại.
                    </p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // Lọc bỏ truyện 16+ khỏi mọi danh sách
    const filter16Plus = (mangas: Manga[]) => mangas.filter(manga => !manga.category.some(cat => cat.slug === "16" || cat.name === "16+"));

    const { latestMangas } = homeData;
    const filteredLatestMangas = filter16Plus(latestMangas);
    const completedMangas = filter16Plus(latestMangas.filter(manga => 
        manga.status?.toLowerCase().includes('hoàn thành')
    )).slice(0, 12);
    const filteredGenreData = genreData.map(gd => ({ ...gd, mangas: filter16Plus(gd?.mangas || []) }));

    return (
        <main className="min-h-screen bg-gray-900">
            {/* Hero Section */}
            {filteredLatestMangas.length > 0 && (
                <HeroSection featuredManga={filteredLatestMangas[0]} />
            )}

            <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
                <div className="flex-1 min-w-0">
                    {/* Quick Stats */}
                    <QuickStats />

                    {/* Category Navigation */}
                    <Suspense fallback={<SectionSkeleton />}>
                        <CategoryNav genres={genres} />
                    </Suspense>

                    {/* Latest Updates */}
                    <Suspense fallback={<SectionSkeleton />}>
                        <MangaSection
                            title="Mới Cập Nhật"
                            mangas={filteredLatestMangas}
                            icon={Clock}
                            viewAllLink="/the-loai"
                        />
                    </Suspense>

                    {/* Các section thể loại đặc biệt */}
                    {genreSections.map((g, idx) => (
                        <Suspense fallback={<SectionSkeleton />} key={g.slug}>
                            <MangaSection
                                title={g.name}
                                mangas={filteredGenreData[idx]?.mangas || []}
                                icon={BookOpen}
                                viewAllLink={`/the-loai/${g.slug}`}
                            />
                        </Suspense>
                    ))}

                    {/* Completed Manga */}
                    {completedMangas.length > 0 && (
                        <Suspense fallback={<SectionSkeleton />}>
                            <MangaSection
                                title="Truyện Hoàn Thành"
                                mangas={completedMangas}
                                icon={CheckCircle}
                                viewAllLink="/the-loai"
                            />
                        </Suspense>
                    )}

                    {/* Call to Action */}
                    <section className="text-center py-12 mb-8">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Khám phá thế giới truyện tranh
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Hàng nghìn truyện tranh đang chờ bạn khám phá. Tìm kiếm, đọc và thưởng thức những câu chuyện tuyệt vời.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/tim-kiem"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    Tìm kiếm truyện
                                </Link>
                                <Link
                                    href="/the-loai"
                                    className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <BookOpen className="w-5 h-5 mr-2" />
                                    Khám phá thể loại
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
                {/* Sidebar chỉ hiện trên PC, chuyển xuống dưới trên mobile */}
                <div className="md:block w-full md:w-80 flex-shrink-0">
                    <RankingSidebar />
                </div>
            </div>
        </main>
    );
}