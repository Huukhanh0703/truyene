import { getAllCategories } from '@/lib/api';
import Link from 'next/link';
import { ALL_CATEGORIES } from '@/lib/constants'; // Sử dụng danh sách thể loại cố định

export const metadata = {
  title: 'Tất cả Thể loại',
  description: 'Danh sách tất cả các thể loại truyện tranh có tại MangaViet.',
};

export default function AllCategoriesPage() {
  // Không cần gọi API nữa, chúng ta dùng danh sách cố định
  const categories = ALL_CATEGORIES;

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Tất Cả Thể Loại
      </h1>
      
      {categories.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          Không có thể loại nào để hiển thị.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {categories.map(category => (
          <Link 
            key={category.slug} 
            href={`/the-loai/${category.slug}`}
            className="block p-4 bg-gray-800 rounded-lg text-center font-semibold text-gray-200 hover:bg-red-600 hover:text-white transition-colors"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}