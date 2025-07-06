import Link from "next/link";
import { getGenre } from "@/lib/api";
import GenreDropdown from "./GenreDropdown";
import SearchBar from "./SearchBar";

// Chuyển Header thành một async component để có thể fetch dữ liệu
export default async function Header() {
    // Gọi API để lấy danh sách thể loại ở phía server
    const genres = await getGenre();

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-2xl font-bold text-blue-500 hover:text-blue-400 transition-colors">
                        TruyenKK
                    </Link>

                    {/* Thanh điều hướng chính */}
                    <nav className="hidden md:flex items-center gap-2">
                        <Link href="/" className="px-3 py-2 text-white hover:text-blue-400 transition-colors rounded-md">
                            Trang chủ
                        </Link>
                        
                        {/* Tích hợp GenreDropdown và truyền dữ liệu genres vào */}
                        <GenreDropdown genres={genres} />

                        {/* Bạn có thể thêm các link khác ở đây, ví dụ: */}
                        <Link href="/tim-kiem" className="px-3 py-2 text-white hover:text-blue-400 transition-colors rounded-md">
                            Tìm kiếm
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                             <SearchBar />
                        </div>
                       
                        {/* Nút menu cho di động có thể được thêm ở đây */}
                    </div>
                </div>
            </div>
        </header>
    );
}
