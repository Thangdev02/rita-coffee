import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowRight, FiMapPin, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi'

const timeline = [
  { year: '2023', title: 'Ý Tưởng Ra Đời', desc: 'Từ tình yêu với cà phê và mong muốn tạo ra không gian cộng đồng tại Rạch Giá.' },
  { year: '2024', title: 'Khai Trương RITA', desc: 'RITA Cafe & Bistro chính thức mở cửa, mang đến không gian hiện đại giữa lòng thành phố.' },
  { year: '2024', title: 'Khu Dino Ra Mắt', desc: 'Khu vui chơi Dino đặc biệt cho bé ra đời, biến RITA thành điểm hẹn của cả gia đình.' },
  { year: '2025', title: 'Mở Rộng Menu', desc: 'Thêm các thức uống Signature, Matcha Nhật Bản và menu ăn sáng phong phú.' },
]

const team = [
  { name: 'Rita', role: 'Founder & Head Barista', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80', quote: 'Mỗi tách cà phê là một câu chuyện' },
  { name: 'Minh', role: 'Head Chef', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', quote: 'Ẩm thực là ngôn ngữ của tình yêu' },
  { name: 'Linh', role: 'Creative Designer', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', quote: 'Không gian đẹp tạo nên kỷ niệm đẹp' },
]

const gallery = [
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
  'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80',
  'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80',
  'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
  'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="bg-rita-black min-h-screen">
      {/* ── HERO ── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden flex items-center">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920&q=80"
            alt="About Rita" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(135deg, rgba(14,13,13,0.92) 0%, rgba(14,13,13,0.6) 60%, rgba(14,13,13,0.85) 100%)'
          }} />
          <div className="absolute inset-0 opacity-15" style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(232,87,122,0.4), transparent 60%)'
          }} />
        </motion.div>

        <motion.div className="relative z-10 max-w-7xl mx-auto px-6 w-full" style={{ opacity }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <motion.span
              className="inline-block text-xs tracking-[0.35em] uppercase px-4 py-2 rounded-full mb-8 font-medium"
              style={{ background: 'rgba(232,87,122,0.12)', color: '#f07898', border: '1px solid rgba(232,87,122,0.25)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            >
              ✦ Câu Chuyện RITA ✦
            </motion.span>

            {['VỀ', 'CHÚNG', 'TÔI'].map((word, i) => (
              <motion.div key={i}
                className="block font-heading leading-none"
                style={{ fontSize: 'clamp(60px, 14vw, 150px)' }}
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {i === 0
                  ? <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{word}</span>
                  : <span className="text-rita-cream">{word}</span>
                }
              </motion.div>
            ))}

            <motion.p className="text-rita-muted text-xl mt-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              Hành trình từ một giấc mơ nhỏ đến không gian cộng đồng yêu thích tại Rạch Giá
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-rita-pink/60" />
        </motion.div>
      </div>

      {/* ── STORY ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left">
            {/* Collage of 2 photos */}
            <div className="relative h-[560px]">
              <div className="absolute inset-0 opacity-[0.06] rounded-full blur-[80px]"
                style={{ background: '#e8577a', width: '70%', height: '70%', left: '15%', top: '15%' }} />
              <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(58,54,51,0.8)' }}>
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80"
                  alt="Cafe interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(232,87,122,0.3)' }}>
                <img src="https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80"
                  alt="Coffee" className="w-full h-full object-cover" />
              </div>
              {/* Floating quote */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl p-5 text-center z-10 w-48"
                style={{ background: 'rgba(14,13,13,0.9)', border: '1px solid rgba(232,87,122,0.35)', backdropFilter: 'blur(12px)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="text-3xl mb-2">☕</div>
                <div className="font-heading text-sm text-rita-pink leading-tight">"Một tách cà phê, vạn câu chuyện"</div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Câu Chuyện</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4 mb-8 leading-tight">
                Sinh Ra Từ<br />
                <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Tình Yêu Cà Phê
                </span>
              </h2>
              <div className="space-y-5 text-rita-muted leading-relaxed">
                <p>
                  RITA Cafe & Bistro không chỉ là một quán cà phê — đó là không gian sống, là nơi người Rạch Giá có thể đến để tìm thấy bình yên giữa nhịp sống hối hả.
                </p>
                <p>
                  Chúng tôi tin rằng một tách cà phê ngon không chỉ đến từ hạt cà phê tốt, mà còn từ tâm huyết của người pha chế, từ không gian ấm áp và từ nụ cười của những người phục vụ.
                </p>
                <p>
                  Từ hạt <strong className="text-rita-cream">Arabica Đà Lạt</strong> đến bột <strong className="text-rita-cream">Matcha Uji Nhật Bản</strong> — mọi nguyên liệu đều được chọn lọc kỹ càng để đảm bảo hương vị tốt nhất cho bạn.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { num: '50+', label: 'Thức uống' },
                  { num: '1000+', label: 'Khách/tháng' },
                  { num: '5★', label: 'Google Rating' },
                  { num: '2024', label: 'Thành lập' },
                ].map(({ num, label }) => (
                  <div key={label} className="p-5 rounded-2xl text-center"
                    style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}>
                    <div className="font-heading text-3xl" style={{
                      background: 'linear-gradient(135deg, #e8577a, #f07898)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>{num}</div>
                    <div className="text-rita-muted/50 text-xs mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Hành Trình</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">Từng Bước Phát Triển</h2>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px md:left-1/2" style={{ background: 'rgba(232,87,122,0.2)' }} />

            <div className="space-y-12">
              {timeline.map(({ year, title, desc }, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                  <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} pl-20 md:pl-0`}>
                    {/* Year bubble */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center z-10"
                      style={{ background: '#e8577a', boxShadow: '0 0 20px rgba(232,87,122,0.5)' }}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>

                    <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                      <div className="text-rita-pink text-sm font-mono font-bold tracking-widest mb-2">{year}</div>
                      <div className="font-heading text-2xl text-rita-cream mb-2">{title}</div>
                      <div className="text-rita-muted text-sm leading-relaxed">{desc}</div>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Không Gian</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">Một Thoáng RITA</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.07} direction="scale">
                <motion.div
                  className="relative overflow-hidden rounded-2xl cursor-hover"
                  style={{ height: i === 0 || i === 5 ? '320px' : '220px', border: '1px solid rgba(58,54,51,0.7)' }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(232,87,122,0.4)' }}
                >
                  <img src={img} alt={`Rita ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-400"
                    style={{ background: 'linear-gradient(135deg, rgba(232,87,122,0.2), transparent)' }} />
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24 px-6" style={{ background: '#161514' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">Con Người</span>
              <h2 className="font-heading text-5xl text-rita-cream mt-4">Đội Ngũ RITA</h2>
              <p className="text-rita-muted mt-4 max-w-sm mx-auto text-sm">Những con người tâm huyết tạo nên hương vị và không gian của RITA</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map(({ name, role, img, quote }, i) => (
              <ScrollReveal key={i} delay={i * 0.12} direction="up">
                <motion.div
                  className="rounded-3xl overflow-hidden text-center cursor-hover"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
                  whileHover={{ y: -10, borderColor: 'rgba(232,87,122,0.4)', boxShadow: '0 30px 80px rgba(232,87,122,0.1)' }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img src={img} alt={name} className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #1e1c1b 0%, transparent 50%)' }} />
                  </div>
                  <div className="p-6 -mt-4 relative z-10">
                    <h3 className="font-heading text-2xl text-rita-cream">{name}</h3>
                    <p className="text-rita-pink text-xs tracking-widest uppercase mt-1 mb-4">{role}</p>
                    <p className="text-rita-muted text-sm italic">"{quote}"</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / VISIT ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden relative" style={{ border: '1px solid rgba(232,87,122,0.25)' }}>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(232,87,122,0.08), rgba(14,13,13,0.95))'
              }} />
              <div className="absolute inset-0 opacity-[0.04]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`
              }} />

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
                    {[
                      { icon: FiMapPin, text: 'Rạch Giá, Kiên Giang, Việt Nam' },
                      { icon: FiClock, text: '07:30 AM — 10:30 PM (Mỗi ngày)' },
                      { icon: FiFacebook, text: 'fb.com/ritacaferachgia' },
                      { icon: FiInstagram, text: '@ritacafe.rachgia' },
                    ].map(({ icon: Icon, text }, i) => (
                      <div key={i} className="flex items-center gap-3 text-rita-muted text-sm">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(232,87,122,0.12)', border: '1px solid rgba(232,87,122,0.2)' }}>
                          <Icon size={13} className="text-rita-pink" />
                        </div>
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <motion.div className="text-8xl mb-6"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
                    ☕
                  </motion.div>
                  <p className="text-rita-muted text-sm leading-relaxed mb-8 italic">
                    "Mỗi lần đến RITA là một kỷ niệm đáng nhớ — cùng bạn bè, gia đình hay chỉ là một mình với cuốn sách yêu thích."
                  </p>
                  <Link to="/menu"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-white"
                    style={{ background: 'linear-gradient(135deg, #e8577a, #c43d5e)' }}>
                    Khám Phá Menu <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}