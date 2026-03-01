import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { getCategoryBySlug, getMenuItemsByCategory } from '../services/api'
import MenuCard from '../components/MenuCard'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowLeft } from 'react-icons/fi'

export default function CategoryPage() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const bannerY = useTransform(scrollYProgress, [0, 0.3], ['0%', '30%'])

  useEffect(() => {
    setLoading(true); window.scrollTo(0, 0)
    Promise.all([getCategoryBySlug(slug), getMenuItemsByCategory(slug)])
      .then(([catRes, itemsRes]) => {
        setCategory(catRes.data[0] || null)
        setItems(itemsRes.data)
        setLoading(false)
      }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return <LoadingScreen />
  if (!category) return <NotFound />

  const isDino = slug === 'dino-kids'

  return (
    <div className="bg-rita-black min-h-screen">
      {/* Banner */}
      <div className="relative h-[68vh] overflow-hidden flex items-end">
        <motion.div className="absolute inset-0" style={{ y: bannerY }}>
          <img src={category.coverImage} alt={category.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, rgba(14,13,13,0.2), rgba(14,13,13,0.5) 60%, rgba(14,13,13,1))'
          }} />
          {/* Pink accent tint based on category */}
          <div className="absolute inset-0 opacity-20" style={{
            background: `linear-gradient(135deg, rgba(232,87,122,0.3), transparent 60%)`
          }} />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <Link to="/menu"
              className="inline-flex items-center gap-2 text-rita-muted hover:text-rita-cream text-sm mb-8 transition-colors">
              <FiArrowLeft size={14} /> Quay lại Menu
            </Link>
            <div className="text-5xl mb-4">{category.icon}</div>
            <h1 className="font-heading leading-none mb-4" style={{
              fontSize: 'clamp(56px, 11vw, 120px)',
              background: 'linear-gradient(135deg, #e8577a, #f07898)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {category.name}
            </h1>
            <p className="text-rita-muted text-lg max-w-lg">{category.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Ingredient info */}
      {category.beanInfo && (
        <div style={{ background: '#161514', borderBottom: '1px solid rgba(58,54,51,0.7)' }}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <ScrollReveal>
              <motion.div
                className="flex flex-col md:flex-row items-start md:items-center gap-6 rounded-2xl p-6"
                style={{ background: '#1e1c1b', border: '1px solid rgba(232,87,122,0.2)' }}
                whileInView={{ borderColor: 'rgba(232,87,122,0.35)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: 'rgba(232,87,122,0.12)', border: '1px solid rgba(232,87,122,0.2)' }}>
                  🌿
                </div>
                <div>
                  <h3 className="text-rita-pink text-xs tracking-[0.3em] uppercase mb-1">Nguồn Nguyên Liệu</h3>
                  <p className="text-rita-muted text-sm leading-relaxed">{category.beanInfo}</p>
                </div>
                <div className="md:ml-auto flex-shrink-0">
                  <div className="w-3 h-3 rounded-full animate-pulse bg-rita-pink" />
                </div>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Dino special */}
      {isDino && (
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🦕', title: 'Khủng Long Khổng Lồ', desc: 'Mô hình khủng long thật to, bé có thể leo trèo và chụp ảnh cực đỉnh' },
                { icon: '🎮', title: 'Trò Chơi Tương Tác', desc: 'Các trò chơi vận động an toàn, phù hợp mọi lứa tuổi từ 2-12' },
                { icon: '🎨', title: 'Góc Tô Màu Dino', desc: 'Bộ màu vẽ khủng long đặc biệt, bé tha hồ thể hiện sáng tạo' },
              ].map(({ icon, title, desc }) => (
                <motion.div key={title} className="rounded-2xl p-8"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(46,213,115,0.15)' }}
                  whileHover={{ y: -6, borderColor: 'rgba(46,213,115,0.4)' }}>
                  <div className="text-5xl mb-4">{icon}</div>
                  <h3 className="font-heading text-xl text-rita-cream mb-2">{title}</h3>
                  <p className="text-rita-muted text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center p-12 rounded-3xl"
              style={{ background: 'rgba(46,213,115,0.05)', border: '1px solid rgba(46,213,115,0.15)' }}>
              <motion.div className="text-7xl mb-4" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>🦖</motion.div>
              <h2 className="font-heading text-5xl text-green-400 mb-4">50.000đ / Bé</h2>
              <p className="text-rita-muted max-w-sm mx-auto text-sm">Phụ huynh đi cùng không mất thêm phí. Không gian an toàn, có nhân viên giám sát toàn thời gian.</p>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Menu items */}
      {items.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-6 mb-12">
                <h2 className="font-heading text-4xl text-rita-cream">
                  <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {items.length}
                  </span>{' '}Món
                </h2>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(232,87,122,0.4), transparent)' }} />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

const LoadingScreen = () => (
  <div className="min-h-screen bg-rita-black flex items-center justify-center pt-20">
    <motion.div className="font-heading text-4xl"
      style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
      RITA
    </motion.div>
  </div>
)

const NotFound = () => (
  <div className="min-h-screen bg-rita-black flex flex-col items-center justify-center pt-20 text-center px-6">
    <div className="text-6xl mb-6">☕</div>
    <h1 className="font-heading text-4xl text-rita-cream mb-4">Không tìm thấy danh mục</h1>
    <Link to="/menu" className="text-rita-pink hover:underline">← Quay lại Menu</Link>
  </div>
)