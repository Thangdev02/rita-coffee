import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiFacebook, FiMapPin, FiClock, FiPhone } from 'react-icons/fi'

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#0e0d0d', borderTop: '1px solid rgba(58,54,51,0.8)' }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
      }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse, #e8577a, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="font-heading text-5xl mb-1 tracking-widest" style={{
              background: 'linear-gradient(135deg, #e8577a, #f07898)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>RITA</div>
            <div className="text-xs tracking-[0.3em] text-rita-pink/40 uppercase mb-6">Cafe & Bistro</div>
            <p className="text-rita-muted text-sm leading-relaxed max-w-xs">
              Không gian cà phê hiện đại, nơi hội tụ của những tâm hồn yêu cái đẹp tại Rạch Giá.
            </p>
            <div className="flex gap-4 mt-6">
              <motion.a
                href="https://www.facebook.com/ritarachgia/?rdid=CujuIBHS70MZezCF"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-rita-muted hover:text-rita-pink transition-colors"
                style={{ border: '1px solid rgba(58,54,51,0.9)' }}>
                <FiFacebook size={16} />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@ritacafe.rachgia"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-rita-muted hover:text-rita-pink transition-colors"
                style={{ border: '1px solid rgba(58,54,51,0.9)' }}>
                <TikTokIcon size={16} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-rita-pink mb-6">Điều Hướng</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Trang Chủ', to: '/' },
                { label: 'Menu Đồ Uống', to: '/menu' },
                { label: 'Ăn Sáng', to: '/menu/an-sang' },
                { label: 'Khu Vui Chơi Dino', to: '/dino' },
                { label: 'Về Chúng Tôi', to: '/about' },
              ].map((item) => (
                <Link key={item.to} to={item.to}
                  className="text-rita-muted hover:text-rita-pink text-sm transition-colors flex items-center gap-2 group">
                  <span className="w-4 h-px bg-rita-pink/0 group-hover:bg-rita-pink/60 transition-all" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-rita-pink mb-6">Thông Tin</h4>
            <div className="flex flex-col gap-4">
              {[
                { icon: FiMapPin, text: 'L11 Huỳnh Thúc Kháng - Rạch Giá, Kiên Giang' },
                { icon: FiClock, text: '07:30 AM — 22:30 PM' },
                { icon: FiPhone, text: '0932 991 993' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 text-rita-muted text-sm">
                  <Icon size={14} className="text-rita-pink/60 flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(58,54,51,0.6)' }}>
          <p className="text-rita-muted/40 text-xs tracking-widest">© 2025 RITA CAFE & BISTRO.</p>
          <p className="text-rita-muted/25 text-xs">L11 Huỳnh Thúc Kháng - Rạch Giá, Kiên Giang</p>
        </div>
      </div>
    </footer>
  )
}