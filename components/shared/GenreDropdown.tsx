import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface GenreDropdownProps {
    genres: { name: string; slug: string }[];
}

export default function GenreDropdown({ genres }: GenreDropdownProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const filteredGenres = genres.filter(genre => genre.slug !== "16" && genre.name !== "16+");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="px-3 py-2 text-white hover:text-blue-400 transition-colors rounded-md"
                onClick={() => setOpen(!open)}
                type="button"
            >
                Thể loại
            </button>
            {open && (
                <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-1 p-2">
                        {filteredGenres.map((genre) => (
                            <Link
                                key={genre.slug}
                                href={`/the-loai/${genre.slug}`}
                                className="block px-2 py-1 text-sm text-white hover:text-blue-400 hover:bg-gray-700 rounded"
                                onClick={() => setOpen(false)}
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="/the-loai"
                        className="block px-2 py-1 text-xs text-blue-400 hover:text-blue-300 text-center border-t border-gray-700 mt-1"
                        onClick={() => setOpen(false)}
                    >
                        Xem tất cả thể loại →
                    </Link>
                </div>
            )}
        </div>
    );
}
