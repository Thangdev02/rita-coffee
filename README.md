# 🦕 RITA Cafe & Bistro — ReactJS Vite Project

Dự án landing page cho **RITA Cafe & Bistro** tại Rạch Giá, Kiên Giang.

---

## 🚀 Cấu Trúc Dự Án

```
rita-cafe/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── CustomCursor.jsx      # Con trỏ tùy chỉnh
│   │   ├── Footer.jsx            # Footer
│   │   ├── MenuCard.jsx          # Card món đồ uống
│   │   ├── Navbar.jsx            # Thanh điều hướng
│   │   └── ScrollReveal.jsx      # Animation khi scroll
│   ├── pages/
│   │   ├── CategoryPage.jsx      # Trang riêng từng danh mục
│   │   ├── DinoPage.jsx          # Trang Khu Dino
│   │   ├── HomePage.jsx          # Trang chủ
│   │   └── MenuPage.jsx          # Trang menu tổng quan
│   ├── services/
│   │   └── api.js                # Axios API calls
│   ├── App.jsx                   # Router & layout
│   ├── index.css                 # Global styles + Tailwind
│   └── main.jsx                  # Entry point
├── db.json                       # JSON Server database
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## ⚡ Cài Đặt & Chạy

### 1. Cài Node.js
Cần Node.js >= 18. Tải tại: https://nodejs.org

### 2. Cài dependencies

```bash
cd rita-cafe
npm install
```

### 3. Chạy dự án (2 terminal)

**Terminal 1 — JSON Server (API):**
```bash
npm run server
# Chạy tại: http://localhost:3001
```

**Terminal 2 — Vite Dev Server:**
```bash
npm run dev
# Chạy tại: http://localhost:5173
```

---

## 📦 Thư Viện Sử Dụng

| Thư Viện | Phiên Bản | Mục Đích |
|----------|-----------|----------|
| React | 18 | Framework |
| Vite | 5 | Build tool |
| Tailwind CSS | **3.4.17** | Styling |
| Framer Motion | 11 | Animation & transitions |
| React Router | 6 | Routing |
| Axios | 1.6 | HTTP client |
| JSON Server | 0.17 | Mock API |
| React Hot Toast | 2 | Thông báo |
| React Icons | 5 | Icons |
| React Intersection Observer | 9 | Scroll triggers |

---

## 🎨 Tính Năng

### Landing Page (HomePage)
- Hero section với parallax scrolling và slideshow tự động
- Marquee text animation
- About section với counter stats
- Category grid (6 danh mục)
- Info cards (địa chỉ, giờ mở cửa, WiFi)
- Dino Zone promo section
- Testimonials grid

### Menu Page
- Header với background parallax
- Category navigation cards (link đến từng trang riêng)
- Filter bar theo danh mục
- Grid thức uống với animation stagger

### Category Pages (cho mỗi danh mục)
- Banner riêng với màu theme theo danh mục
- Info về nguyên liệu (hạt cà phê, matcha, v.v.)
- Grid menu items
- Đặc biệt: Trang Dino Kids Zone có section thông tin chi tiết

### Dino Kids Zone
- Full-screen hero với animation khủng long
- Character cards (4 loài khủng long)
- Activities grid (6 hoạt động)
- Pricing section rõ ràng (50.000đ/bé)

### UX Features
- Custom cursor với hover effect
- Scroll-triggered animations (từng element)
- Page transition
- Like button trên menu card
- Toast notifications
- Responsive hoàn toàn
- Dark elegant theme với màu vàng gold

---

## 🔗 Routes

| Path | Trang |
|------|-------|
| `/` | Trang chủ |
| `/menu` | Menu tổng quan |
| `/menu/coffee` | Danh mục Cà Phê |
| `/menu/signature` | Signature drinks |
| `/menu/matcha` | Matcha Latte |
| `/menu/tra-tea` | Trà |
| `/menu/nuoc-ep` | Nước Ép |
| `/menu/an-sang` | Ăn Sáng |
| `/menu/dino-kids` | Khu Dino (qua menu) |
| `/dino` | Trang Dino riêng |

---

## 🗄️ API Endpoints (JSON Server)

```
GET /api/categories
GET /api/categories?slug=coffee
GET /api/menuItems
GET /api/menuItems?categorySlug=coffee
GET /api/banners
GET /api/info
GET /api/testimonials
```

---

## 🛠️ Tùy Chỉnh

### Thêm món mới
Chỉnh sửa `db.json`, thêm vào mảng `menuItems`:
```json
{
  "id": 26,
  "categoryId": 1,
  "categorySlug": "coffee",
  "name": "Tên Món",
  "price": 45000,
  "image": "URL_ảnh",
  "description": "Mô tả món",
  "tag": "new",
  "hot": true,
  "iced": true
}
```

### Thay màu theme
Chỉnh `tailwind.config.js` trong object `rita`:
- `gold`: Màu vàng chính
- `black`: Nền đen
- `cream`: Chữ trắng kem
