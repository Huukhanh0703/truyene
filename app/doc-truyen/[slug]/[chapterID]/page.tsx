import { getChapter } from "@/lib/api";
import { Metadata } from "next";
import Image from "next/image";
import ReaderControls from "@/components/features/reader/ReaderControls";
import Link from "next/link";
import { ChapterData } from "@/lib/types";

// Sửa lại Props để dùng chapterId (viết thường)
type Props = {
    params: { slug: string; chapterId: string };
};

// Sửa lại để dùng params.chapterId
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const chapterData = await getChapter(params.slug, params.chapterId);
    if (!chapterData) {
        return { title: "Lỗi tải chương" };
    }
    return {
        title: `Đọc ${chapterData.mangaDetail.name} - Chapter ${chapterData.currentChapterName}`,
    };
}

// Sửa lại để dùng params.chapterId
export default async function ReadMangaPage({ params }: Props) {
    const data = await getChapter(params.slug, params.chapterId);

    if (!data) {
        return (
            <div className="container mx-auto px-4 py-8 text-center flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Lỗi Tải Chương</h1>
                <p className="text-lg mb-6">Không thể tải được nội dung của chương này. Có thể chương đang được cập nhật hoặc có lỗi xảy ra.</p>
                <Link href={`/truyen/${params.slug}`} className="text-blue-400 hover:underline text-lg">
                    Quay về trang chi tiết truyện
                </Link>
            </div>
        );
    }

    const { mangaSlug, mangaDetail, chapterContent, currentChapterName } = data;
    
    // Sắp xếp các chương tăng dần để điều hướng 'trước/sau' cho đúng
    const allChapters: ChapterData[] = mangaDetail.chapters
        .flatMap(server => server.server_data)
        .sort((a, b) => parseFloat(a.chapter_name) - parseFloat(b.chapter_name));

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <ReaderControls
                mangaSlug={mangaSlug}
                currentChapterName={currentChapterName}
                allChapters={allChapters}
            />
            <div className="max-w-4xl mx-auto py-4">
                {chapterContent.chapter_image.length > 0 ? (
                    chapterContent.chapter_image.map((image) => (
                        <div key={image.image_page} className="relative w-full">
                            <Image
                                src={image.image_url!} // Thêm '!' để báo rằng URL chắc chắn tồn tại
                                alt={`Trang ${image.image_page + 1}`}
                                width={800}
                                height={1200}
                                className="w-full h-auto"
                                unoptimized
                                priority={image.image_page < 3} // Ưu tiên tải 3 ảnh đầu tiên
                            />
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p>Nội dung chương đang được cập nhật...</p>
                    </div>
                )}
            </div>
            {/* Thêm bộ điều khiển ở cuối trang để tiện sử dụng */}
            <ReaderControls
                mangaSlug={mangaSlug}
                currentChapterName={currentChapterName}
                allChapters={allChapters}
            />
        </div>
    );
}
