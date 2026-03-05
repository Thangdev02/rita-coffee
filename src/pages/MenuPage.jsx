import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getCategories, getMenuItems } from '../services/api'
import MenuCard from '../components/MenuCard'
import ScrollReveal from '../components/ScrollReveal'

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
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/573282457_122137331264940477_7514977026506169285_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=6QsAflJkIa8Q7kNvwHm55GP&_nc_oc=AdlJ95jhbWY6J6Jy_1kY5QLLj-5cR2Mjod_c4_6iraNYP7jWgB2Pfy0q7iJu9OfBfW0&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=JaJZEYfF_zALn0r-iLzoZA&_nc_ss=8&oh=00_Afw0bWE3iryVkZCAM6nBABH052pU-hJkUoE1SrTpVf5SMg&oe=69ADCBAF"
            alt="Menu" className="w-full h-full object-cover " />
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
            <p className="text-white mt-6 max-w-md mx-auto text-md">
              Khám phá thế giới hương vị phong phú — Tham khảo menu để chọn món yêu thích của bạn khi đến RITA nhé!
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
             {cat.name}
            </FilterBtn>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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