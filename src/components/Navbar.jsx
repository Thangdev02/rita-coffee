import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const links = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Khu Dino 🦕', href: '/dino' },
  { label: 'Về RITA', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(14,13,13,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(58,54,51,0.7)' : 'none',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="group">
            <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col leading-none">
              <span className="font-heading text-2xl md:text-3xl text-pink-gradient tracking-widest" style={{
                background: 'linear-gradient(135deg, #e8577a, #f07898)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                RITA
              </span>
              <span className="text-[9px] tracking-[0.35em] text-rita-pink/50 uppercase">Cafe & Bistro</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-sm tracking-widest uppercase text-rita-warm/60 hover:text-rita-pink transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-rita-pink group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://www.facebook.com"
              target="_blank"
              className="hidden md:flex items-center gap-2 px-5 py-2 border border-rita-pink/40 text-rita-pink text-xs tracking-widest uppercase hover:bg-rita-pink hover:text-white transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đặt Bàn
            </motion.a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-rita-cream text-2xl">
              {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(14,13,13,0.98)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link to={link.href} className="font-heading text-4xl text-rita-cream hover:text-rita-pink transition-colors">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-rita-muted text-sm tracking-widest"
            >
              07:30 — 22:30
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}