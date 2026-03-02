import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getCategories, getMenuItems } from '../services/api'
import MenuCard from '../components/MenuCard'
import ScrollReveal from '../components/ScrollReveal'
import { FiArrowRight } from 'react-icons/fi'

export default function MenuPage() {
  const [categories, setCategories] = useState([])
  const [allItems, setAllItems] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {})
    getMenuItems().then(r => setAllItems(r.data)).catch(() => {})
    window.scrollTo(0, 0)
  }, [])

  const filtered = activeFilter === 'all' ? allItems : allItems.filter(i => i.categorySlug === activeFilter)

  return (
    <div className="bg-rita-black min-h-screen">
      {/* Hero */}
      <div className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80"
            alt="Menu" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #0e0d0d)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs tracking-[0.35em] uppercase text-rita-pink">RITA Cafe & Bistro</span>
            <h1 className="font-heading mt-4 leading-none" style={{
              fontSize: 'clamp(72px, 15vw, 140px)',
              background: 'linear-gradient(135deg, #e8577a, #f07898, #e8577a)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              MENU
            </h1>
            <p className="text-rita-muted mt-6 max-w-md mx-auto text-sm">
              Khám phá thế giới hương vị phong phú — từ espresso đậm đà đến matcha Nhật Bản tinh tế
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Category cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.06}>
              <Link to={`/menu/${cat.slug}`} className="group block cursor-hover">
                <motion.div
                  className="rounded-2xl p-6"
                  style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
                  whileHover={{ y: -6, borderColor: 'rgba(232,87,122,0.4)', boxShadow: '0 20px 50px rgba(232,87,122,0.08)' }}
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-heading text-xl text-rita-cream group-hover:text-rita-pink transition-colors">{cat.name}</h3>
                  <p className="text-rita-muted text-xs mt-2 line-clamp-2">{cat.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-rita-pink/40 group-hover:text-rita-pink text-xs transition-colors">
                    Trang riêng <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div> */}

        {/* Filter section */}
        <ScrollReveal>
          <h2 className="font-heading text-4xl text-rita-cream mb-8 text-center">
            Tất Cả{' '}
            <span style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Thức Uống
            </span>
          </h2>
        </ScrollReveal>

        <motion.div className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <FilterBtn active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>Tất Cả</FilterBtn>
          {categories.filter(c => c.slug !== 'dino-kids' && c.slug !== 'an-sang').map(cat => (
            <FilterBtn key={cat.slug} active={activeFilter === cat.slug} onClick={() => setActiveFilter(cat.slug)}>
              {cat.icon} {cat.name}
            </FilterBtn>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, i) => <MenuCard key={item.id} item={item} index={i} />)}
        </div>
      </div>
    </div>
  )
}

function FilterBtn({ active, onClick, children }) {
  return (
    <motion.button onClick={onClick}
      className="px-5 py-2 rounded-full text-sm tracking-wide transition-all duration-300"
      style={active
        ? { background: 'linear-gradient(135deg, #e8577a, #c43d5e)', color: 'white', border: '1px solid transparent' }
        : { background: 'transparent', color: '#8a8078', border: '1px solid rgba(58,54,51,0.8)' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}