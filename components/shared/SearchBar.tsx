"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('keyword') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    router.push(`/tim-kiem?keyword=${trimmedQuery}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm truyện..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
        autoComplete="off"
      />
      <button type="submit" aria-label="Tìm kiếm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
        <Search size={20} />
      </button>
    </form>
  );
}