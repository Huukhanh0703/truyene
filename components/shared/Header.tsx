"use client"; 

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown'; // <-- IMPORT COMPONENT MỚI

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="text-2xl font-bold text-red-600 flex-shrink-0">
            MangaViet
          </Link>
          
          <div className="hidden md:flex justify-center flex-grow px-4">
            <SearchBar />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300 flex-shrink-0">
            <Link href="/" className="hover:text-red-500">Trang Chủ</Link>
            <Link href="/danh-sach/truyen-moi" className="hover:text-red-500">Mới Cập Nhật</Link>
            {/* THAY THẾ LINK TĨNH BẰNG COMPONENT ĐỘNG */}
            <CategoryDropdown />
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Overlay cho Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/95 z-[100] md:hidden">
          <div className="p-4">
            <div className="flex justify-end items-center mb-8">
              <button onClick={() => setIsMenuOpen(false)} className="text-white"><X size={32} /></button>
            </div>
            <div className="mb-8 px-4">
              <SearchBar />
            </div>
            <nav className="flex flex-col items-center gap-6 text-lg text-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
              <Link href="/danh-sach/truyen-moi" onClick={() => setIsMenuOpen(false)}>Mới Cập Nhật</Link>
              <Link href="/the-loai" onClick={() => setIsMenuOpen(false)}>Tất Cả Thể Loại</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;