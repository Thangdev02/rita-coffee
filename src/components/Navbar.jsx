import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiArrowRight } from 'react-icons/fi'
import { getCategories } from '../services/api'

const mainLinks = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Khu Dino 🦕', href: '/dino' },
  { label: 'Về RITA', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuHovered, setMenuHovered] = useState(false)
  const [categories, setCategories] = useState([])
  const location = useLocation()
  const dropdownRef = useRef(null)
  const triggerRef = useRef(null)
  const hideTimer = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setMenuHovered(false)
  }, [location])

  useEffect(() => {
    getCategories().then(r => setCategories(r.data)).catch(() => {})
  }, [])

  const showDropdown = () => {
    clearTimeout(hideTimer.current)
    setMenuHovered(true)
  }

  const hideDropdown = () => {
    hideTimer.current = setTimeout(() => setMenuHovered(false), 120)
  }

  const allLinks = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Menu', href: '/menu', hasDropdown: true },
    { label: 'Khu Dino 🦕', href: '/dino' },
    { label: 'Về RITA', href: '/about' },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(14,13,13,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(58,54,51,0.7)' : 'none',
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col leading-none">
              <span className="font-heading text-2xl md:text-3xl tracking-widest" style={{
                background: 'linear-gradient(135deg, #e8577a, #f07898)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                RITA
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgba(232,87,122,0.5)' }}>
                Cafe & Bistro
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {allLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.href}
                  ref={triggerRef}
                  className="relative"
                  onMouseEnter={showDropdown}
                  onMouseLeave={hideDropdown}
                >
                  <Link
                    to={link.href}
                    className="relative flex items-center gap-1 text-sm tracking-widest uppercase transition-colors duration-300 group"
                    style={{ color: menuHovered ? '#e8577a' : 'rgba(212,205,197,0.6)' }}
                  >
                    {link.label}
                    {/* tiny chevron */}
                    <motion.svg
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      animate={{ rotate: menuHovered ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.svg>
                    <span
                      className="absolute -bottom-1 left-0 h-px bg-rita-pink transition-all duration-300"
                      style={{ width: menuHovered ? '100%' : '0%' }}
                    />
                  </Link>

                  {/* ── DROPDOWN ── */}
                  <AnimatePresence>
                    {menuHovered && (
                      <motion.div
                        ref={dropdownRef}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                      >
                        <div
                          className="rounded-2xl overflow-hidden"
                          style={{
                            background: 'rgba(18,17,16,0.98)',
                            border: '1px solid rgba(58,54,51,0.9)',
                            backdropFilter: 'blur(24px)',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,87,122,0.06)',
                            minWidth: '640px',
                          }}
                        >
                          {/* Header */}
                          <div className="px-6 py-4 flex items-center justify-between"
                            style={{ borderBottom: '1px solid rgba(58,54,51,0.7)' }}>
                            <span className="text-xs tracking-[0.35em] uppercase font-medium"
                              style={{ color: 'rgba(232,87,122,0.7)' }}>
                              Danh Mục
                            </span>
                            <Link to="/menu"
                              className="text-xs tracking-widest uppercase flex items-center gap-1 transition-colors"
                              style={{ color: 'rgba(212,205,197,0.4)' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#e8577a'}
                              onMouseLeave={e => e.currentTarget.style.color = 'rgba(212,205,197,0.4)'}
                            >
                              Xem Tất Cả <FiArrowRight size={11} />
                            </Link>
                          </div>

                          {/* Grid */}
                          <div className="grid grid-cols-3 gap-px p-px" style={{ background: 'rgba(58,54,51,0.4)' }}>
                            {categories.map((cat, i) => (
                              <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.2 }}
                              >
                                <Link
                                  to={`/menu/${cat.slug}`}
                                  className="group flex items-center gap-3 px-5 py-4 transition-all duration-200"
                                  style={{ background: 'rgba(18,17,16,0.98)' }}
                                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(232,87,122,0.07)'}
                                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(18,17,16,0.98)'}
                                >
                                  <span className="text-2xl flex-shrink-0">{cat.icon}</span>
                                  <div className="min-w-0">
                                    <div
                                      className="text-sm font-medium transition-colors duration-200 truncate"
                                      style={{ color: '#f0ebe3', fontFamily: '"DM Serif Display", serif' }}
                                    >
                                      {cat.name}
                                    </div>
                                    <div className="text-xs mt-0.5 truncate" style={{ color: 'rgba(138,128,120,0.8)' }}>
                                      {cat.description.slice(0, 36)}{cat.description.length > 36 ? '…' : ''}
                                    </div>
                                  </div>
                                  <FiArrowRight
                                    size={12}
                                    className="ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                                    style={{ color: '#e8577a' }}
                                  />
                                </Link>
                              </motion.div>
                            ))}
                          </div>

                          {/* Pink accent bar at bottom */}
                          <div style={{ height: '3px', background: 'linear-gradient(to right, #c43d5e, #e8577a, #f07898, #e8577a, #c43d5e)' }} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative text-sm tracking-widest uppercase transition-colors duration-300 group"
                  style={{ color: 'rgba(212,205,197,0.6)' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e8577a'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(212,205,197,0.6)'}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-rita-pink group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          {/* Right CTA + hamburger */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 px-5 py-2 text-xs tracking-widest uppercase rounded-full transition-all duration-300"
              style={{ border: '1px solid rgba(232,87,122,0.4)', color: '#e8577a' }}
              whileHover={{ scale: 1.05, background: '#e8577a', color: '#fff' }}
              whileTap={{ scale: 0.95 }}
            >
              Đặt Bàn
            </motion.a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-2xl"
              style={{ color: '#f0ebe3' }}
            >
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ background: 'rgba(14,13,13,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            {allLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.08 }}
              >
                <Link to={link.href}
                  className="font-heading text-4xl transition-colors"
                  style={{ color: '#f0ebe3' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e8577a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#f0ebe3'}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile category list */}
            <motion.div
              className="mt-2 flex flex-wrap justify-center gap-2 px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              {categories.map(cat => (
                <Link key={cat.id} to={`/menu/${cat.slug}`}
                  className="px-3 py-1.5 rounded-full text-xs tracking-wide transition-all"
                  style={{ border: '1px solid rgba(58,54,51,0.9)', color: 'rgba(138,128,120,0.9)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,87,122,0.5)'; e.currentTarget.style.color = '#e8577a' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(58,54,51,0.9)'; e.currentTarget.style.color = 'rgba(138,128,120,0.9)' }}
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
              className="mt-4 text-sm tracking-widest" style={{ color: '#8a8078' }}>
              07:30 — 22:30
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}