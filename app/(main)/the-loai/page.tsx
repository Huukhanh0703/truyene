import { getAllCategories } from '@/lib/api';
import Link from 'next/link';

export const metadata = {
  title: 'Tất cả Thể loại',
  description: 'Danh sách tất cả các thể loại truyện tranh có tại MangaViet.',
};

export default async function AllCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Tất Cả Thể Loại
      </h1>
      
      {categories.length === 0 && (
        <div className="text-center text-gray-400 py-10">
          Không thể tải danh sách thể loại.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {categories.map(category => (
          <Link 
            key={category._id} 
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