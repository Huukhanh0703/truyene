# TruyenKK - Nền tảng đọc truyện tranh trực tuyến

Một ứng dụng web hiện đại để đọc truyện tranh với giao diện đẹp mắt và trải nghiệm người dùng tối ưu.

## ✨ Tính năng chính

### 🏠 Trang chủ mới
- **Hero Section**: Hiển thị truyện nổi bật với giao diện đẹp mắt
- **Thống kê nhanh**: Số liệu về truyện, chương, thể loại và độc giả
- **Điều hướng thể loại**: Grid layout với 12 thể loại phổ biến
- **Các danh mục truyện**:
  - Truyện đề cử (với controls tìm kiếm và lọc)
  - Mới cập nhật
  - Truyện phổ biến
  - Truyện hoàn thành
- **Call-to-action**: Khuyến khích người dùng khám phá

### 📱 Responsive Design
- Tối ưu hóa cho cả PC và điện thoại
- Mobile menu với navigation đầy đủ
- Grid layout thích ứng theo kích thước màn hình
- Touch-friendly controls

### 🎨 Giao diện hiện đại
- Dark theme với gradient và shadow
- Hover effects và animations mượt mà
- Loading states và skeleton screens
- Back-to-top button
- Enhanced manga cards với overlay information

### 🔗 Tích hợp hoàn chỉnh
- Kết nối với tất cả các trang hiện có
- Navigation thống nhất
- Search functionality
- Genre filtering

## 🚀 Cách chạy dự án

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Chạy development server**:
```bash
npm run dev
```

3. **Mở trình duyệt**:
```
http://localhost:3000
```

## 📁 Cấu trúc dự án

```
mangaviet-app/
├── app/
│   ├── (main)/
│   │   ├── layout.tsx          # Layout chính với Header, Footer
│   │   └── page.tsx            # Trang chủ mới
│   ├── doc-truyen/             # Trang đọc truyện
│   ├── the-loai/               # Trang thể loại
│   ├── tim-kiem/               # Trang tìm kiếm
│   └── truyen/                 # Trang chi tiết truyện
├── components/
│   ├── shared/
│   │   ├── Header.tsx          # Header với mobile menu
│   │   ├── Footer.tsx          # Footer đầy đủ thông tin
│   │   ├── MangaCard.tsx       # Card truyện nâng cao
│   │   ├── BackToTop.tsx       # Nút cuộn lên đầu
│   │   ├── LoadingSpinner.tsx  # Component loading
│   │   └── ...                 # Các component khác
│   └── features/
│       └── reader/             # Components cho reader
├── lib/
│   ├── api.ts                  # API functions
│   ├── types.ts                # TypeScript types
│   └── constants.ts            # Constants
└── ...
```

## 🎯 Các tính năng nổi bật

### Trang chủ
- **Hero Section**: Truyện nổi bật với gradient overlay
- **Quick Stats**: Thống kê ấn tượng
- **Category Grid**: 12 thể loại phổ biến
- **Manga Sections**: 4 danh mục chính
- **Responsive Grid**: Từ 2 cột (mobile) đến 8 cột (desktop)

### Header
- **Mobile Menu**: Hamburger menu với đầy đủ navigation
- **Search Integration**: Tìm kiếm nhanh
- **Genre Dropdown**: Danh sách thể loại
- **Sticky Navigation**: Luôn hiển thị khi scroll

### MangaCard
- **Enhanced Design**: Shadow, rounded corners
- **Hover Effects**: Scale và overlay information
- **Status Badges**: Hoàn thành/Đang tiến hành
- **Rating Display**: Star rating system
- **View Count**: Số lượt xem
- **New Chapter Badge**: Đánh dấu chapter mới

### Footer
- **4 Column Layout**: Brand, Quick Links, Genres, Support
- **Social Links**: GitHub, Email
- **Legal Links**: Terms, Privacy, DMCA
- **Responsive Design**: Stack trên mobile

## 🛠️ Công nghệ sử dụng

- **Next.js 15**: React framework với App Router
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Axios**: HTTP client
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (2 cột grid)
- **Tablet**: 640px - 768px (3 cột grid)
- **Desktop**: 768px - 1024px (4-6 cột grid)
- **Large Desktop**: > 1024px (6-8 cột grid)

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Background**: Dark Gray (#111827)
- **Surface**: Gray (#1F2937)
- **Text**: White (#FFFFFF)

### Components
- **Buttons**: `.btn-primary`, `.btn-secondary`
- **Cards**: `.card`
- **Inputs**: `.input-field`
- **Utilities**: `.line-clamp-2`, `.line-clamp-3`

## 🔄 API Integration

Trang chủ tích hợp với các API endpoints:
- `getHome()`: Lấy truyện đề cử và mới cập nhật
- `getGenre()`: Lấy danh sách thể loại
- Tương thích với tất cả API hiện có

## 🚀 Performance

- **Lazy Loading**: Images với Next.js Image component
- **Suspense**: Loading states cho các sections
- **Optimized Images**: Responsive sizes và formats
- **Smooth Scrolling**: CSS scroll-behavior
- **Debounced Search**: Tối ưu tìm kiếm

## 📈 SEO & Accessibility

- **Semantic HTML**: Proper heading structure
- **Alt Text**: Image descriptions
- **ARIA Labels**: Screen reader support
- **Meta Tags**: SEO optimization
- **Keyboard Navigation**: Full keyboard support

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Dự án này được tạo ra với mục đích học tập và giải trí.

---

**TruyenKK** - Nơi khám phá thế giới truyện tranh! 📚✨
