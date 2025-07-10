"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    hasNextPage: boolean;
}

export default function Pagination({ currentPage, hasNextPage }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 border rounded-md text-white ${
                    currentPage <= 1 ? 'pointer-events-none bg-gray-700 text-gray-400' : 'bg-blue-600 hover:bg-blue-500'
                }`}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                Trang trước
            </Link>

            <span className="text-white font-semibold">
                Trang {currentPage}
            </span>

            <Link
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 border rounded-md text-white ${
                    !hasNextPage ? 'pointer-events-none bg-gray-700 text-gray-400' : 'bg-blue-600 hover:bg-blue-500'
                }`}
                aria-disabled={!hasNextPage}
                tabIndex={!hasNextPage ? -1 : undefined}
            >
                Trang sau
            </Link>
        </div>
    );
}
