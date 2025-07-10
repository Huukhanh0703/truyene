"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // <-- IMPORT useRouter
import { ChevronDown } from 'lucide-react';
import { ALL_CATEGORIES } from '@/lib/constants';

export default function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // <-- KHỞI TẠO ROUTER

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

  // Hàm xử lý việc chuyển trang và đóng menu
  const handleNavigation = (slug: string) => {
    setIsOpen(false); // Đóng menu trước
    router.push(`/the-loai/${slug}`); // Sau đó ra lệnh chuyển trang
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-red-500 transition-colors"
      >
        Thể Loại
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-[#202020] border border-gray-700 rounded-lg shadow-lg p-2 grid grid-cols-2 gap-2">
          {ALL_CATEGORIES.map(category => (
            // SỬA LỖI: Dùng button và gọi hàm handleNavigation
            <button
              key={category.slug}
              onClick={() => handleNavigation(category.slug)}
              className="block p-2 text-sm text-left text-gray-200 rounded-md hover:bg-red-600 hover:text-white"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}