"use client";

import { ChapterData } from "@/lib/types";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ReaderControlsProps {
    mangaSlug: string;
    currentChapterName: string;
    allChapters: ChapterData[];
}

export default function ReaderControls({
    mangaSlug,
    currentChapterName,
    allChapters,
}: ReaderControlsProps) {
    const router = useRouter();

    const currentIndex = allChapters.findIndex(
        (c) => c.chapter_name === currentChapterName
    );

    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    const handleChapterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newChapterName = e.target.value;
        if (newChapterName) {
            router.push(`/doc-truyen/${mangaSlug}/${newChapterName}`);
        }
    };

    return (
        <div className="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-sm p-2">
            <div className="container mx-auto flex justify-between items-center gap-2">
                <Link href={`/truyen/${mangaSlug}`} className="p-2 rounded-md hover:bg-gray-700">
                    <Home size={24} />
                </Link>

                <div className="flex-grow flex justify-center items-center gap-2">
                    <button
                        onClick={() => prevChapter && router.push(`/doc-truyen/${mangaSlug}/${prevChapter.chapter_name}`)}
                        disabled={!prevChapter}
                        className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <select
                        value={currentChapterName}
                        onChange={handleChapterChange}
                        className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white max-w-xs w-full"
                    >
                        {allChapters.map((chapter) => (
                            <option key={chapter.chapter_name} value={chapter.chapter_name}>
                                Chapter {chapter.chapter_name}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => nextChapter && router.push(`/doc-truyen/${mangaSlug}/${nextChapter.chapter_name}`)}
                        disabled={!nextChapter}
                        className="p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
                <div className="w-10 h-10"></div>
            </div>
        </div>
    );
}