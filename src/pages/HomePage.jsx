import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getBanners, getTestimonials, getCategories } from '../services/api'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowRight, FiStar, FiMapPin, FiClock, FiWifi } from 'react-icons/fi'

// Cement-tone palette helpers
const PINK = '#e8577a'
const CEMENT = '#1e1c1b'

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
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <AnimatePresence mode="wait">
          {banner && (
            <motion.div key={activeBanner} className="absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
              <motion.img src={banner.image} alt={banner.title}
                className="w-full h-full object-cover" style={{ y: heroY, scale: heroScale }} />
              {/* Cement-toned overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, rgba(14,13,13,0.35) 0%, rgba(14,13,13,0.15) 80%, rgba(14,13,13,0.95) 100%)'
              }} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(14,13,13,0.8) 0%, rgba(14,13,13,0.3) 50%, transparent 100%)'
              }} />
              {/* Subtle pink tint at bottom */}
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
                  >
                    Xem Menu
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setActiveBanner(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === activeBanner ? '28px' : '8px', height: '8px', background: i === activeBanner ? '#e8577a' : 'rgba(255,255,255,0.25)' }} />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-rita-muted/40"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-rita-pink/50" />
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden py-3" style={{ borderTop: '1px solid rgba(58,54,51,0.7)', borderBottom: '1px solid rgba(58,54,51,0.7)', background: '#161514' }}>
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
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-[80px] opacity-10"
                style={{ background: '#e8577a' }} />
              <div className="relative rounded-3xl overflow-hidden h-[520px]"
                style={{ border: '1px solid rgba(58,54,51,0.8)' }}>
                <img src="https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/577766949_122139730784940477_4349435687417446703_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=wbMbNnUuB_UQ7kNvwEhFmP9&_nc_oc=AdlEZekkVyV8tulGENSsE_nLF-P1NRlw8YnSIZMOhoA6pTELkBSKClE09mXUXXEQDIU&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=X_J_-fJYReY8nGqm8jO64g&_nc_ss=8&oh=00_AfzU_a8IbfXomDDICuuCIT50wTt7tUkr1iu6D3KSWCn1KQ&oe=69AB3A03"
                  alt="Rita Cafe" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,13,13,0.6), transparent 50%)' }} />
              </div>
              {/* Floating stat card */}
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
                <div className="flex gap-0.5 mt-2">
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
              <h2 className="font-heading text-5xl md:text-7xl text-rita-cream mt-4 mb-6 leading-tight">
                Nơi Cà Phê <br />
                <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Kể Chuyện
                </span>
              </h2>
              <p className="text-rita-muted leading-relaxed mb-6">
                Rita Cafe & Bistro là một quán cà phê thư giãn ở Rạch Giá với không gian ấm cúng và thoải mái, phục vụ đa dạng đồ uống, thức ăn sáng và các món ăn nhẹ hấp dẫn. Đây là điểm lý tưởng để trò chuyện, nghỉ ngơi hay thưởng thức bữa sáng nhẹ cùng bạn bè trong bầu không khí dễ chịu.
              </p>
              <p className="text-rita-muted leading-relaxed mb-10">
                Không chỉ là quán cà phê — RITA còn có <strong className="text-rita-pink">Khu Vui Chơi Dino</strong> dành riêng cho bé, tạo không gian hoàn hảo cho cả gia đình.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { num: '25+', label: 'Thức uống' },
                  { num: '4.9★', label: 'Đánh giá' },
                  { num: '∞', label: 'Kỷ niệm' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center py-4 rounded-2xl" style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}>
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
                style={{ background: 'linear-gradient(135deg, #e8577a, #c43d5e)' }}>
                Tìm Hiểu Thêm <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Khám Phá</span>
              <h2 className="font-heading text-5xl md:text-7xl text-rita-cream mt-4">Menu Của Chúng Tôi</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.07}>
                <Link to={`/menu/${cat.slug}`} className="group block cursor-hover">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl h-52 md:h-72"
                    style={{ border: '1px solid rgba(58,54,51,0.7)' }}
                    whileHover={{ borderColor: 'rgba(232,87,122,0.4)' }}
                  >
                    <img src={cat.coverImage} alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to top, rgba(14,13,13,0.95) 0%, rgba(14,13,13,0.4) 40%, transparent 100%)'
                    }} />
                    {/* Pink tint on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(135deg, rgba(232,87,122,0.15), transparent)` }} />
                    <div className="absolute bottom-0 p-5">
                      <div className="text-2xl mb-1">{cat.icon}</div>
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

      {/* ── INFO CARDS ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: FiMapPin, title: 'Địa Chỉ', value: 'Rạch Giá, Kiên Giang', sub: 'Gần trung tâm thành phố', color: '#e8577a' },
            { icon: FiClock, title: 'Giờ Mở Cửa', value: '07:30am — 22:30pm', sub: 'Mở cửa 7 ngày / tuần', color: '#82b4ff' },
            { icon: FiWifi, title: 'WiFi Miễn Phí', value: 'RITA_CAFE', sub: 'Pass: chucbanhanhphuc', color: '#5cd68c' },
          ].map(({ icon: Icon, title, value, sub, color }, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl p-8"
                style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
                whileHover={{ y: -6, borderColor: `${color}40` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <div className="text-rita-muted/50 text-xs tracking-widest uppercase mb-1">{title}</div>
                <div className="font-heading text-xl text-rita-cream mb-1">{value}</div>
                <div className="text-rita-muted text-sm">{sub}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── DINO PROMO ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1920&q=80"
            alt="Dino" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,13,13,0.95) 40%, rgba(14,13,13,0.7) 100%)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-lg">
              <motion.div className="text-7xl mb-6"
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}>
                🦕
              </motion.div>
              <span className="text-xs tracking-[0.3em] uppercase text-green-400">Kids Zone</span>
              <h2 className="font-heading text-6xl text-rita-cream mt-4 mb-6">
                Khu Vui Chơi <br /><span className="text-green-400">Dino</span> Cho Bé
              </h2>
              <p className="text-rita-muted leading-relaxed mb-4">
              Để bé thỏa sức khám phá mỗi ngày trong lúc ba mẹ thư giãn cùng tách cà phê yêu thích
              </p>
              <div className="flex items-center gap-3 mb-8">
                <span className="font-heading text-5xl text-green-400">50.000đ</span>
                <span className="text-rita-muted text-sm">/ bé / lần vào</span>
              </div>
              <Link to="/dino"
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 text-white font-medium tracking-wider text-sm uppercase hover:bg-green-400 transition-all duration-300 rounded-full">
                Tìm Hiểu Thêm <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Khách Hàng Nói Gì</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">Cảm Nhận Thực Tế</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl p-6 h-full"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
                  whileHover={{ y: -6, borderColor: 'rgba(232,87,122,0.35)', boxShadow: '0 20px 60px rgba(232,87,122,0.08)' }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array(t.rating).fill(0).map((_, i) => (
                      <FiStar key={i} size={12} className="text-rita-pink fill-rita-pink" />
                    ))}
                  </div>
                  <p className="text-rita-muted text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover ring-1 ring-rita-pink/25" />
                    <span className="text-rita-cream/60 text-xs font-medium">{t.name}</span>
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