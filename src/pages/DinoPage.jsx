import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const G1 = '#4ade80'
const G2 = '#22c55e'
const CEMENT = '#3a3632'
const CEMENT2 = '#2a2825'
const DARK = '#0e0d0d'

const gallery = [
  '/menu/assets/dino3.jpg',
  '/menu/assets/dino4.jpg',
  '/menu/assets/dino5.jpg',
  '/menu/assets/dino6.jpg',
  '/menu/assets/dino7.jpg',
  '/menu/assets/dino8.jpg',
  '/menu/assets/dino9.jpg',
  ]



const activities = [
  { emoji: '🧗', title: 'Khu Vận Động', desc: 'Leo trèo, trượt cầu thang, vận động an toàn cho trẻ nhỏ' },
  { emoji: '🎨', title: 'Góc Sáng Tạo', desc: 'Tô màu, vẽ tranh và các hoạt động thủ công thú vị' },
  { emoji: '🧱', title: 'Góc Lắp Ráp', desc: 'Khối màu sắc cho bé tha hồ xếp hình và lắp ghép' },
  { emoji: '📸', title: 'Góc Check-in', desc: 'Không gian chụp ảnh xinh xắn với prop dino siêu cute' },
]

const faqs = [
  { q: 'Bé mấy tuổi thì vào được?', a: 'Phù hợp cho bé từ 2 – 10 tuổi. Trẻ dưới 2 tuổi vào miễn phí nhưng cần có người lớn đi kèm.' },
  { q: 'Có giới hạn thời gian không?', a: 'Không! Bé được chơi thoải mái không giới hạn thời gian trong một lần vé.' },
  { q: 'Ba mẹ có phải mua vé không?', a: 'Phụ huynh vào miễn phí để quan sát, không cần mua vé.' },
  { q: 'Có giữ đồ / khóa tủ không?', a: 'Có tủ khóa miễn phí để ba mẹ cất đồ khi vào khu vui chơi cùng bé.' },
]

const perks = [
  'Phù hợp bé từ 2 – 10 tuổi',
  'Phụ huynh vào quan sát miễn phí',
  'Không giới hạn thời gian chơi',
  'Có tủ khóa giữ đồ miễn phí',
  'Nhân viên hỗ trợ tại khu vui chơi',
]

// ── Reusable hook: fade-in khi scroll đến ──
function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '-50px', ...options }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

// ── Reveal wrapper component ──
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useReveal()
  const dirs = {
    up: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
  }
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0,0)' : dirs[direction] || dirs.up,
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ── Arrow icon ──
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export default function KidsZonePage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [lightbox, setLightbox] = useState(null)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => setHeroVisible(true))
    // Close lightbox on Escape
    const fn = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <div className="bg-rita-black text-rita-cream overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/menu/assets/dino1.jpg"
            alt="Dino Land"
            className="w-full h-full object-cover opacity-40"
            fetchpriority="high"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(14,13,13,0.95) 40%, rgba(14,13,13,0.7) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(34,197,94,0.08), transparent)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.25em] uppercase mb-6 font-medium"
              style={{
                background: 'rgba(74,222,128,0.1)', color: G1,
                border: '1px solid rgba(74,222,128,0.25)',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'scale(1)' : 'scale(0.8)',
                transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
              }}>
              <span>🦕</span> Kids Zone
            </span>

            <h1 className="font-heading leading-none mb-6 max-w-3xl"
              style={{ fontSize: 'clamp(56px, 10vw, 110px)' }}>
              <span className="text-rita-cream">Khu Vui Chơi </span><br />
              <span style={{ color: G1 }}>Dino</span>
              <span className="text-rita-cream"> Cho Bé</span>
            </h1>

            <p className="text-rita-muted text-lg max-w-md mb-10 leading-relaxed">
              Để bé thỏa sức khám phá mỗi ngày trong lúc ba mẹ thư giãn cùng tách cà phê yêu thích
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <span className="font-heading text-5xl" style={{ color: G1 }}>50.000đ</span>
              <span className="text-rita-muted text-sm">/ bé / lần vào</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-black"
                style={{
                  background: `linear-gradient(135deg, ${G1}, ${G2})`,
                  boxShadow: '0 12px 35px rgba(74,222,128,0.25)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                Xem Bảng Giá <IconArrow />
              </a>
              <a href="#gallery"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm uppercase tracking-wider"
                style={{
                  border: `1px solid ${CEMENT}`, color: '#8a8078',
                  background: 'rgba(58,54,50,0.2)', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'white'}
                onMouseLeave={e => e.currentTarget.style.color = '#8a8078'}>
                Xem Hình Ảnh
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator — CSS animation */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center"
          style={{ animation: 'bobY 2.2s ease-in-out infinite' }}>
          <div className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.5))' }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[460px]"
                style={{ border: `1px solid ${CEMENT}` }}>
                <img
                  src="/menu/assets/dino2.jpg"
                  alt="Kids Area" className="w-full h-full object-cover" loading="lazy"
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(14,13,13,0.6), transparent 55%)' }} />
              </div>
              {/* Float badge — CSS animation */}
              <div className="absolute -bottom-5 -right-4 px-5 py-4 rounded-2xl text-center"
                style={{
                  background: CEMENT2, border: '1px solid rgba(74,222,128,0.3)',
                  minWidth: '130px', animation: 'floatY 3.5s ease-in-out infinite',
                }}>
                <div className="text-3xl mb-1">🦕</div>
                <div className="font-heading text-sm" style={{ color: G1 }}>Dino Land</div>
                <div className="text-xs text-rita-muted mt-0.5">tầng 2</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Về Dino Land</span>
            <h2 className="font-heading mt-3 mb-6 leading-tight text-rita-cream"
              style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              An Toàn — Sạch Sẽ<br />
              <span style={{ color: G1 }}>& Thật Vui</span>
            </h2>
            <p className="text-rita-muted leading-relaxed mb-8 text-sm">
              Không gian được thiết kế riêng cho trẻ nhỏ với chất liệu an toàn, vệ sinh mỗi ngày. Ba mẹ ngồi quan sát thoải mái trong khi bé tha hồ khám phá.
            </p>
            <div className="space-y-3 mb-10">
              {perks.map((text, i) => (
                <PerkItem key={i} text={text} delay={i * 0.07} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ACTIVITIES ─── */}
      <section className="py-24 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Hoạt Động</span>
              <h2 className="font-heading text-5xl md:text-6xl text-rita-cream mt-4">
                Bé Có Thể <span style={{ color: G1 }}>Làm Gì?</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activities.map((act, i) => (
              <ActivityCard key={i} act={act} delay={i * 0.08} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Hình Ảnh</span>
              <h2 className="font-heading text-5xl md:text-6xl text-rita-cream mt-4">
                Khoảnh Khắc <span style={{ color: G1 }}>Của Bé</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {gallery.map((src, i) => (
              <GalleryItem key={i} src={src} index={i} onClick={() => setLightbox(src)} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO ─── */}
      <section className="py-16 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-4xl md:text-5xl text-rita-cream mb-10 text-center">
              Xem Bé Vui Chơi 🎬
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${CEMENT}`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="h-0.5 w-full"
                style={{ background: `linear-gradient(to right, transparent, ${G2}, transparent)` }} />
              <video src="/dinovideo.mp4" controls className="w-full object-cover"
                style={{ height: '70vh' }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full"
            style={{ background: G2, filter: 'blur(130px)', opacity: 0.06 }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Vé Vào Cổng</span>
              <h2 className="font-heading text-5xl md:text-7xl text-rita-cream mt-4">Bảng Giá</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PricingCard />
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Giải Đáp</span>
              <h2 className="font-heading text-4xl md:text-5xl text-rita-cream mt-4">Câu Hỏi Thường Gặp</h2>
            </div>
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <FaqItem faq={faq} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/menu/assets/dino1.jpg"
            alt="Dino" className="w-full h-full object-cover opacity-25" loading="lazy"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(14,13,13,0.95) 40%, rgba(14,13,13,0.75) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <Reveal>
            <div className="max-w-lg">
              <div className="text-7xl mb-6" style={{ animation: 'wobble 4s ease-in-out infinite' }}>🦕</div>
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Dino Land</span>
              <h2 className="font-heading text-6xl text-rita-cream mt-4 mb-6">
                Hẹn Gặp Bé<br /><span style={{ color: G1 }}>Tại RITA!</span>
              </h2>
              <p className="text-rita-muted leading-relaxed mb-10 max-w-sm">
                Mang bé đến RITA — nơi cà phê ngon cho ba mẹ, và cả một thế giới khám phá cho bé
              </p>
              <Link to="/"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-black"
                style={{
                  background: `linear-gradient(135deg, ${G1}, ${G2})`,
                  boxShadow: '0 12px 35px rgba(74,222,128,0.25)',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                Về Trang Chủ <IconArrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── LIGHTBOX ─── */}
      {lightbox && (
        <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
      )}

      {/* Global keyframes */}
      <style>{`
        @keyframes bobY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes wobble { 0%,100%{transform:rotate(0)} 20%{transform:rotate(-5deg)} 40%{transform:rotate(5deg)} 60%{transform:rotate(-3deg)} 80%{transform:rotate(3deg)} }
        @keyframes emojiRock { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-6deg)} 75%{transform:rotate(6deg)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  )
}

// ── Sub-components ──

function PerkItem({ text, delay }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className="flex items-center gap-3 text-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-16px)',
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
      }}>
      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold text-black"
        style={{ background: G1 }}>✓</span>
      <span className="text-rita-muted">{text}</span>
    </div>
  )
}

function ActivityCard({ act, delay, index }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  return (
    <div ref={ref}
      className="rounded-2xl p-6 text-center"
      style={{
        background: DARK,
        border: `1px solid ${hovered ? 'rgba(74,222,128,0.4)' : CEMENT}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s, border-color 0.25s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="text-4xl mb-4"
        style={{ animation: `emojiRock ${4 + index * 0.5}s ease-in-out infinite` }}>
        {act.emoji}
      </div>
      <h3 className="font-heading text-sm mb-2" style={{ color: G1 }}>{act.title}</h3>
      <p className="text-rita-muted text-xs leading-relaxed">{act.desc}</p>
    </div>
  )
}

function GalleryItem({ src, index, onClick }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)
  const isLarge = index === 0 || index === 5
  const isWide = index === 2
  return (
    <div ref={ref}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${isLarge ? 'md:col-span-2 md:row-span-2' : isWide ? 'col-span-2' : ''}`}
      style={{
        border: `1px solid ${hovered ? 'rgba(74,222,128,0.45)' : CEMENT}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s, border-color 0.25s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}>
      <img src={src} alt="" className="w-full h-full object-cover"
        loading="lazy"
        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.7s ease' }} />
      <div className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'rgba(34,197,94,0.15)',
          backdropFilter: 'blur(2px)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl"
          style={{ background: G1 }}>⤢</div>
      </div>
    </div>
  )
}

function PricingCard() {
  const [hovered, setHovered] = useState(false)
  return (
    <div className="relative rounded-3xl overflow-hidden mx-auto"
      style={{
        maxWidth: '460px',
        background: CEMENT2,
        border: '1.5px solid rgba(74,222,128,0.35)',
        boxShadow: hovered
          ? '0 0 80px rgba(34,197,94,0.14), 0 40px 100px rgba(0,0,0,0.7)'
          : '0 0 60px rgba(34,197,94,0.08), 0 32px 80px rgba(0,0,0,0.6)',
        transition: 'box-shadow 0.4s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="h-1"
        style={{ background: `linear-gradient(to right, transparent, ${G1}, ${G2}, ${G1}, transparent)` }} />

      <div className="px-10 pb-10 pt-10 text-center">
        <div className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: 'rgba(74,222,128,0.45)' }}>Mỗi bé / lần vào</div>

        <div className="font-heading mb-1"
          style={{ fontSize: 'clamp(72px, 16vw, 96px)', lineHeight: 1, color: G1 }}>50K</div>
        <div className="text-rita-muted text-sm mb-8">= 50.000 VNĐ</div>

        <div className="w-full h-px mb-8"
          style={{ background: `linear-gradient(to right, transparent, ${CEMENT}, transparent)` }} />

        <div className="space-y-3 mb-10 text-left">
          {[
            ['🦕', 'Vào Dino Land không giới hạn thời gian'],
            ['👨‍👩‍👧', 'Ba mẹ vào quan sát miễn phí'],
            ['🔐', 'Tủ khóa đồ miễn phí'],
            ['🛡', 'Nhân viên hỗ trợ & đảm bảo an toàn'],
          ].map(([icon, text], i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-rita-muted">
              <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-base"
                style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)' }}>
                {icon}
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <Link to="/"
          className="block w-full py-4 rounded-full text-black font-semibold text-sm uppercase tracking-wider text-center"
          style={{
            background: `linear-gradient(135deg, ${G1}, ${G2})`,
            boxShadow: '0 8px 30px rgba(74,222,128,0.25)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
          Đến Rita Ngay
        </Link>
      </div>
    </div>
  )
}

function FaqItem({ faq, open, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: DARK, border: `1px solid ${open ? 'rgba(74,222,128,0.35)' : CEMENT}`, transition: 'border-color 0.2s' }}>
      <button className="w-full flex items-center justify-between px-6 py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={onToggle}>
        <span className="font-medium text-rita-cream text-sm pr-4">{faq.q}</span>
        <span style={{
          color: G1, fontSize: '20px', fontWeight: 300, flexShrink: 0,
          display: 'inline-block',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
        }}>+</span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '200px' : '0',
        opacity: open ? 1 : 0,
        transition: 'max-height 0.25s ease, opacity 0.2s',
      }}>
        <div className="px-6 pb-5 pt-1 text-sm text-rita-muted leading-relaxed"
          style={{ borderTop: `1px solid ${CEMENT}` }}>
          <div className="pt-3">{faq.a}</div>
        </div>
      </div>
    </div>
  )
}

function Lightbox({ src, onClose }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
      style={{
        background: 'rgba(4,3,3,0.96)',
        backdropFilter: 'blur(20px)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
      onClick={onClose}>
      <img src={src} alt=""
        className="object-contain rounded-2xl"
        style={{
          maxWidth: '90vw', maxHeight: '90vh',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          border: `1px solid ${CEMENT}`,
          transform: mounted ? 'scale(1)' : 'scale(0.9)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s',
        }}
        onClick={e => e.stopPropagation()} />
      <button className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{
          background: CEMENT2, border: `1px solid ${CEMENT}`,
          cursor: 'pointer', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
        onClick={onClose}>✕</button>
    </div>
  )
}