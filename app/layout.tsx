import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MangaViet - Đọc truyện tranh online",
    template: "%s | MangaViet",
  },
  description: "Website đọc truyện tranh miễn phí, tốc độ cao, cập nhật nhanh nhất.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Trong các bước sau, Header và Footer sẽ được thêm vào đây */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}