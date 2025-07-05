"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight, Menu, X, ArrowUp } from 'lucide-react';
import { Comic } from '@/lib/types';

interface ReaderControlsProps {
  comic: Comic;
  currentChapterId: string;
}

export default function ReaderControls({ comic, currentChapterId }: ReaderControlsProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const allChapters = comic.chapters[0]?.server_data || [];
  const currentIndex = allChapters.findIndex(
    chap => chap.chapter_api_data.endsWith(currentChapterId)
  );

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      setIsHeaderVisible(window.scrollY < lastScrollY || window.scrollY < 100);
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToChapter = useCallback((index: number) => {
    if (index >= 0 && index < allChapters.length) {
      const chapterId = allChapters[index].chapter_api_data.split('/').pop();
      router.push(`/doc-truyen/${comic.slug}/${chapterId}`);
    }
  }, [allChapters, comic.slug, router]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') navigateToChapter(currentIndex - 1);
    if (e.key === 'ArrowRight') navigateToChapter(currentIndex + 1);
  }, [currentIndex, navigateToChapter]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const prevChapter = allChapters[currentIndex - 1];
  const nextChapter = allChapters[currentIndex + 1];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-5xl mx-auto px-4 py-2 flex justify-between items-center text-white">
          <Link href={`/truyen/${comic.slug}`} className="font-bold text-lg truncate hover:text-red-500">{comic.name}</Link>
          <div className="flex items-center gap-2">
            <button onClick={() => navigateToChapter(currentIndex - 1)} disabled={!prevChapter} className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"><ArrowLeft size={20}/></button>
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-full hover:bg-gray-700"><Menu size={20}/></button>
            <button onClick={() => navigateToChapter(currentIndex + 1)} disabled={!nextChapter} className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"><ArrowRight size={20}/></button>
            <Link href="/" className="p-2 rounded-full hover:bg-gray-700"><Home size={20}/></Link>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100]" onClick={() => setIsMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-80 bg-[#202020] p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold text-xl mb-4">Danh sách chương</h3>
            <ul className="space-y-1">{allChapters.slice().reverse().map(chap => {
                const chapterId = chap.chapter_api_data.split('/').pop();
                return <li key={chapterId}><Link href={`/doc-truyen/${comic.slug}/${chapterId}`} className={`block p-2 rounded w-full text-left ${chapterId === currentChapterId ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>Chapter {chap.chapter_name}</Link></li>
            })}</ul>
          </div>
        </div>
      )}
      {showScrollTop && <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 right-5 z-40 p-3 bg-red-600/80 text-white rounded-full hover:bg-red-500"><ArrowUp size={24}/></button>}
    </>
  );
}