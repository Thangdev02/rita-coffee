import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const over = (e) => setHovering(!!e.target.closest('a, button, [role="button"], .cursor-hover'))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])

  if (!visible) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: hovering ? 0.3 : 1 }}
        transition={{ type: 'spring', stiffness: 900, damping: 40, mass: 0.08 }}
      >
        <div className="w-2.5 h-2.5 bg-white rounded-full" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 18, y: pos.y - 18, scale: hovering ? 2 : 1, opacity: hovering ? 0.7 : 0.25 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.6 }}
      >
        <div className="w-9 h-9 rounded-full" style={{ border: '1px solid #e8577a' }} />
      </motion.div>
    </>
  )
}