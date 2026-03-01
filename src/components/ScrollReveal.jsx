import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })
  const variants = {
    up:    { hidden: { opacity: 0, y: 55 }, visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -55 }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -55 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 55 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1 } },
  }
  return (
    <motion.div ref={ref} className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction] || variants.up}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  )
}
