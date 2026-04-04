import { useEffect, useState } from 'react'
import { getCategories, getMenuItems } from '../services/api'
import MenuCard from '../components/MenuCard'
import ScrollReveal from '../components/ScrollReveal'

export default function MenuPage() {
  const [categories, setCategories] = useState([])
  const [allItems, setAllItems] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {})
    getMenuItems().then(r => setAllItems(r.data)).catch(() => {})
    window.scrollTo(0, 0)
    // Trigger header animation
    requestAnimationFrame(() => setHeaderVisible(true))
  }, [])

  const filtered = activeFilter === 'all'
    ? allItems
    : allItems.filter(i => i.categorySlug === activeFilter)

  return (
    <div className="bg-rita-black min-h-screen">
      {/* Hero */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent, #0e0d0d)' }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}>
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
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Filter section */}
        <ScrollReveal>
          <h2 className="font-heading text-4xl text-rita-cream mb-8 text-center">
            Tất Cả{' '}
            <span style={{
              background: 'linear-gradient(135deg, #e8577a, #f07898)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Thức Uống
            </span>
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap gap-3 justify-center mb-10"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
          }}>
          <FilterBtn active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
            Tất Cả
          </FilterBtn>
          {categories
            .filter(c => c.slug !== 'dino-kids' && c.slug !== 'an-sang')
            .map(cat => (
              <FilterBtn key={cat.slug} active={activeFilter === cat.slug}
                onClick={() => setActiveFilter(cat.slug)}>
                {cat.name}
              </FilterBtn>
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <MenuCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FilterBtn({ active, onClick, children }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-5 py-2 rounded-full text-sm tracking-wide"
      style={{
        background: active
          ? 'linear-gradient(135deg, #e8577a, #c43d5e)'
          : 'transparent',
        color: active ? 'white' : '#8a8078',
        border: active ? '1px solid transparent' : '1px solid rgba(58,54,51,0.8)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.15s, background 0.2s, color 0.2s',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}