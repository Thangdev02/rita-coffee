import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { useRef } from 'react'

const gallery = [
  'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/603081332_122147316500940477_498546531751696554_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=R4msAKrDeDoQ7kNvwF7foku&_nc_oc=Adkg8qeMNjZvfMI5kTsLe-OeczCbT9L2gJA8-BOUAofdx6WYT4KEvmkmx7q3YKSOoUs&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=dtoX-FUQHNc_Zkp4IEuPBg&_nc_ss=8&oh=00_AfyYSnKOa1DArHKj5ueqxuuZsKTZUScwFPU1WVlXMftT_g&oe=69ACB831',
  'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/600286580_122147316590940477_2347732939322951912_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=z6IYpQ3DQ6kQ7kNvwEORmrI&_nc_oc=AdmSRFFJrrhWuv55bxCYMOvBue5dkAlaWY1pTQNq7WP1i6KnZ-mbpm4IAfZYUAlgn7w&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=JC9nipzwbWEo7XteMxIZ_A&_nc_ss=8&oh=00_AfxM-vELAQPPob6t5CbgBaVCCrjMPoIkd_pHEzfJs9dqXw&oe=69ACD18F',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/600347320_122147316626940477_7379295689471861894_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=XHzJJ-R5YcUQ7kNvwEOhWgj&_nc_oc=Adm4-1X9rADi8KX5uJ-zIe7RJXXVr-JvoAqK2Xzn73Ps8_wWlJ_OefxrlLKVhRK1wW0&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=niKU04qzSO4c00iDzFm6xg&_nc_ss=8&oh=00_AfyAT77bwdAKlBSVmWVoeumsN_yp7qJ8tMUHFE3QqnuFQw&oe=69ACB2C7',
  'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/598180236_122147316656940477_8327222817528911497_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=VpZklCiIF7MQ7kNvwFqEeeS&_nc_oc=Admdgy7tJQo5SSb2Zttb5ctiL169zvCuN72ZjtotMZMIG3KkZ4biRSYaWsHim8g0XSI&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=IxUCM8QN4oHvRaROpPX6xw&_nc_ss=8&oh=00_AfxCBkNUktvO57oXT6Qww2Pg3CqdNQVFWtCr8K0zhiWQ8w&oe=69ACB7A5',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/600377305_122147316686940477_2127841129863101561_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=dlM47stdtqYQ7kNvwHRbKQ3&_nc_oc=AdnPjDBr2ppgTmGqSINVEK3bigvGV-t6-gEv4Bvi4IYIFBbXMn7FYdzP3574mj8o7Ug&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=hFg-g1IRUHsAxh8Wpx8Svg&_nc_ss=8&oh=00_AfzsQrhQprzjn6JfwPZqcNOCti4cOaYfwhDcMaHJqUYhAg&oe=69ACB70F',
  'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/598544531_122147316602940477_5166287859961203832_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=J20Mq_0g3TAQ7kNvwHtbeaG&_nc_oc=Adkt6B9b_pbzuEyC4QMJQhvECqjndN75hfJluQq1ffYOxTy0ckLubgvbGHGoCoMVDKM&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=q-MpKmwW8fjO573ucfYykw&_nc_ss=8&oh=00_AfwbS_Zy1axIlTU2smeO-IU6PhTh9mbpIlA_yEW9LX9pfw&oe=69ACD144',
  'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/598449403_122147316512940477_448871402315982810_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=t36MKQlxkvEQ7kNvwGGtFiv&_nc_oc=AdlxFKb-jeY75L61PvgeQNAGZqr8DgBtwT2Fy7qzhcrA5m0GP6QjFBf3ICP9WbAfzRo&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=Kj571EP4PKR_rii7dDWDYg&_nc_ss=8&oh=00_AfzpiswzpA-htHCiqx_eoB5oI0uPRyvyJEI_AAizxUMX-g&oe=69ACAB91',
  'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/601965583_122147316614940477_4827222996143504894_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=oXLuHy-mlBwQ7kNvwFs7UQ2&_nc_oc=AdkPJrc67K8ld3hwLYAg5kSmpLXGU5rhlvfYrGtRm5YF3aDpyfSf6iqWj73Vl0VVBxE&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=E3c3qFPjI4ifW2dCQn21dA&_nc_ss=8&oh=00_AfzAG04LaooEGkcDN2G-9mRNtYMF-HTUAKz7MMQkrqRz0A&oe=69ACDBC7',
]

const activities = [
  { title: 'Khu Vận Động', desc: 'Không gian leo trèo, vận động an toàn cho trẻ nhỏ' },
  { title: 'Góc Sáng Tạo', desc: 'Tô màu, vẽ tranh và các hoạt động thủ công' },
  { title: 'Khu Đọc Sách', desc: 'Sách tranh thiếu nhi, truyện cổ tích' },
  { title: 'Góc Check-in', desc: 'Không gian chụp ảnh xinh xắn cho bé' },
]

export default function KidsZonePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div className="bg-rita-black text-rita-cream">

      {/* ───────── HERO ───────── */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: bgY }}>
          <img
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/601913430_122148367592940477_3560941255704577890_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Us-912Oy3MEQ7kNvwHCt1Yv&_nc_oc=AdkKpW5hu6vYgab6irjik3svsIDD2v1XVg0KhDi54bYLEU1P6lfff4pr8DYubgTEwcA&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=I0VMKtKqnnUIvU79im5a8Q&_nc_ss=8&oh=00_Afw_oO-sC5vTsvyAJoydUkNRxE4CVO3XCRafDOmq1jeNPA&oe=69ACBE32"
            alt="Kids Play Area"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h1
            className="font-heading text-6xl md:text-7xl leading-tight max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Không Gian Vui Chơi
            <br />
            <span className="text-rita-gold">Dành Cho Bé</span>
          </motion.h1>

          <motion.p
            className="text-rita-cream/70 text-lg mt-6 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Một góc nhỏ trong Rita nơi bé có thể vui chơi an toàn,
            trong khi ba mẹ thư giãn cùng cà phê.
          </motion.p>
        </div>
      </section>

      {/* ───────── ABOUT SECTION ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <ScrollReveal>
            <img
              src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/600896283_122147316668940477_5040029634650474449_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=7b2446&_nc_ohc=kWmO3fyCx0sQ7kNvwGKTVFy&_nc_oc=Adkh504pmMFZUKm7kqW0m9FkEsFYMOYK1H22w6tXxK_VovStyIWbAhK0ekAlz6qFDns&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=kulQZHng5426wxfbW3wtKA&_nc_ss=8&oh=00_AfyKkodc9PgIi1rHu5624WcHKKqHl4_xBvRQmUz8Nakhmg&oe=69ACB1B7"
              alt="Kids Area"
              className="rounded-3xl object-cover w-full h-[450px]"
            />
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h2 className="font-heading text-4xl mb-6">
                An Toàn – Sạch Sẽ – Thân Thiện
              </h2>
              <p className="text-rita-cream/60 leading-relaxed mb-6">
                Không gian được thiết kế riêng cho trẻ nhỏ với chất liệu an toàn,
                được vệ sinh mỗi ngày và có nhân viên hỗ trợ.
              </p>

              <div className="space-y-3 text-sm text-rita-cream/70">
                <div>✓ Phù hợp cho bé 2 – 10 tuổi</div>
                <div>✓ Phụ huynh có thể ngồi quan sát</div>
                <div>✓ Không giới hạn thời gian chơi</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── GALLERY ───────── */}
      <section className="py-24 px-6 bg-rita-dark">
        <div className="max-w-7xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl">
                Khoảnh Khắc Tại <span className="text-rita-gold">Rita</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Layout gallery khác grid thường */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">

            {gallery.map((img, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 || i === 5 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ───────── VIDEO SECTION ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">

          <ScrollReveal>
            <h2 className="font-heading text-5xl mb-12">
              Xem Bé Vui Chơi
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-3xl overflow-hidden border border-rita-border">
              <video
                src="/videos/kids-play.mp4"
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───────── ACTIVITIES ───────── */}
      <section className="py-24 px-6 bg-rita-dark">
        <div className="max-w-6xl mx-auto">

          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-5xl">
                Hoạt Động Dành Cho Bé
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((item, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-3xl p-8 border border-rita-border hover:border-rita-gold/40 transition"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                <p className="text-rita-cream/60 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── PRICING ───────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <ScrollReveal>
            <h2 className="font-heading text-5xl mb-10">
              Vé Vào Cổng
            </h2>

            <div className="glass-card rounded-3xl p-12 border border-rita-gold/30">
              <div className="font-heading text-7xl text-rita-gold mb-4">
                50.000đ
              </div>
              <p className="text-rita-cream/60 mb-8">
                Không giới hạn thời gian – Phụ huynh miễn phí
              </p>

              <Link
                to="/"
                className="inline-block px-10 py-4 bg-rita-gold text-black rounded-full uppercase text-sm tracking-wider"
              >
                Đến Rita Ngay
              </Link>
            </div>

          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}