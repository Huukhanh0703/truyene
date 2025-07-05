"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Pagination as PaginationType } from '@/lib/types';

interface PaginationProps {
  pagination: PaginationType;
}

export default function Pagination({ pagination }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center gap-4 mt-12 text-white">
      {/* Nút Previous */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md hover:bg-red-600 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}`}
      >
        <ChevronLeft size={16} />
        <span>Trước</span>
      </Link>

      <span className="font-semibold">
        Trang {currentPage} / {totalPages}
      </span>

      {/* Nút Next */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-md hover:bg-red-600 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}`}
      >
        <span>Sau</span>
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}