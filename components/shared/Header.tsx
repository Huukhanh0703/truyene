"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, BookOpen } from "lucide-react";
import GenreDropdown from "./GenreDropdown";
import SearchBar from "./SearchBar";
import { Genre } from "@/lib/types";

interface HeaderProps {
    genres: Genre[];
}

export default function Header({ genres }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
                        TruyenKK
                    </Link>
                    <nav className="hidden md:flex items-center gap-2">
                        <Link href="/" className="px-3 py-2 text-white hover:text-blue-400 transition-colors rounded-md">
                            Trang chủ
                        </Link>
                        <GenreDropdown genres={genres} />
                        <Link href="/tim-kiem" className="px-3 py-2 text-white hover:text-blue-400 transition-colors rounded-md">
                            Tìm kiếm
                        </Link>
                    </nav>
                    <div className="hidden md:block">
                        <SearchBar />
                    </div>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-white hover:text-blue-400 transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-700 py-4">
                        <div className="space-y-4">
                            <div className="mb-4">
                                <SearchBar />
                            </div>
                            <nav className="space-y-2">
                                <Link 
                                    href="/" 
                                    className="flex items-center gap-3 px-3 py-2 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <BookOpen className="w-5 h-5" />
                                    Trang chủ
                                </Link>
                                <Link 
                                    href="/tim-kiem" 
                                    className="flex items-center gap-3 px-3 py-2 text-white hover:text-blue-400 hover:bg-gray-800 transition-colors rounded-md"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <Search className="w-5 h-5" />
                                    Tìm kiếm
                                </Link>
                            </nav>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2 px-3">Thể loại</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {genres.slice(0, 8).map((genre) => (
                                        <Link
                                            key={genre.slug}
                                            href={`/the-loai/${genre.slug}`}
                                            className="px-3 py-2 text-sm text-white hover:text-blue-400 hover:bg-gray-800 transition-colors rounded-md"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {genre.name}
                                        </Link>
                                    ))}
                                </div>
                                {genres.length > 8 && (
                                    <Link
                                        href="/the-loai"
                                        className="block px-3 py-2 text-sm text-blue-400 hover:text-blue-300 mt-2"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Xem tất cả thể loại →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
