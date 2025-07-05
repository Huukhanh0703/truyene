import { getNewComics } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";

// Biến Trang chủ thành một Server Component bất đồng bộ
export default async function HomePage() {
  // Gọi hàm để lấy dữ liệu truyện mới
  const newComics = await getNewComics();

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Truyện Mới Cập Nhật
      </h1>
      
      {/* Kiểm tra nếu không có truyện nào */}
      {(!newComics || newComics.length === 0) && (
        <div className="text-center text-gray-400 py-10">
          <p>Không tìm thấy truyện nào. Vui lòng thử lại sau.</p>
        </div>
      )}

      {/* Hiển thị danh sách truyện dưới dạng lưới */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
        {newComics.map((comic) => (
          // Sử dụng MangaCard component đã tạo
          <MangaCard key={comic._id} comic={comic} />
        ))}
      </div>
    </section>
  );
}