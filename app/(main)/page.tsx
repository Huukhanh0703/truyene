import { getNewComics } from "@/lib/api";
import MangaCard from "@/components/shared/MangaCard";
import Pagination from "@/components/shared/Pagination";

export const dynamic = 'force-dynamic';

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await getNewComics(currentPage);

  const newComics = Array.isArray(data?.comics) ? data.comics : [];
  const paginationInfo = data?.pagination;

  return (
    <section>
      <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-500 pl-4">
        Truyện Mới Cập Nhật
      </h1>

      {newComics.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          <p>Không tìm thấy truyện nào.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
            {newComics.map((comic) => (
              <MangaCard key={comic._id} comic={comic} />
            ))}
          </div>

          {paginationInfo && <Pagination pagination={paginationInfo} />}
        </>
      )}
    </section>
  );
}