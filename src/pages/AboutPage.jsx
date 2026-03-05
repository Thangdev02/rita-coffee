import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowRight, FiMapPin, FiClock, FiInstagram, FiFacebook } from 'react-icons/fi'
import { SiTiktok } from "react-icons/si";
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
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/566244722_122136245912940477_251351123306886708_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=LAgBmG8Wqp8Q7kNvwEvzQNg&_nc_oc=AdlZ3E17iaxFFhAY-TDRNIZmbCvfHJUCoiDPk0iZh3yWS7-xGmONX5dAkZu74X73T5rBaDZjCeRH6L6-UsrFEEfb&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=298gQ5H4dKsZyi3yqLx_yg&_nc_ss=8&oh=00_AfxIw0_In2LvVUgIfWY_K7vwXze30wInUSrVFmVijdaJCg&oe=69AB47B9',
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/566218817_122136245924940477_5932915205030654329_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=2N8MzpDQGIQQ7kNvwGK1x6r&_nc_oc=AdlTcZ9K6I68LtDjA39k4Tm1-I0s0v7txXD70Z44JkGEZyCV6KNNGn4z5vGq3N6x-NiSTd-pPvASg4ySUAjcxjDd&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=eyVKmotA7QmN7Jabqotg3w&_nc_ss=8&oh=00_AfxBlJsnVRUYiaF9xdOQ-6E09lc-eepAOCt2XsIYFkXykQ&oe=69AB565A',
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/561635965_122135392310940477_5042190149285523966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=1wlG-PWBsxsQ7kNvwECKcE-&_nc_oc=AdmH38x6UaJk-EypE_UWWw9Rkbiv2PgiXafBb9K8XKIeuWvYzEvdn_Pka4MfVl5lGqMsfdiUWhCy2e9wnwPSCpTW&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=c57nJcTK8upHwpRh34a7_g&_nc_ss=8&oh=00_AfwS8L2pPi1FYlrgscIcjKmiJ-30A9KtOjDW5nZ3wiLvwg&oe=69AB6EBD',
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/565654697_122135392280940477_7665161169909051769_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=0XLCM_LwCjkQ7kNvwHnCnm8&_nc_oc=Admq2uf6jKZqz_mlmITcX53CjI5JHVJy-FRhIuuImoDtWOgy2CDydmcEJ1yjnQA3Rt-9kO2ie4dHG3Epl7n0kFtZ&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=TgNQJgHzqabxGXDqrVOpDA&_nc_ss=8&oh=00_AfwS2N_ZOdhZSuo_VTpUCmYsSe_urAP3wubOYxbiBjcq2w&oe=69AB5ACF',
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/561870846_122135392268940477_2652091734855104126_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=4pIkGSFWH_UQ7kNvwFGvIpk&_nc_oc=Adm9Sp3VRfg9-soKKGTc4At0xsk1IbdDgsZTwBjyVK1oP0XUm9LrK1lE65u3V9CNG0niMxZKkhbIjr7Vtfap0zXT&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=D26NUGSdc2TBwRkaKyWzYg&_nc_ss=8&oh=00_AfwLHUqRRznBq8zvs0gaV-jBJKviEjZzGgTeJau1eHOqXQ&oe=69AB68F7',
  'https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/561386026_122135004644940477_7353898514917993327_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=2a1932&_nc_ohc=EqRIs0JNfhwQ7kNvwFnPvIw&_nc_oc=AdlG4KBGzdnlbx6N_5MP9GNmkNLR3gp2q4LFldb48pMGMvW6TOUBJdF8qY2V7NL0xEOJUuCAgaT35u7SdNI27ccQ&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=pXVVLtpyYgMP_456S5WesA&_nc_ss=8&oh=00_Afy2fw9hryhO4FCZnEXT6SqQnWZQgqAZ6gtrvmtry4TEOQ&oe=69AB4E1A',
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
          <img src="https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/571038976_122137331312940477_2951143956497828272_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=rsaY9TRkvhsQ7kNvwHd42wX&_nc_oc=AdkVyHjk7wuoKo40l0bzSdjoXj1a5RC2IZxOVsL1KGLQiiIbjmW9te0OwsfvStDjAvbpSYN2sf-EZAIAJjCSLRtk&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=JHk6CDm4vxluWB16Mi_Vrw&_nc_ss=8&oh=00_AfyLuJfhJlEzfWcazNzqPar_3DeHpWYkoUz778eqPBLV-g&oe=69AB7160"
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
            <div className="relative h-[560px]">
              <div className="absolute inset-0 opacity-[0.06] rounded-full blur-[80px]"
                style={{ background: '#e8577a', width: '70%', height: '70%', left: '15%', top: '15%' }} />
              <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(58,54,51,0.8)' }}>
                <img src="https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/565785083_122136245936940477_658192295298575670_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=9Xk0Kiui6u0Q7kNvwEwCziH&_nc_oc=AdlEflvKlDsVPnS2SgeCC8PT3oxuKD_KjH_PEyFhkE_PVCnHMeGiZ2wMaxuhoSoS8eookVtEmEEBMXe8G_xR63m9&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=mIxdb0vmJJKCx9olhq3Vvw&_nc_ss=8&oh=00_AfynuiEMX_2u67BO7Uy0coviwcjSdZxSYsCbFaTHFNrsOw&oe=69AB5284"
                  alt="Cafe interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden"
                style={{ border: '1px solid rgba(232,87,122,0.3)' }}>
                <img src="https://scontent.fvkg1-1.fna.fbcdn.net/v/t39.30808-6/573282457_122137331264940477_7514977026506169285_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6QsAflJkIa8Q7kNvwHl_bUH&_nc_oc=Adll1nqXoR4kc8k7w6QsM8TZOYiwbpdsP0Wmso_3qoDVvk-P4N9lQ6UN1gcn001EpObdIfoM7RpWL3UwBFZReKq4&_nc_zt=23&_nc_ht=scontent.fvkg1-1.fna&_nc_gid=A0HSs11-wwygWa9Vu3H9wg&_nc_ss=8&oh=00_AfyzE5RrSAQXP5x465Wx-zY6BUPoVtiP2fQt-i-kDUXFiA&oe=69AB60EF"
                  alt="Coffee" className="w-full h-full object-cover" />
              </div>
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
                 <strong className="text-rita-cream"> RITA Cafe & Bistro</strong>  không chỉ là một quán cà phê — đó là không gian sống, là nơi người Rạch Giá có thể đến để tìm thấy bình yên giữa nhịp sống hối hả.
                </p>
                <p>
                  Chúng tôi tin rằng một tách cà phê ngon không chỉ đến từ hạt cà phê tốt, mà còn từ tâm huyết của người pha chế, từ không gian ấm áp và từ nụ cười của những người phục vụ.
                </p>
              
              </div>

              <div className="grid grid-cols-2 gap-4 mt-10">
                {[
                  { num: '25+', label: 'Thức uống' },
                  { num: '1000+', label: 'Khách/tháng' },
                  { num: '4.9★', label: 'Google Rating' },
                  { num: '2025', label: 'Thành lập' },
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

    

      {/* ── PHOTO GALLERY ── */}
    <section className="py-24 px-6 bg-[#1f1b19]">
  <div className="max-w-7xl mx-auto">
    <ScrollReveal>
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-rita-pink">
          Không Gian
        </span>
        <h2 className="font-heading text-5xl text-rita-cream mt-4">
          Một Thoáng RITA
        </h2>
      </div>
    </ScrollReveal>

    {/* Masonry layout */}
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      {gallery.map((img, i) => (
        <ScrollReveal key={i} delay={i * 0.07} direction="scale">
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative overflow-hidden rounded-3xl group 
                       border border-[#3a3633] 
                       hover:border-rita-pink/40
                       transition-all duration-500 break-inside-avoid"
          >
            <img
              src={img}
              alt={`Rita ${i + 1}`}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-tr 
                            from-rita-pink/20 to-transparent 
                            opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500" />
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
                      { icon: FiClock, text: '07:30 AM — 20:30 PM (Mỗi ngày)' },
                      { icon: FiFacebook, text: 'fb.com/ritacaferachgia' },
                      { icon: SiTiktok, text: '@ritacafe.rachgia' },
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
      <div className="relative h-[400px] md:h-[440px] overflow-hidden p-0"
   >

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.91316635733!2d105.07858871094975!3d10.024024272578824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0b3002319607f%3A0xd89865f1f3e9eb14!2sRita%20Cafe%20%26%20Bistro!5e0!3m2!1svi!2s!4v1772550170417!5m2!1svi!2s"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className=""
  ></iframe>

  {/* Overlay gradient nhẹ cho đúng vibe */}
  <div className="absolute inset-0 pointer-events-none"
       style={{
         background:
           "linear-gradient(135deg, rgba(14,13,13,0.5), transparent 60%)"
       }}
  />
</div>
    </div>
  )
}