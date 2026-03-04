import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { useRef, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

const G1 = '#4ade80'   // green-400
const G2 = '#22c55e'   // green-500
const G3 = '#16a34a'   // green-600
const CEMENT = '#3a3632'
const CEMENT2 = '#2a2825'
const DARK = '#0e0d0d'

const gallery = [
  'https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/611355150_122150712512940477_8702382630248107530_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ROjnWRpjFfkQ7kNvwFmhrOv&_nc_oc=AdnMzMl_c_pyNrAUl_PUzCOaB33Dh5ehUHeWH4ZpEl3S5epGspNMcBlAoxDG3QDT5qk&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=pivfLlYrnFulix_2P40jvQ&_nc_ss=8&oh=00_AfytZBQiaE4wnB1VofR34FwhbKf2sOd8XMKn-IQlHN61Iw&oe=69ADE176',
  'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/600286580_122147316590940477_2347732939322951912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=z6IYpQ3DQ6kQ7kNvwEORmrI&_nc_oc=AdmSRFFJrrhWuv55bxCYMOvBue5dkAlaWY1pTQNq7WP1i6KnZ-mbpm4IAfZYUAlgn7w&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=JC9nipzwbWEo7XteMxIZ_A&_nc_ss=8&oh=00_AfxM-vELAQPPob6t5CbgBaVCCrjMPoIkd_pHEzfJs9dqXw&oe=69ACD18F',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/600347320_122147316626940477_7379295689471861894_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=XHzJJ-R5YcUQ7kNvwEOhWgj&_nc_oc=Adm4-1X9rADi8KX5uJ-zIe7RJXXVr-JvoAqK2Xzn73Ps8_wWlJ_OefxrlLKVhRK1wW0&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=niKU04qzSO4c00iDzFm6xg&_nc_ss=8&oh=00_AfyAT77bwdAKlBSVmWVoeumsN_yp7qJ8tMUHFE3QqnuFQw&oe=69ACB2C7',
  'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/598180236_122147316656940477_8327222817528911497_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=VpZklCiIF7MQ7kNvwFqEeeS&_nc_oc=Admdgy7tJQo5SSb2Zttb5ctiL169zvCuN72ZjtotMZMIG3KkZ4biRSYaWsHim8g0XSI&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=IxUCM8QN4oHvRaROpPX6xw&_nc_ss=8&oh=00_AfxCBkNUktvO57oXT6Qww2Pg3CqdNQVFWtCr8K0zhiWQ8w&oe=69ACB7A5',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/600377305_122147316686940477_2127841129863101561_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dlM47stdtqYQ7kNvwHRbKQ3&_nc_oc=AdnPjDBr2ppgTmGqSINVEK3bigvGV-t6-gEv4Bvi4IYIFBbXMn7FYdzP3574mj8o7Ug&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=hFg-g1IRUHsAxh8Wpx8Svg&_nc_ss=8&oh=00_AfzsQrhQprzjn6JfwPZqcNOCti4cOaYfwhDcMaHJqUYhAg&oe=69ACB70F',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/598544531_122147316602940477_5166287859961203832_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=J20Mq_0g3TAQ7kNvwHtbeaG&_nc_oc=Adkt6B9b_pbzuEyC4QMJQhvECqjndN75hfJluQq1ffYOxTy0ckLubgvbGHGoCoMVDKM&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=q-MpKmwW8fjO573ucfYykw&_nc_ss=8&oh=00_AfwbS_Zy1axIlTU2smeO-IU6PhTh9mbpIlA_yEW9LX9pfw&oe=69ACD144',
  'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/598449403_122147316512940477_448871402315982810_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=t36MKQlxkvEQ7kNvwGGtFiv&_nc_oc=AdlxFKb-jeY75L61PvgeQNAGZqr8DgBtwT2Fy7qzhcrA5m0GP6QjFBf3ICP9WbAfzRo&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=Kj571EP4PKR_rii7dDWDYg&_nc_ss=8&oh=00_AfzpiswzpA-htHCiqx_eoB5oI0uPRyvyJEI_AAizxUMX-g&oe=69ACAB91',
  'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/601965583_122147316614940477_4827222996143504894_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=oXLuHy-mlBwQ7kNvwFs7UQ2&_nc_oc=AdkPJrc67K8ld3hwLYAg5kSmpLXGU5rhlvfYrGtRm5YF3aDpyfSf6iqWj73Vl0VVBxE&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=E3c3qFPjI4ifW2dCQn21dA&_nc_ss=8&oh=00_AfzAG04LaooEGkcDN2G-9mRNtYMF-HTUAKz7MMQkrqRz0A&oe=69ACDBC7',
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

export default function KidsZonePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const [openFaq, setOpenFaq] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  return (
    <div className="bg-rita-black text-rita-cream overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/601913430_122148367592940477_3560941255704577890_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Us-912Oy3MEQ7kNvwHCt1Yv&_nc_oc=AdkKpW5hu6vYgab6irjik3svsIDD2v1XVg0KhDi54bYLEU1P6lfff4pr8DYubgTEwcA&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=I0VMKtKqnnUIvU79im5a8Q&_nc_ss=8&oh=00_Afw_oO-sC5vTsvyAJoydUkNRxE4CVO3XCRafDOmq1jeNPA&oe=69ACBE32"
            alt="Dino Land" className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(14,13,13,0.95) 40%, rgba(14,13,13,0.7) 100%)` }} />
          {/* Green tint bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: `linear-gradient(to top, rgba(34,197,94,0.08), transparent)` }} />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {/* Badge */}
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[0.25em] uppercase mb-6 font-medium"
              style={{ background: 'rgba(74,222,128,0.1)', color: G1, border: `1px solid rgba(74,222,128,0.25)` }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span>🦕</span> Kids Zone
            </motion.span>

            <h1 className="font-heading leading-none mb-6 max-w-3xl"
              style={{ fontSize: 'clamp(56px, 10vw, 110px)' }}>
              <span className="text-rita-cream">Khu Vui Chơi </span>
              <br />
              <span style={{ color: G1 }}>Dino</span>
              <span className="text-rita-cream"> Cho Bé</span>
            </h1>

            <p className="text-rita-muted text-lg max-w-md mb-10 leading-relaxed">
              Để bé thỏa sức khám phá mỗi ngày trong lúc ba mẹ thư giãn cùng tách cà phê yêu thích
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="font-heading text-5xl" style={{ color: G1 }}>50.000đ</span>
                <span className="text-rita-muted text-sm">/ bé / lần vào</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-black transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${G1}, ${G2})`, boxShadow: `0 12px 35px rgba(74,222,128,0.25)` }}>
                Xem Bảng Giá <FiArrowRight />
              </a>
              <a href="#gallery"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:text-white"
                style={{ border: `1px solid ${CEMENT}`, color: '#8a8078', background: 'rgba(58,54,50,0.2)' }}>
                Xem Hình Ảnh
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2 }}>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, rgba(74,222,128,0.5))` }} />
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[460px]"
                style={{ border: `1px solid ${CEMENT}` }}>
                <img
                  src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/600896283_122147316668940477_5040029634650474449_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=kWmO3fyCx0sQ7kNvwGKTVFy&_nc_oc=Adkh504pmMFZUKm7kqW0m9FkEsFYMOYK1H22w6tXxK_VovStyIWbAhK0ekAlz6qFDns&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=kulQZHng5426wxfbW3wtKA&_nc_ss=8&oh=00_AfyKkodc9PgIi1rHu5624WcHKKqHl4_xBvRQmUz8Nakhmg&oe=69ACB1B7"
                  alt="Kids Area" className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,13,13,0.6), transparent 55%)' }} />
              </div>
              {/* Float badge */}
              <motion.div
                className="absolute -bottom-5 -right-4 px-5 py-4 rounded-2xl text-center"
                style={{ background: CEMENT2, border: `1px solid rgba(74,222,128,0.3)`, minWidth: '130px' }}
                animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}>
                <div className="text-3xl mb-1">🦕</div>
                <div className="font-heading text-sm" style={{ color: G1 }}>Dino Land</div>
                <div className="text-xs text-rita-muted mt-0.5">tầng 2</div>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Về Dino Land</span>
              <h2 className="font-heading mt-3 mb-6 leading-tight text-rita-cream" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
                An Toàn — Sạch Sẽ<br />
                <span style={{ color: G1 }}>& Thật Vui</span>
              </h2>
              <p className="text-rita-muted leading-relaxed mb-8 text-sm">
                Không gian được thiết kế riêng cho trẻ nhỏ với chất liệu an toàn, vệ sinh mỗi ngày. Ba mẹ ngồi quan sát thoải mái trong khi bé tha hồ khám phá.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  'Phù hợp bé từ 2 – 10 tuổi',
                  'Phụ huynh vào quan sát miễn phí',
                  'Không giới hạn thời gian chơi',
                  'Có tủ khóa giữ đồ miễn phí',
                  'Nhân viên hỗ trợ tại khu vui chơi',
                ].map((text, i) => (
                  <motion.div key={i} className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}>
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 font-bold text-black"
                      style={{ background: G1 }}>
                      ✓
                    </span>
                    <span className="text-rita-muted">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ACTIVITIES ─── */}
      <section className="py-24 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Hoạt Động</span>
              <h2 className="font-heading text-5xl md:text-6xl text-rita-cream mt-4">
                Bé Có Thể <span style={{ color: G1 }}>Làm Gì?</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {activities.map((act, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <motion.div
                  className="rounded-2xl p-6 text-center"
                  style={{ background: DARK, border: `1px solid ${CEMENT}` }}
                  whileHover={{ y: -6, borderColor: 'rgba(74,222,128,0.4)' }}
                  transition={{ duration: 0.25 }}>
                  <motion.div className="text-4xl mb-4"
                    animate={{ rotate: [0, -6, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4 + i * 0.5 }}>
                    {act.emoji}
                  </motion.div>
                  <h3 className="font-heading text-sm mb-2" style={{ color: G1 }}>{act.title}</h3>
                  <p className="text-rita-muted text-xs leading-relaxed">{act.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Hình Ảnh</span>
              <h2 className="font-heading text-5xl md:text-6xl text-rita-cream mt-4">
                Khoảnh Khắc <span style={{ color: G1 }}>Của Bé</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
            {gallery.map((src, i) => {
              const isLarge = i === 0 || i === 5
              return (
                <motion.div key={i}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer group ${isLarge ? 'md:col-span-2 md:row-span-2' : i === 2 ? 'col-span-2' : ''}`}
                  style={{ border: `1px solid ${CEMENT}` }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ borderColor: 'rgba(74,222,128,0.45)' }}
                  onClick={() => setLightbox(src)}>
                  <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.15)', backdropFilter: 'blur(2px)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-xl"
                      style={{ background: G1 }}>
                      ⤢
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── VIDEO ─── */}
      <section className="py-16 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="font-heading text-4xl md:text-5xl text-rita-cream mb-10 text-center">
              Xem Bé Vui Chơi 🎬
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden"
              style={{ border: `1px solid ${CEMENT}`, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${G2}, transparent)` }} />
              <video src="/dinovideo.mp4" controls className="w-full object-cover" style={{ height: '70vh' }} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="relative py-32 px-6 overflow-hidden">
        {/* subtle green glow bg */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.06]"
            style={{ background: G2 }} />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Vé Vào Cổng</span>
              <h2 className="font-heading text-5xl md:text-7xl text-rita-cream mt-4">Bảng Giá</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {/* Pricing card */}
            <motion.div
              className="relative rounded-3xl overflow-hidden mx-auto"
              style={{
                maxWidth: '460px',
                background: CEMENT2,
                border: `1.5px solid rgba(74,222,128,0.35)`,
                boxShadow: `0 0 60px rgba(34,197,94,0.08), 0 32px 80px rgba(0,0,0,0.6)`,
              }}
              whileHover={{ boxShadow: `0 0 80px rgba(34,197,94,0.14), 0 40px 100px rgba(0,0,0,0.7)` }}
              transition={{ duration: 0.4 }}>

              {/* Green top bar */}
              <div className="h-1" style={{ background: `linear-gradient(to right, transparent, ${G1}, ${G2}, ${G1}, transparent)` }} />

              {/* Dino */}
              <div className="pt-10 pb-2 text-center">
                <motion.div className="text-6xl"
                  animate={{ y: [0, -8, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5 }}>
                  🦕
                </motion.div>
              </div>

              <div className="px-10 pb-10 text-center">
                <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(74,222,128,0.45)' }}>
                  Mỗi bé / lần vào
                </div>

                {/* Price */}
                <div className="font-heading mb-1" style={{ fontSize: 'clamp(72px, 16vw, 96px)', lineHeight: 1, color: G1 }}>
                  50K
                </div>
                <div className="text-rita-muted text-sm mb-8">= 50.000 VNĐ</div>

                {/* Divider */}
                <div className="w-full h-px mb-8" style={{ background: `linear-gradient(to right, transparent, ${CEMENT}, transparent)` }} />

                {/* Includes */}
                <div className="space-y-3 mb-10 text-left">
                  {[
                    ['🦕', 'Vào Dino Land không giới hạn thời gian'],
                    ['👨‍👩‍👧', 'Ba mẹ vào quan sát miễn phí'],
                    ['🔐', 'Tủ khóa đồ miễn phí'],
                    ['🛡', 'Nhân viên hỗ trợ & đảm bảo an toàn'],
                  ].map(([icon, text], i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-rita-muted">
                      <span className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-base"
                        style={{ background: 'rgba(74,222,128,0.08)', border: `1px solid rgba(74,222,128,0.15)` }}>
                        {icon}
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <Link to="/"
                  className="block w-full py-4 rounded-full text-black font-semibold text-sm uppercase tracking-wider text-center transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, ${G1}, ${G2})`, boxShadow: `0 8px 30px rgba(74,222,128,0.25)` }}>
                  🎟 Đến Rita Ngay
                </Link>

                <p className="text-xs mt-5" style={{ color: 'rgba(138,128,120,0.4)' }}>
                  * Trẻ dưới 2 tuổi miễn phí · Giờ mở cửa 07:30 – 22:30
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6" style={{ background: CEMENT2 }}>
        <div className="max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Giải Đáp</span>
              <h2 className="font-heading text-4xl md:text-5xl text-rita-cream mt-4">Câu Hỏi Thường Gặp</h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ background: DARK, border: `1px solid ${openFaq === i ? 'rgba(74,222,128,0.35)' : CEMENT}` }}>
                  <button
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span className="font-medium text-rita-cream text-sm pr-4">{faq.q}</span>
                    <motion.span
                      className="text-xl font-light flex-shrink-0"
                      style={{ color: G1 }}
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.2 }}>
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}>
                        <div className="px-6 pb-5 pt-1 text-sm text-rita-muted leading-relaxed"
                          style={{ borderTop: `1px solid ${CEMENT}` }}>
                          <div className="pt-3">{faq.a}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/602905158_122147648816940477_6571202529164626722_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=CTjx3He6h7IQ7kNvwEsceKc&_nc_oc=AdnEF0MqeqWibW0Z9z1PdQFzfVMAlkI8eEenUIEv4C9G84jcOCHyj0_PRIZN-Mw8BYcCApJcMEQ2pezs1Uxvqgi0&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=9zqAE9FvZXd55pw1w9gtbQ&_nc_ss=8&oh=00_Afzc0JfEYl6k3utfHswEAAF8AqcMxZvktAvt9mYS2bvfuA&oe=69AB5246"
            alt="Dino" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(14,13,13,0.95) 40%, rgba(14,13,13,0.75) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-lg">
              <motion.div className="text-7xl mb-6"
                animate={{ rotate: [0, -5, 5, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}>
                🦕
              </motion.div>
              <span className="text-xs tracking-[0.3em] uppercase" style={{ color: G1 }}>Dino Land</span>
              <h2 className="font-heading text-6xl text-rita-cream mt-4 mb-6">
                Hẹn Gặp Bé<br /><span style={{ color: G1 }}>Tại RITA!</span>
              </h2>
              <p className="text-rita-muted leading-relaxed mb-10 max-w-sm">
                Mang bé đến RITA — nơi cà phê ngon cho ba mẹ, và cả một thế giới khám phá cho bé 🌿
              </p>
              <Link to="/"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium tracking-wider text-sm uppercase text-black transition-all duration-300 hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${G1}, ${G2})`, boxShadow: `0 12px 35px rgba(74,222,128,0.25)` }}>
                Về Trang Chủ <FiArrowRight />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
            style={{ background: 'rgba(4,3,3,0.96)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}>
            <motion.img src={lightbox} alt=""
              className="max-w-full max-h-full object-contain rounded-2xl"
              style={{ maxWidth: '90vw', maxHeight: '90vh', boxShadow: '0 40px 100px rgba(0,0,0,0.8)', border: `1px solid ${CEMENT}` }}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              onClick={e => e.stopPropagation()} />
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: CEMENT2, border: `1px solid ${CEMENT}` }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={() => setLightbox(null)}>
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}