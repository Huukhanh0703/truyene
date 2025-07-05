import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} MangaViet. Mọi quyền được bảo lưu.</p>
        <p className="mt-2">
          Website được tạo ra với mục đích học tập và giải trí.
        </p>
        <div className="mt-4 flex justify-center gap-4">
            <Link href="/dieu-khoan" className="hover:text-white">Điều khoản</Link>
            <Link href="/lien-he" className="hover:text-white">Liên hệ</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;