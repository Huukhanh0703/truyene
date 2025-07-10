"use client";

import { useState, useEffect, useRef } from 'react';
import { Genre } from '@/lib/types';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface GenreDropdownProps {
    genres: Genre[];
}

export default function GenreDropdown({ genres }: GenreDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Lọc bỏ thể loại 16+
    const filteredGenres = genres.filter(genre => genre.slug !== "16" && genre.name !== "16+");

    // Xử lý việc click ra ngoài để đóng menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        // Lắng nghe sự kiện click trên toàn bộ tài liệu
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Dọn dẹp listener khi component bị hủy
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-4 py-2 text-white hover:text-blue-400 transition-colors"
            >
                Thể loại
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Chỉ hiển thị menu khi isOpen là true */}
            {isOpen && (
                <div className="absolute top-full mt-2 w-80 max-h-96 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
                    <div className="grid grid-cols-2 gap-1 p-2">
                        {/* Lặp qua danh sách thể loại để tạo link */}
                        {filteredGenres.map((genre) => (
                            <Link
                                key={genre.slug}
                                href={`/the-loai/${genre.slug}`}
                                onClick={() => setIsOpen(false)} // Đóng menu sau khi chọn
                                className="block px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
