import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LETTERS = ['R', 'I', 'T', 'A']

function WaterFillLetter({ char, delay, onDone, index, exitPhase }) {
  const [fillY, setFillY] = useState(100)
  const [glowing, setGlowing] = useState(false)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const onDoneRef = useRef(onDone)
  const duration = 1000

  useEffect(() => { onDoneRef.current = onDone }, [onDone])

  useEffect(() => {
    const timeout = setTimeout(() => {
      startRef.current = null
      const tick = (ts) => {
        if (!startRef.current) startRef.current = ts
        const elapsed = ts - startRef.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2
        setFillY(100 - eased * 100)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setFillY(0)
          setGlowing(true)
          setTimeout(() => onDoneRef.current?.(), 200)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [delay, index])

  const uid = `wfl-${index}`
  const isI = char === 'I'
  const VW = isI ? 60 : 110
  const VH = 130
  const cx = isI ? 30 : 55
  const fs = isI ? 115 : 125
  const fillPx = (fillY / 100) * VH

  const isVortex = exitPhase === 'vortex' || exitPhase === 'blackout'

  // Each letter spirals toward center-ish with unique angle
  const angle = [-55, -20, 20, 55][index]
  const vortexDelay = index * 0.055

  return (
    <motion.div
      className="relative select-none"
      style={{ width: isI ? '60px' : '110px', originX: '50%', originY: '50%' }}
      animate={isVortex ? {
        scale: 0,
        rotate: angle,
        x: `${(1.5 - index) * 45}px`,
        y: '30px',
        opacity: 0,
        filter: 'blur(6px)',
      } : {
        scale: 1, rotate: 0, x: '0px', y: '0px', opacity: 1, filter: 'blur(0px)'
      }}
      transition={isVortex ? {
        duration: 0.55,
        delay: vortexDelay,
        ease: [0.6, 0.05, 0.9, 0.1],
      } : { duration: 0.01 }}
    >
      <svg
        width="100%"
        viewBox={`0 0 ${VW} ${VH}`}
        style={{
          overflow: 'visible',
          filter: glowing
            ? 'drop-shadow(0 0 18px rgba(232,87,122,0.7))'
            : 'drop-shadow(0 0 4px rgba(232,87,122,0.2))'
        }}
      >
        <defs>
          <mask id={`${uid}-mask`}>
            <rect x={-10} y={fillPx} width={VW + 20} height={VH * 2} fill="white" />
          </mask>
          <linearGradient id={`${uid}-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f07898" />
            <stop offset="60%" stopColor="#e8577a" />
            <stop offset="100%" stopColor="#c43d5e" />
          </linearGradient>
          <linearGradient id={`${uid}-shimmer`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        <text x={cx} y="118" textAnchor="middle"
          fontFamily='"DM Serif Display", serif'
          fontSize={fs} fontWeight="400"
          fill="none" stroke="rgba(232,87,122,0.18)" strokeWidth="1"
        >{char}</text>

        <g mask={`url(#${uid}-mask)`}>
          <text x={cx} y="118" textAnchor="middle"
            fontFamily='"DM Serif Display", serif'
            fontSize={fs} fontWeight="400"
            fill={`url(#${uid}-grad)`}
          >{char}</text>
          <text x={cx} y="118" textAnchor="middle"
            fontFamily='"DM Serif Display", serif'
            fontSize={fs} fontWeight="400"
            fill={`url(#${uid}-shimmer)`}
            style={{ mixBlendMode: 'screen' }}
          >{char}</text>
        </g>

        {fillY > 1 && fillY < 99 && (
          <line x1={-5} y1={fillPx} x2={VW + 5} y2={fillPx}
            stroke="rgba(240,120,152,0.55)" strokeWidth="1.5" />
        )}
        {fillY > 5 && fillY < 95 && [0, 1, 2].map((i) => (
          <circle key={i} r={i + 1.5}
            cx={(0.25 + i * 0.25) * VW} cy={fillPx - i * 7}
            fill="rgba(240,120,152,0.3)" />
        ))}
      </svg>

      {glowing && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: '#e8577a' }}
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{ opacity: [0, 0.8, 0], y: [0, 16], scale: [1, 0.4] }}
          transition={{ duration: 0.6, delay: 0.1 }}
        />
      )}
    </motion.div>
  )
}

export default function Preloader({ onComplete }) {
  // phases: filling → subtitle → vortex → blackout
  // 'blackout' = letters gone, full black overlay fades in, THEN onComplete
  const [phase, setPhase] = useState('filling')
  const [lettersDone, setLettersDone] = useState(0)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const totalDuration = 3000
  const calledComplete = useRef(false)

  const handleLetterDone = useCallback(() => {
    setLettersDone(p => p + 1)
  }, [])

  useEffect(() => {
    // Timeline:
    // 0       — letters start filling
    // 3200ms  — subtitle fades in
    // 4200ms  — vortex starts (letters swirl away, ~0.55s + stagger = ~0.75s total)
    // 5100ms  — all letters gone → blackout overlay fades in (0.6s)
    // 5700ms  — onComplete → home page shows
    // 6000ms  — unmount preloader

    const t1 = setTimeout(() => setPhase('subtitle'), 3200)
    const t2 = setTimeout(() => setPhase('vortex'), 4200)
    const t3 = setTimeout(() => setPhase('blackout'), 5100)
    const t4 = setTimeout(() => {
      if (!calledComplete.current) {
        calledComplete.current = true
        onComplete()
      }
    }, 5700)
    const t5 = setTimeout(() => setVisible(false), 6100)

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 1
      })
    }, totalDuration / 100)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      clearTimeout(t4); clearTimeout(t5)
      clearInterval(interval)
    }
  }, [onComplete])

  const letterDelays = [0, 1000, 100, 1300]
  const isExiting = phase === 'vortex' || phase === 'blackout'

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* Main preloader content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: '#0e0d0d' }}
        // Fade out content when blackout starts (not before)
        animate={{ opacity: phase === 'blackout' ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeIn', delay: 0 }}
      >
        {/* Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`
        }} />

        {/* Ambient glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 48%, rgba(232,87,122,0.1), transparent)' }}
          animate={{ opacity: isExiting ? 0 : lettersDone / 4 }}
          transition={{ duration: 0.4 }}
        />

        {/* Burst glow at moment of vortex */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <motion.div
            style={{
              width: '160px', height: '160px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(232,87,122,0.3) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={phase === 'vortex' || phase === 'blackout'
              ? { scale: [0, 2.2, 3.5], opacity: [0, 0.7, 0] }
              : { scale: 0, opacity: 0 }
            }
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Corner brackets */}
        {[
          { pos: 'top-8 left-8',     d: 'M0 20 L0 0 L20 0' },
          { pos: 'top-8 right-8',    d: 'M0 0 L20 0 L20 20' },
          { pos: 'bottom-8 left-8',  d: 'M0 0 L0 20 L20 20' },
          { pos: 'bottom-8 right-8', d: 'M20 0 L20 20 L0 20' },
        ].map(({ pos, d }, i) => (
          <motion.div key={i} className={`absolute ${pos}`}
            animate={isExiting
              ? { opacity: 0, scale: 0.5, transition: { duration: 0.25, delay: i * 0.03 } }
              : { opacity: 0.35, scale: 1, transition: { delay: 0.3 + i * 0.1, duration: 0.6 } }
            }
            initial={{ opacity: 0, scale: 0.6 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d={d} stroke="rgba(232,87,122,0.7)" strokeWidth="1.5" />
            </svg>
          </motion.div>
        ))}

        {/* RITA letters */}
        <div className="flex items-end gap-2 md:gap-4 mb-6">
          {LETTERS.map((char, i) => (
            <WaterFillLetter
              key={char}
              char={char}
              index={i}
              delay={letterDelays[i]}
              onDone={handleLetterDone}
              exitPhase={phase}
            />
          ))}
        </div>

        {/* Subtitle */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          animate={{
            opacity: phase === 'subtitle' ? 1 : 0,
            y: phase === 'filling' ? 12 : isExiting ? -6 : 0,
          }}
          transition={{ duration: isExiting ? 0.25 : 0.8, ease: 'easeOut' }}
        >
          {['CAFE', '&', 'BISTRO'].map((word, i) => (
            <span key={word}
              className="font-body font-light uppercase"
              style={{
                fontSize: 'clamp(11px, 1.8vw, 15px)',
                color: i === 1 ? '#e8577a' : 'rgba(240,235,227,0.45)',
                letterSpacing: i === 1 ? '0.2em' : '0.42em',
              }}
            >{word}</span>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(232,87,122,0.45), transparent)' }}
          animate={{
            width: phase === 'subtitle' ? '180px' : '0px',
            opacity: isExiting ? 0 : 1,
          }}
          transition={{ duration: isExiting ? 0.2 : 0.9, ease: 'easeOut' }}
        />

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="w-52 h-px rounded-full overflow-hidden" style={{ background: 'rgba(58,54,51,0.9)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #c43d5e, #e8577a, #f07898)',
                boxShadow: '0 0 8px rgba(232,87,122,0.7)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.4 }}
            />
          </div>
          <motion.span
            className="font-mono text-xs tracking-[0.3em]"
            style={{ color: 'rgba(232,87,122,0.45)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            {progress < 100 ? `LOADING ${progress}%` : 'WELCOME ✦'}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Black overlay — fades in during blackout phase, sits on top */}
      <motion.div
        className="absolute inset-0"
        style={{ background: '#0e0d0d', pointerEvents: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'blackout' ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeIn' }}
      />
    </div>
  )
}