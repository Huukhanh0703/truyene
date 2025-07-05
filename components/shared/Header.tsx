"use client"; // Đánh dấu đây là Client Component

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-red-600">
            MangaViet
          </Link>

          {/* Navigation cho Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-red-500">Trang Chủ</Link>
            <Link href="/danh-sach/truyen-moi" className="hover:text-red-500">Mới Cập Nhật</Link>
            <Link href="/the-loai" className="hover:text-red-500">Thể Loại</Link>
          </nav>
          
          {/* Nút menu cho Mobile */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-white">
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Overlay cho Mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 md:hidden">
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold text-red-600">MangaViet</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-white"><X /></button>
            </div>
            <nav className="flex flex-col items-center gap-6 text-lg text-white">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
              <Link href="/danh-sach/truyen-moi" onClick={() => setIsMenuOpen(false)}>Mới Cập Nhật</Link>
              <Link href="/the-loai" onClick={() => setIsMenuOpen(false)}>Thể Loại</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;