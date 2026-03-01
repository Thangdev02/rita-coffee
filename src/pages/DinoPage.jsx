import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { useRef } from 'react'

const dinos = [
  { emoji: '🦕', name: 'Brachiosaurus', fact: 'Khủng long cổ dài nhất, con bé sẽ thích leo trèo!' },
  { emoji: '🦖', name: 'T-Rex', fact: 'Vua của các loài khủng long, mô hình khổng lồ' },
  { emoji: '🦴', name: 'Triceratops', fact: 'Khủng long 3 sừng dễ thương, an toàn cho trẻ em' },
  { emoji: '🥚', name: 'Trứng Khủng Long', fact: 'Khu vực ươm trứng Dino - thú vị và giáo dục' },
]

const activities = [
  { icon: '🎪', title: 'Khu Leo Trèo', desc: 'Cấu trúc leo trèo hình khủng long an toàn, phù hợp 2-10 tuổi' },
  { icon: '🎨', title: 'Tô Màu Dino', desc: 'Bộ màu vẽ khủng long, bé mang tranh về nhà' },
  { icon: '📸', title: 'Góc Chụp Ảnh', desc: 'Backdrop Dino độc đáo, check-in siêu đẹp' },
  { icon: '🎮', title: 'Trò Chơi Vận Động', desc: 'Các trò chơi thú vị, phát triển kỹ năng vận động' },
  { icon: '📚', title: 'Góc Đọc Sách', desc: 'Sách tranh về khủng long, thế giới cổ đại' },
  { icon: '🍦', title: 'Đồ Uống Bé Yêu', desc: 'Menu đặc biệt cho trẻ em, an toàn và ngon' },
]

export default function DinoPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div className="bg-rita-black min-h-screen">
      {/* ─── HERO ─── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1920&q=80"
            alt="Dino Kids Zone"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-rita-black/50 via-transparent to-rita-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-rita-black/70 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            >
              🦕
            </motion.div>
            <motion.span
              className="inline-block px-4 py-2 rounded-full text-xs tracking-widest uppercase bg-green-500/20 text-green-400 border border-green-500/30 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              ✦ Kids Zone ✦
            </motion.span>

            {'KHU VUI CHƠI DINO'.split(' ').map((word, i) => (
              <motion.h1
                key={i}
                className="font-heading leading-none text-7xl md:text-9xl"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ color: i === 2 ? '#2ecc71' : '#f5f0e8' }}
              >
                {word}
              </motion.h1>
            ))}

            <motion.p
              className="text-rita-cream/60 text-xl mt-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Để bé khám phá thế giới khủng long kỳ diệu trong khi ba mẹ thư giãn cùng tách cà phê yêu thích
            </motion.p>

            <motion.div
              className="flex items-center gap-6 mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-center">
                <div className="font-heading text-5xl text-green-400">50K</div>
                <div className="text-rita-cream/40 text-xs tracking-wide mt-1">VNĐ / Bé</div>
              </div>
              <div className="w-px h-12 bg-rita-border" />
              <div className="text-center">
                <div className="font-heading text-5xl text-rita-cream">∞</div>
                <div className="text-rita-cream/40 text-xs tracking-wide mt-1">Giờ Vui Chơi</div>
              </div>
              <div className="w-px h-12 bg-rita-border" />
              <div className="text-center">
                <div className="font-heading text-5xl text-rita-gold">FREE</div>
                <div className="text-rita-cream/40 text-xs tracking-wide mt-1">Phụ Huynh</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ─── DINO CHARACTERS ─── */}
      <section className="py-24 px-6 bg-rita-dark">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl text-rita-cream">
                Gặp Gỡ Các <span className="text-green-400">Bạn Dino</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dinos.map(({ emoji, name, fact }, i) => (
              <ScrollReveal key={name} delay={i * 0.1} direction="scale">
                <motion.div
                  className="glass-card rounded-2xl p-6 text-center border border-green-500/10 hover:border-green-500/40 transition-all duration-300 cursor-hover"
                  whileHover={{ y: -10, rotate: [-1, 1][i % 2] }}
                >
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 + i * 0.5, ease: 'easeInOut' }}
                  >
                    {emoji}
                  </motion.div>
                  <h3 className="font-heading text-lg text-rita-cream mb-2">{name}</h3>
                  <p className="text-rita-cream/40 text-xs leading-relaxed">{fact}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACTIVITIES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-green-400">Hoạt Động</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">
                Vô Vàn <span className="text-green-400">Trò Vui</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {activities.map(({ icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.08}>
                <motion.div
                  className="glass-card rounded-2xl p-8 gold-border hover:border-green-500/40 transition-all duration-300 cursor-hover group"
                  whileHover={{ y: -6 }}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <h3 className="font-heading text-xl text-rita-cream mb-3 group-hover:text-green-400 transition-colors">{title}</h3>
                  <p className="text-rita-cream/50 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6 bg-rita-dark">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs tracking-[0.3em] uppercase text-green-400">Giá Vé</span>
            <h2 className="font-heading text-5xl text-rita-cream mt-4 mb-12">Bảng Giá Đơn Giản</h2>

            <div className="glass-card rounded-3xl p-12 border border-green-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="font-heading text-8xl text-green-400 mb-2">50.000đ</div>
                <div className="text-rita-cream/60 text-lg mb-8">Mỗi bé / lần vào chơi</div>

                <div className="flex flex-col gap-3 text-left max-w-xs mx-auto">
                  {[
                    '✅ Vào chơi không giới hạn thời gian',
                    '✅ Phụ huynh đi kèm miễn phí',
                    '✅ Nhân viên giám sát toàn thời gian',
                    '✅ Khu vực sạch sẽ, khử khuẩn hàng ngày',
                    '✅ Đồ chơi an toàn, đạt chuẩn',
                  ].map(item => (
                    <div key={item} className="text-rita-cream/70 text-sm">{item}</div>
                  ))}
                </div>

                <motion.div
                  className="mt-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-green-500 text-white font-medium tracking-wider text-sm uppercase hover:bg-green-400 transition-all duration-300 rounded-full"
                  >
                    Đến Rita Ngay 🦕
                  </Link>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
