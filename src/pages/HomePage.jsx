import { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getBanners, getTestimonials, getCategories } from '../services/api'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowRight, FiStar, FiMapPin, FiClock, FiWifi } from 'react-icons/fi'

const PINK = '#e8577a'
const CEMENT = '#1e1c1b'

// ── JSON-LD Schema cho Google rich results ──
const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CafeOrCoffeeShop",
      "@id": "https://ritacaferachgia.com/#cafe",
      "name": "Rita Cafe & Bistro",
      "alternateName": ["Rita Cafe Rạch Giá", "Rita Cafe", "RITA Cafe Bistro"],
      "description": "Quán cà phê thư giãn đẹp nhất Rạch Giá, Kiên Giang. Không gian ấm cúng, đồ uống ngon, bò né sáng, matcha Nhật Bản và khu vui chơi Dino Kids Zone dành cho trẻ em.",
      "image": [
        "https://ritacaferachgia.com/menu/assets/home1.jpg",
        "https://ritacaferachgia.com/menu/assets/home2.jpg"
      ],
      "url": "https://ritacaferachgia.com",
      "telephone": "+84-xxx-xxx-xxx",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "L11 Huỳnh Thúc Kháng",
        "addressLocality": "Rạch Giá",
        "addressRegion": "Kiên Giang",
        "postalCode": "91000",
        "addressCountry": "VN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.012873,
        "longitude": 105.080070
      },
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "07:30",
        "closes": "22:30"
      }],
      "servesCuisine": ["Vietnamese", "Coffee", "Bistro", "Breakfast"],
      "menu": "https://ritacaferachgia.com/menu",
      "priceRange": "₫₫",
      "currenciesAccepted": "VND",
      "paymentAccepted": "Cash, Credit Card",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "reviewCount": "100"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "WiFi miễn phí", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Khu vui chơi trẻ em Dino", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Chỗ đậu xe", "value": true },
        { "@type": "LocationFeatureSpecification", "name": "Điều hòa không khí", "value": true }
      ],
      "hasMap": "https://maps.google.com/?q=Rita+Cafe+Rach+Gia",
      "sameAs": [
        "https://www.facebook.com/ritarachgia"
      ]
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://ritacaferachgia.com/#dino",
      "name": "Dino Kids Zone - Khu Vui Chơi Trẻ Em Rạch Giá",
      "description": "Khu vui chơi Dino Kids Zone tại Rita Cafe Rạch Giá – Không gian vui chơi an toàn, sáng tạo cho bé. Chỉ 50.000đ/bé.",
      "url": "https://ritacaferachgia.com/dino",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "L11 Huỳnh Thúc Kháng",
        "addressLocality": "Rạch Giá",
        "addressRegion": "Kiên Giang",
        "addressCountry": "VN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://ritacaferachgia.com/#website",
      "url": "https://ritacaferachgia.com",
      "name": "Rita Cafe Rạch Giá",
      "inLanguage": "vi",
      "description": "Website chính thức của Rita Cafe & Bistro Rạch Giá"
    }
  ]
}

export default function HomePage() {
  const [banners, setBanners] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [categories, setCategories] = useState([])
  const [activeBanner, setActiveBanner] = useState(0)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  useEffect(() => {
    getBanners().then(r => setBanners(r.data)).catch(() => {})
    getTestimonials().then(r => setTestimonials(r.data)).catch(() => {})
    getCategories().then(r => setCategories(r.data.filter(c => c.slug !== 'dino-kids'))).catch(() => {})
  }, [])

  useEffect(() => {
    if (!banners.length) return
    const t = setInterval(() => setActiveBanner(p => (p + 1) % banners.length), 5500)
    return () => clearInterval(t)
  }, [banners.length])

  const banner = banners[activeBanner]

  return (
    <div className="bg-rita-black">

      {/* ── SEO HEAD ── */}
      <Helmet>
        {/* Title & Description */}
        <title>Rita Cafe & Bistro Rạch Giá | Quán Cà Phê Đẹp – Khu Vui Chơi Dino Trẻ Em</title>
        <meta name="description" content="Rita Cafe & Bistro – Quán cà phê thư giãn đẹp nhất Rạch Giá, Kiên Giang. Không gian ấm cúng, bò né sáng, matcha Nhật Bản, đồ uống đa dạng. Có khu vui chơi Dino Kids Zone cho bé. Mở cửa 07:30–22:30 mỗi ngày." />
        <meta name="keywords" content="quán cà phê Rạch Giá, quán cf Rạch Giá, cafe đẹp Rạch Giá, khu vui chơi Rạch Giá, khu vui chơi trẻ em Rạch Giá, Rita Cafe, Dino Kids Zone, cafe bistro Kiên Giang, quán cafe Kiên Giang, bò né Rạch Giá, matcha Rạch Giá, café Rạch Giá ngon" />

        {/* Canonical */}
        <link rel="canonical" href="https://ritacaferachgia.com/" />

        {/* Robots */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />

        {/* Language & Region */}
        <meta httpEquiv="content-language" content="vi-VN" />
        <html lang="vi" />

        {/* Geo Tags – Local SEO */}
        <meta name="geo.region" content="VN-KG" />
        <meta name="geo.placename" content="Rạch Giá, Kiên Giang, Việt Nam" />
        <meta name="geo.position" content="10.012873;105.080070" />
        <meta name="ICBM" content="10.012873, 105.080070" />

        {/* Open Graph – Facebook / Zalo share */}
        <meta property="og:type" content="restaurant" />
        <meta property="og:site_name" content="Rita Cafe Rạch Giá" />
        <meta property="og:title" content="Rita Cafe & Bistro Rạch Giá – Quán Cà Phê Đẹp & Khu Vui Chơi Dino" />
        <meta property="og:description" content="Quán cà phê thư giãn đẹp nhất Rạch Giá. Không gian ấm cúng, đồ uống ngon, khu vui chơi Dino cho bé. Mở cửa 07:30–22:30." />
        <meta property="og:image" content="https://ritacaferachgia.com/menu/assets/home1.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rita Cafe & Bistro Rạch Giá – Không gian quán cà phê" />
        <meta property="og:url" content="https://ritacaferachgia.com/" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="restaurant:contact_info:locality" content="Rạch Giá" />
        <meta property="restaurant:contact_info:region" content="Kiên Giang" />
        <meta property="restaurant:contact_info:country_name" content="Việt Nam" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rita Cafe & Bistro Rạch Giá" />
        <meta name="twitter:description" content="Quán cà phê đẹp & khu vui chơi Dino trẻ em tại Rạch Giá, Kiên Giang. Mở cửa 07:30–22:30." />
        <meta name="twitter:image" content="https://ritacaferachgia.com/menu/assets/home1.jpg" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative h-screen overflow-hidden flex items-center"
        aria-label="Rita Cafe & Bistro Rạch Giá – Trang chủ"
      >
        <AnimatePresence mode="wait">
          {banner && (
            <motion.div key={activeBanner} className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
              <motion.img
                src={banner.image}
                alt={`Rita Cafe Rạch Giá – ${banner.title}`}
                className="w-full h-full object-cover"
                style={{ y: heroY, scale: heroScale }}
                loading="eager"
                fetchpriority="high"
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, rgba(14,13,13,0.35) 0%, rgba(14,13,13,0.15) 80%, rgba(14,13,13,0.95) 100%)'
              }} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(14,13,13,0.8) 0%, rgba(14,13,13,0.3) 50%, transparent 100%)'
              }} />
              <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20" style={{
                background: 'linear-gradient(to top, rgba(232,87,122,0.3), transparent)'
              }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ opacity: heroOpacity }}>
          <AnimatePresence mode="wait">
            {banner && (
              <motion.div key={activeBanner}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.75 }}
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full text-xs tracking-[0.25em] uppercase mb-6 font-medium"
                  style={{ background: 'rgba(232,87,122,0.15)', color: '#f07898', border: '1px solid rgba(232,87,122,0.3)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {banner.tag}
                </motion.span>

                <h1 className="font-heading leading-none mb-6 max-w-4xl" style={{ fontSize: 'clamp(52px, 10vw, 110px)' }}>
                  {banner.title.split(' ').map((word, i) => (
                    <motion.span key={i} className="inline-block mr-4"
                      initial={{ opacity: 0, y: 70 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.09, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {i === 0
                        ? <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span>
                        : <span className="text-rita-cream">{word}</span>
                      }
                    </motion.span>
                  ))}
                </h1>

                <motion.p className="text-rita-muted text-lg md:text-xl max-w-lg mb-10"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
                  {banner.subtitle}
                </motion.p>

                <motion.div className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                  <Link to={banner.ctaLink}
                    className="group flex items-center gap-3 px-8 py-4 font-medium tracking-wider text-sm uppercase text-white rounded-full transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #e8577a, #c43d5e)' }}
                  >
                    {banner.cta}
                    <motion.span className="group-hover:translate-x-1 transition-transform"><FiArrowRight /></motion.span>
                  </Link>
                  <Link to="/menu"
                    className="flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-wider rounded-full transition-all duration-300 text-rita-cream/70 hover:text-rita-cream"
                    style={{ border: '1px solid rgba(58,54,51,0.9)', background: 'rgba(30,28,27,0.6)' }}
                    aria-label="Xem menu Rita Cafe Rạch Giá"
                  >
                    Xem Menu
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20" role="tablist" aria-label="Banner slides">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)}
              role="tab"
              aria-selected={i === activeBanner}
              aria-label={`Slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{ width: i === activeBanner ? '28px' : '8px', height: '8px', background: i === activeBanner ? '#e8577a' : 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>

        <motion.div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-rita-muted/40"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}
          aria-hidden="true">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-rita-pink/50" />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: '1px solid rgba(58,54,51,0.7)', borderBottom: '1px solid rgba(58,54,51,0.7)', background: '#161514' }} aria-hidden="true">
        <div className="marquee-content whitespace-nowrap">
          {Array(4).fill(['RITA CAFE', '✦', 'CAFE & BISTRO', '✦', 'RẠCH GIÁ', '✦', 'MỞ CỬA 07:30 - 22:30', '✦', 'DINO KIDS ZONE', '✦', 'BÒ NÉ SÁNG', '✦', 'MATCHA NHẬT BẢN', '✦']).flat().map((t, i) => (
            <span key={i} className={t === '✦'
              ? 'text-rita-pink mx-4'
              : 'text-rita-muted/40 mx-8 text-xs tracking-[0.35em] uppercase'}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ── */}
      <section className="py-32 px-6 max-w-7xl mx-auto" aria-labelledby="about-heading">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-[80px] opacity-10"
                style={{ background: '#e8577a' }} aria-hidden="true" />
              <div className="relative rounded-3xl overflow-hidden h-[520px]"
                style={{ border: '1px solid rgba(58,54,51,0.8)' }}>
                <img
                  src="/menu/assets/home1.jpg"
                  alt="Không gian quán cà phê Rita Cafe & Bistro Rạch Giá – Kiên Giang"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="520"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,13,13,0.6), transparent 50%)' }} />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-4 rounded-2xl p-5 min-w-[160px]"
                style={{ background: '#1e1c1b', border: '1px solid rgba(232,87,122,0.3)' }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="font-heading text-4xl mb-1" style={{
                  background: 'linear-gradient(135deg, #e8577a, #f07898)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>4.9★</div>
                <div className="text-rita-muted text-xs">Google Reviews</div>
                <div className="flex gap-0.5 mt-2" aria-label="5 sao đánh giá">
                  {Array(5).fill(0).map((_, i) => (
                    <FiStar key={i} size={11} className="text-rita-pink fill-rita-pink" />
                  ))}
                </div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Về Chúng Tôi</span>
              <h2 id="about-heading" className="font-heading text-5xl md:text-7xl text-rita-cream mt-4 mb-6 leading-tight">
                Nơi Cà Phê <br />
                <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Kể Chuyện
                </span>
              </h2>
              <p className="text-rita-muted leading-relaxed mb-6">
                Rita Cafe & Bistro là quán cà phê đẹp tại Rạch Giá, Kiên Giang với không gian ấm cúng và thoải mái, phục vụ đa dạng đồ uống, bò né sáng, matcha Nhật Bản và các món ăn nhẹ hấp dẫn. Đây là điểm lý tưởng để trò chuyện, nghỉ ngơi hay thưởng thức bữa sáng nhẹ cùng bạn bè trong bầu không khí dễ chịu.
              </p>
              <p className="text-rita-muted leading-relaxed mb-10">
                Không chỉ là quán cà phê — RITA còn có <strong className="text-rita-pink">Khu Vui Chơi Dino Kids Zone</strong> dành riêng cho bé tại Rạch Giá, tạo không gian hoàn hảo cho cả gia đình.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10" role="list" aria-label="Thống kê Rita Cafe">
                {[
                  { num: '25+', label: 'Thức uống' },
                  { num: '4.9★', label: 'Đánh giá' },
                  { num: '∞', label: 'Kỷ niệm' },
                ].map(({ num, label }) => (
                  <div key={label} role="listitem" className="text-center py-4 rounded-2xl" style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}>
                    <div className="font-heading text-3xl" style={{
                      background: 'linear-gradient(135deg, #e8577a, #f07898)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>{num}</div>
                    <div className="text-rita-muted/50 text-xs mt-1 tracking-wide">{label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm uppercase tracking-wider font-medium text-white transition-all duration-300 hover:gap-4"
                style={{ background: 'linear-gradient(135deg, #e8577a, #c43d5e)' }}
                aria-label="Tìm hiểu thêm về Rita Cafe Rạch Giá"
              >
                Tìm Hiểu Thêm <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }} aria-labelledby="menu-heading">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Khám Phá</span>
              <h2 id="menu-heading" className="font-heading text-5xl md:text-7xl text-rita-cream mt-4">Menu Của Chúng Tôi</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.07}>
                <Link to={`/menu/${cat.slug}`} className="group block cursor-hover" aria-label={`Xem menu ${cat.name} tại Rita Cafe Rạch Giá`}>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl h-52 md:h-72"
                    style={{ border: '1px solid rgba(58,54,51,0.7)' }}
                    whileHover={{ borderColor: 'rgba(232,87,122,0.4)' }}
                  >
                    <img
                      src={cat.coverImage}
                      alt={`${cat.name} – Rita Cafe Rạch Giá`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(14,13,13,0.95) 0%, rgba(14,13,13,0.4) 40%, transparent 100%)'
                    }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, rgba(232,87,122,0.15), transparent)` }} />
                    <div className="absolute bottom-0 p-5">
                      <h3 className="font-heading text-xl text-white group-hover:text-rita-pink transition-colors">{cat.name}</h3>
                      <p className="text-white/40 text-xs mt-1 line-clamp-1">{cat.description}</p>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DINO PROMO ── */}
      <section className="relative py-32 px-6 overflow-hidden" aria-labelledby="dino-heading">
        <div className="absolute inset-0">
          <img
            src="/menu/assets/home2.jpg"
            alt="Khu vui chơi Dino Kids Zone cho trẻ em tại Rita Cafe Rạch Giá"
            className="w-full h-full object-cover opacity-30"
            loading="lazy"
            decoding="async"
            width="1920"
            height="800"
          />
          <div className="absolute inset-0" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-lg">
              <motion.div className="text-7xl mb-6"
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                aria-hidden="true">
                🦕
              </motion.div>
              <span className="text-xs tracking-[0.3em] uppercase text-green-400">Kids Zone</span>
              <h2 id="dino-heading" className="font-heading text-6xl text-rita-cream mt-4 mb-6">
                Khu Vui Chơi <br /><span className="text-green-400">Dino</span> Cho Bé
              </h2>
              <p className="text-rita-muted leading-relaxed mb-4">
                Khu vui chơi trẻ em Rạch Giá – Để bé thỏa sức khám phá mỗi ngày trong lúc ba mẹ thư giãn cùng tách cà phê yêu thích
              </p>
              <div className="flex items-center gap-3 mb-8">
                <span className="font-heading text-5xl text-green-400">50.000đ</span>
                <span className="text-rita-muted text-sm">/ bé / lần vào</span>
              </div>
              <Link to="/dino"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-medium tracking-wider text-sm uppercase hover:bg-green-400 transition-all duration-300 rounded-full"
                aria-label="Xem không gian khu vui chơi Dino tại Rita Cafe Rạch Giá"
              >
                Xem Không Gian Quán <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── GALLERY CHECKIN ── */}
      <section className="py-24 px-6 overflow-hidden" aria-labelledby="gallery-heading">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Check-in</span>
              <h2 id="gallery-heading" className="font-heading text-5xl md:text-7xl text-rita-cream mt-4">
                Khoảnh Khắc{' '}
                <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tại RITA
                </span>
              </h2>
              <p className="text-rita-muted mt-4 text-sm max-w-md mx-auto">
                Mỗi góc quán cà phê Rạch Giá là một khung hình — cùng lưu lại khoảnh khắc của bạn
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {[
              { src: '/menu/assets/khach1.jpg', span: 'row-span-2 col-span-1', alt: 'Khách check-in tại Rita Cafe Rạch Giá' },
              { src: '/menu/assets/khach2.jpg', span: 'col-span-1', alt: 'Không gian quán cà phê Rita Cafe Rạch Giá' },
              { src: '/menu/assets/khach3.jpg', span: 'col-span-2 row-span-1', alt: 'Đồ uống Rita Cafe Bistro Rạch Giá' },
              { src: '/menu/assets/khach4.jpg', span: 'col-span-1', alt: 'Góc check-in đẹp Rita Cafe Kiên Giang' },
              { src: '/menu/assets/khach5.jpg', span: 'col-span-2 row-span-2', alt: 'Khu vui chơi Dino trẻ em tại Rita Cafe Rạch Giá' },
              { src: '/menu/assets/khach6.jpg', span: 'col-span-1', alt: 'Thức uống ngon Rita Cafe Rạch Giá' },
              { src: '/menu/assets/khach7.jpg', span: 'col-span-1', alt: 'Bạn bè tụ họp tại Rita Cafe Rạch Giá' },
              { src: '/menu/assets/khach2.jpg', span: 'col-span-2 row-span-1', alt: 'Quán cà phê Rita Cafe không gian đẹp Rạch Giá' },
            ].map((photo, i) => (
              <GalleryItem key={i} src={photo.src} alt={photo.alt} span={photo.span} index={i} />
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-10 text-center">
              <a href="https://www.facebook.com/ritarachgia/photos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Xem thêm ảnh Rita Cafe Rạch Giá trên Facebook"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm tracking-wider uppercase font-medium text-rita-cream/70 hover:text-rita-cream transition-all duration-300 group"
                style={{ border: '1px solid rgba(58,54,51,0.8)', background: '#1e1c1b' }}>
                <span>Xem thêm trên Facebook</span>
                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }} aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Khách Hàng Nói Gì</span>
              <h2 id="reviews-heading" className="font-heading text-5xl text-rita-cream mt-4">Cảm Nhận Thực Tế</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
                  whileHover={{ y: -6, borderColor: 'rgba(232,87,122,0.35)', boxShadow: '0 20px 60px rgba(232,87,122,0.08)' }}
                  itemScope
                  itemType="https://schema.org/Review"
                >
                  <div className="flex gap-0.5 mb-4" aria-label={`Đánh giá ${t.rating} sao`}>
                    {Array(t.rating).fill(0).map((_, i) => (
                      <FiStar key={i} size={12} className="text-rita-pink fill-rita-pink" />
                    ))}
                  </div>
                  <p className="text-rita-muted text-sm leading-relaxed mb-6 italic" itemProp="reviewBody">"{t.text}"</p>
                  <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <img
                      src={t.avatar}
                      alt={`Khách hàng ${t.name} đánh giá Rita Cafe Rạch Giá`}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-rita-pink/25"
                      loading="lazy"
                      decoding="async"
                      width="32"
                      height="32"
                    />
                    <span className="text-rita-cream/60 text-xs font-medium" itemProp="name">{t.name}</span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

function GalleryItem({ src, alt, span, index }) {
  const [hovered, setHovered] = useState(false)
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      <motion.div
        className={`relative overflow-hidden rounded-2xl cursor-pointer ${span}`}
        style={{ border: '1px solid rgba(58,54,51,0.6)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.06 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ borderColor: 'rgba(232,87,122,0.45)' }}
        onClick={() => setLightbox(true)}
        role="button"
        aria-label={alt}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setLightbox(true)}
      >
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          loading="lazy"
          decoding="async"
        />

        <motion.div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(232,87,122,0.25)', backdropFilter: 'blur(2px)' }}
          initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true">
          <motion.div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(232,87,122,0.9)' }}
            initial={{ scale: 0.5 }} animate={{ scale: hovered ? 1 : 0.5 }}
            transition={{ duration: 0.25 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" aria-hidden="true">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </motion.div>
        </motion.div>

        <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(232,87,122,0.4) 50%)' }}
          aria-hidden="true" />
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            style={{ background: 'rgba(4,3,3,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <motion.img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ maxWidth: '90vw', maxHeight: '90vh', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              onClick={e => e.stopPropagation()}
            />
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: 'rgba(40,37,35,0.9)', border: '1px solid rgba(58,54,51,0.8)' }}
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
              onClick={() => setLightbox(false)}
              aria-label="Đóng ảnh">
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}