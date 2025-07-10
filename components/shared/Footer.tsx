import Link from "next/link";
import { BookOpen, Heart, Github, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 border-t border-gray-700">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-blue-500" />
                            <span className="text-xl font-bold text-white">TruyenKK</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Nền tảng đọc truyện tranh trực tuyến hàng đầu Việt Nam. 
                            Khám phá hàng nghìn truyện tranh chất lượng cao.
                        </p>
                        <div className="flex items-center gap-4">
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a 
                                href="mailto:contact@truyenkk.com" 
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold">Liên kết nhanh</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-loai" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Thể loại
                                </Link>
                            </li>
                            <li>
                                <Link href="/tim-kiem" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Tìm kiếm
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-loai/moi-cap-nhat" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Truyện mới
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Genres */}
                    <div>
                        <h3 className="text-white font-semibold">Thể loại phổ biến</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/the-loai/action" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Hành động
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-loai/romance" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Tình cảm
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-loai/comedy" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Hài hước
                                </Link>
                            </li>
                            <li>
                                <Link href="/the-loai/horror" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Kinh dị
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold">Hỗ trợ</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                                    DMCA
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <span>© {currentYear} TruyenKK. Được tạo với</span>
                            <Heart className="w-4 h-4 text-red-500" />
                            <span>tại Việt Nam</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Điều khoản sử dụng
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                DMCA
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}