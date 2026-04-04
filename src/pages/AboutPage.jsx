import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'

const gallery = [
  '/menu/assets/rita3.jpg',
  '/menu/assets/rita4.jpg',
  '/menu/assets/rita5.jpg',
  '/menu/assets/rita6.jpg',
  '/menu/assets/rita7.jpg',
  '/menu/assets/rita8.jpg',
]

const stats = [
  { num: '25+', label: 'Thức uống' },
  { num: '1000+', label: 'Khách/tháng' },
  { num: '4.9★', label: 'Google Rating' },
  { num: '2025', label: 'Thành lập' },
]

const contacts = [
  { icon: '📍', text: 'Rạch Giá, Kiên Giang, Việt Nam' },
  { icon: '🕐', text: '07:30 AM — 20:30 PM (Mỗi ngày)' },
  { icon: '📘', text: 'fb.com/ritacaferachgia' },
  { icon: '🎵', text: '@ritacafe.rachgia' },
]

// ── IntersectionObserver hook ──
function useReveal(rootMargin = '-50px') {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useReveal()
  const dirs = { up: 'translateY(28px)', left: 'translateX(-28px)', right: 'translateX(28px)' }
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translate(0,0)' : (dirs[direction] || dirs.up),
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

// ── Lazy Google Map (chỉ load khi scroll đến) ──
function LazyMap() {
  const [ref, visible] = useReveal('-100px')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (visible) setLoaded(true)
  }, [visible])

  return (
    <div ref={ref} className="relative h-[400px] md:h-[440px] overflow-hidden">
      {loaded ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.91316635733!2d105.07858871094975!3d10.024024272578824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b3002319607f%3A0xd89865f1f3e9eb14!2sRita%20Cafe%20%26%20Bistro!5e0!3m2!1svi!2s!4v1772550170417!5m2!1svi!2s"
          width="100%" height="100%"
          style={{ border: 0 }}
          allowFullScreen="" loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="RITA Cafe location"
        />
      ) : (
        // Placeholder khi chưa load
        <div className="w-full h-full flex items-center justify-center"
          style={{ background: '#1a1816' }}>
          <span className="text-rita-muted text-sm">Đang tải bản đồ...</span>
        </div>
      )}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(14,13,13,0.5), transparent 60%)' }} />
    </div>
  )
}

export default function AboutPage() {
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => setHeroVisible(true))
  }, [])

  return (
    <div className="bg-rita-black min-h-screen">

      {/* ── HERO ── */}
      <div className="relative h-screen overflow-hidden flex items-center">
        {/* Bg image — no parallax (bỏ useScroll/useTransform) */}
        <div className="absolute inset-0">
          <img
            src="/menu/assets/banner1.jpg"
            alt="About Rita"
            className="w-full h-full object-cover"
            fetchpriority="high"
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(14,13,13,0.92) 0%, rgba(14,13,13,0.6) 60%, rgba(14,13,13,0.85) 100%)'
          }} />
          <div className="absolute inset-0 opacity-15" style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(232,87,122,0.4), transparent 60%)'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Badge */}
          <span className="inline-block text-xs tracking-[0.35em] uppercase px-4 py-2 rounded-full mb-8 font-medium"
            style={{
              background: 'rgba(232,87,122,0.12)', color: '#f07898',
              border: '1px solid rgba(232,87,122,0.25)',
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s',
            }}>
            ✦ Câu Chuyện RITA ✦
          </span>

          {/* Heading words */}
          {['VỀ', 'CHÚNG', 'TÔI'].map((word, i) => (
            <div key={word}
              className="block font-heading leading-none"
              style={{
                fontSize: 'clamp(60px, 14vw, 150px)',
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(-80px)',
                transition: `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${0.2 + i * 0.1}s, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${0.2 + i * 0.1}s`,
              }}>
              {i === 0
                ? <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span>
                : <span className="text-rita-cream">{word}</span>
              }
            </div>
          ))}
        </div>

        {/* Scroll cue — CSS only */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ animation: 'bobY 2s ease-in-out infinite' }}>
          <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,87,122,0.6))' }} />
        </div>
      </div>

      {/* ── STORY ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal direction="left">
            <div className="relative h-[560px]">
              {/* Pink glow */}
              <div className="absolute rounded-full pointer-events-none"
                style={{ background: '#e8577a', filter: 'blur(80px)', opacity: 0.06, width: '70%', height: '70%', left: '15%', top: '15%' }} />

              <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(58,54,51,0.8)' }}>
                <img src="/menu/assets/rita1.jpg" alt="Cafe interior" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(232,87,122,0.3)' }}>
                <img src="/menu/assets/rita2.jpg" alt="Coffee" className="w-full h-full object-cover" loading="lazy" />
              </div>

              {/* Float badge — CSS animation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl p-5 text-center z-10 w-48"
                style={{
                  background: 'rgba(14,13,13,0.9)',
                  border: '1px solid rgba(232,87,122,0.35)',
                  backdropFilter: 'blur(12px)',
                  animation: 'floatY 4s ease-in-out infinite',
                }}>
                <div className="text-3xl mb-2">☕</div>
                <div className="font-heading text-sm text-rita-pink leading-tight">"Một tách cà phê, vạn câu chuyện"</div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Câu Chuyện</span>
            <h2 className="font-heading text-5xl text-rita-cream mt-4 mb-8 leading-tight">
              Sinh Ra Từ<br />
              <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tình Yêu Cà Phê
              </span>
            </h2>
            <div className="space-y-5 text-rita-muted leading-relaxed">
              <p>
                <strong className="text-rita-cream">RITA Cafe & Bistro</strong> không chỉ là một quán cà phê — đó là không gian sống, là nơi người Rạch Giá có thể đến để tìm thấy bình yên giữa nhịp sống hối hả.
              </p>
              <p>
                Chúng tôi tin rằng một tách cà phê ngon không chỉ đến từ hạt cà phê tốt, mà còn từ tâm huyết của người pha chế, từ không gian ấm áp và từ nụ cười của những người phục vụ.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {stats.map(({ num, label }) => (
                <div key={label} className="p-5 rounded-2xl text-center"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}>
                  <div className="font-heading text-3xl"
                    style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {num}
                  </div>
                  <div className="text-rita-muted/50 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-24 px-6 bg-[#1f1b19]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Không Gian</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">Một Thoáng RITA</h2>
            </div>
          </Reveal>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((img, i) => (
              <GalleryItem key={i} src={img} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-3xl overflow-hidden relative"
              style={{ border: '1px solid rgba(232,87,122,0.25)' }}>
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(232,87,122,0.08), rgba(14,13,13,0.95))' }} />

              <div className="relative z-10 p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Ghé Thăm Chúng Tôi</span>
                  <h2 className="font-heading text-4xl md:text-5xl text-rita-cream mt-4 mb-8 leading-tight">
                    Hẹn Gặp Bạn<br />
                    <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      Tại RITA ☕
                    </span>
                  </h2>
                  <div className="space-y-4">
                    {contacts.map(({ icon, text }, i) => (
                      <div key={i} className="flex items-center gap-3 text-rita-muted text-sm">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                          style={{ background: 'rgba(232,87,122,0.12)', border: '1px solid rgba(232,87,122,0.2)' }}>
                          {icon}
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  {/* CSS wobble thay animate */}
                  <div className="text-8xl mb-6 inline-block"
                    style={{ animation: 'wobble 5s ease-in-out infinite' }}>☕</div>
                  <p className="text-rita-muted text-sm leading-relaxed mb-8 italic">
                    "Mỗi lần đến RITA là một kỷ niệm đáng nhớ — cùng bạn bè, gia đình hay chỉ là một mình với cuốn sách yêu thích."
                  </p>
                  <Link to="/menu"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-white"
                    style={{
                      background: 'linear-gradient(135deg, #e8577a, #c43d5e)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                    Khám Phá Menu →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MAP — lazy load ── */}
      <LazyMap />

      <style>{`
        @keyframes bobY { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)} }
        @keyframes floatY { 0%,100%{transform:translateX(-50%) translateY(-50%)} 50%{transform:translateX(-50%) translateY(calc(-50% - 8px))} }
        @keyframes wobble { 0%,100%{transform:rotate(0)} 20%{transform:rotate(5deg)} 40%{transform:rotate(-5deg)} 60%{transform:rotate(3deg)} 80%{transform:rotate(-3deg)} }
      `}</style>
    </div>
  )
}

// ── Gallery item với hover CSS thuần ──
function GalleryItem({ src, index }) {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref}
      className="relative overflow-hidden rounded-3xl break-inside-avoid"
      style={{
        border: `1px solid ${hovered ? 'rgba(232,87,122,0.4)' : '#3a3633'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s ease ${index * 0.07}s, border-color 0.3s`,
        marginBottom: '1.5rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <img
        src={src} alt={`Rita ${index + 1}`}
        className="w-full object-cover"
        loading="lazy"
        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.7s ease' }}
      />
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top right, rgba(232,87,122,0.2), transparent)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s',
        }} />
    </div>
  )
}