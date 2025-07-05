"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { ALL_CATEGORIES } from '@/lib/constants'; // <-- IMPORT DANH SÁCH CỐ ĐỊNH

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Bỏ đi phần useEffect gọi API, vì chúng ta không cần nó nữa

  // Xử lý việc đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-red-500 transition-colors"
      >
        Thể Loại
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Danh sách sổ xuống */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-[#202020] border border-gray-700 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2">
          {/* Map trực tiếp từ danh sách cố định, không cần isLoading */}
          {ALL_CATEGORIES.map(category => (
            <Link
              key={category.slug}
              href={`/the-loai/${category.slug}`}
              onClick={() => setIsOpen(false)}
              className="block p-2 text-sm text-gray-200 rounded-md hover:bg-red-600 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}