import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import BackToTop from '@/components/shared/BackToTop';
import { getGenre } from '@/lib/api';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const genres = await getGenre();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header genres={genres} />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <BackToTop />
    </div>
  );
}