import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiHeart, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const tagColors = {
  bestseller: { bg: 'rgba(232,87,122,0.2)', text: '#f07898', label: '🔥 Bán Chạy' },
  popular:    { bg: 'rgba(100,160,255,0.15)', text: '#82b4ff', label: '💫 Phổ Biến' },
  signature:  { bg: 'rgba(180,120,255,0.15)', text: '#c494ff', label: '⭐ Signature' },
  new:        { bg: 'rgba(80,200,120,0.15)', text: '#5cd68c', label: '✨ Mới' },
  healthy:    { bg: 'rgba(60,190,100,0.15)', text: '#3dbe64', label: '🌿 Healthy' },
}

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

function getImages(item) {
  if (Array.isArray(item.images) && item.images.length > 0) return item.images
  if (item.image) return [item.image, '', '']
  return ['', '', '']
}

export default function MenuCard({ item, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const images = getImages(item)
  const thumbImage = images.find(img => img && img.trim() !== '') || null
  const tag = item.tag ? tagColors[item.tag] : null

  return (
    <>
      <motion.div
        className="group relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ background: '#1e1c1b', border: '1px solid rgba(58,54,51,0.8)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -6, borderColor: 'rgba(232,87,122,0.4)', transition: { duration: 0.3 } }}
        onClick={() => setShowModal(true)}
      >
        <div className="relative h-48 overflow-hidden" style={{ background: '#161514' }}>
          {thumbImage ? (
            <motion.img src={thumbImage} alt={item.name}
              className="w-full h-full object-cover"
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <span className="text-4xl opacity-20">🍹</span>
              <span className="text-xs" style={{ color: 'rgba(138,128,120,0.3)' }}>Chưa có hình</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/80 via-transparent to-transparent" />
          {tag && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
              style={{ background: tag.bg, color: tag.text }}>{tag.label}</div>
          )}
          <motion.button onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(14,13,13,0.6)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <FiHeart size={13} style={{ color: liked ? '#e8577a' : 'rgba(255,255,255,0.6)', fill: liked ? '#e8577a' : 'none' }} />
          </motion.button>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-xs"
            style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)' }}>
            📷 {images.length}
          </div>
          <motion.div className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }}>
            <div className="px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-white"
              style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(8px)' }}>
              Xem Chi Tiết
            </div>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="font-heading text-base text-rita-cream mb-1 group-hover:text-rita-pink transition-colors duration-300 line-clamp-1">
            {item.name}
          </h3>
          <p className="text-rita-muted text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="price-badge">{formatPrice(item.price)}</span>
            <div className="flex gap-1.5">
              {item.hot && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,120,50,0.12)', color: '#ff9060' }}>☕</span>}
              {item.iced && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(80,160,255,0.1)', color: '#80c0ff' }}>🧊</span>}
            </div>
          </div>
        </div>
        <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: hovered ? '0 20px 60px rgba(232,87,122,0.1)' : 'none' }}
          transition={{ duration: 0.3 }} />
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <DetailModal item={item} images={images} tag={tag} liked={liked}
            onLike={() => setLiked(!liked)} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

function DetailModal({ item, images, tag, liked, onLike, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)

  const currentSrc = images[activeImg] && images[activeImg].trim() !== '' ? images[activeImg] : null
  const prev = (e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length) }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(4,3,3,0.92)', backdropFilter: 'blur(20px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '500px', borderRadius: '20px',
          background: '#0e0d0d',
          border: '1px solid rgba(232,87,122,0.12)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.85)',
          margin: '0 12px 12px',
        }}
        initial={{ scale: 0.93, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── ẢNH TO chiếm phần lớn ── */}
        <div className="relative overflow-hidden"
          style={{ height: '62vh', minHeight: '300px', maxHeight: '520px', background: '#080707' }}>

          <AnimatePresence mode="wait">
            {currentSrc ? (
              <motion.img key={`img-${activeImg}`} src={currentSrc} alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }} />
            ) : (
              <motion.div key={`empty-${activeImg}`}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="text-7xl opacity-10">📷</span>
                <span className="text-xs tracking-widest" style={{ color: 'rgba(138,128,120,0.3)' }}>
                  Slot {activeImg + 1} — chưa có ảnh
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gradient đậm phía dưới → info nổi lên */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to top, rgba(8,7,7,1) 0%, rgba(8,7,7,0.55) 28%, rgba(8,7,7,0.08) 60%, transparent 100%)'
          }} />

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
            <div className="px-2.5 py-1 rounded-full text-xs font-mono"
              style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {activeImg + 1} / {images.length}
            </div>
            {tag && (
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: tag.bg, color: tag.text, backdropFilter: 'blur(8px)' }}>
                {tag.label}
              </span>
            )}
            <motion.button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)' }}
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <FiX size={15} />
            </motion.button>
          </div>

          {/* Arrows */}
          <motion.button onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}
            whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.55)' }} whileTap={{ scale: 0.9 }}>
            <FiChevronLeft size={18} />
          </motion.button>
          <motion.button onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}
            whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.55)' }} whileTap={{ scale: 0.9 }}>
            <FiChevronRight size={18} />
          </motion.button>

          {/* Info overlay (bottom of image) */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
            <div className="flex items-end justify-between mb-3">
              <div className="flex-1 mr-3">
                <h2 className="font-heading text-white leading-tight" style={{ fontSize: '1.45rem' }}>{item.name}</h2>
                <p className="text-xs italic mt-0.5" style={{ color: 'rgba(232,87,122,0.65)' }}>{item.nameEn}</p>
              </div>
              <div className="font-heading text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #e8577a, #f07898)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-sm ml-0.5">đ</span>
              </div>
            </div>
            {/* Dots */}
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <motion.button key={i} onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  className="rounded-full"
                  animate={{ width: i === activeImg ? '20px' : '6px', background: i === activeImg ? '#e8577a' : 'rgba(255,255,255,0.25)' }}
                  style={{ height: '6px' }} transition={{ duration: 0.25 }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── THUMBNAIL STRIP ── */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto"
          style={{ background: '#0c0b0b', borderTop: '1px solid rgba(58,54,51,0.35)' }}>
          {images.map((img, i) => {
            const hasImg = img && img.trim() !== ''
            return (
              <motion.button key={i}
                onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                className="relative flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-center"
                style={{
                  width: '64px', height: '52px',
                  background: hasImg ? 'transparent' : '#191817',
                  border: `1.5px solid ${i === activeImg ? '#e8577a' : 'rgba(58,54,51,0.6)'}`,
                  boxShadow: i === activeImg ? '0 0 12px rgba(232,87,122,0.35)' : 'none',
                }}
                whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}>
                {hasImg ? (
                  <>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {i !== activeImg && <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />}
                  </>
                ) : (
                  <span className="text-lg opacity-15">📷</span>
                )}
                <div className="absolute bottom-0.5 right-1 text-[9px]"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>{i + 1}</div>
              </motion.button>
            )
          })}
        </div>

        {/* ── INFO PANEL (collapsible) ── */}
        <div style={{ background: '#111010', borderTop: '1px solid rgba(58,54,51,0.4)' }}>
          <motion.button
            className="w-full flex items-center justify-between px-5 py-3"
            onClick={(e) => { e.stopPropagation(); setInfoExpanded(v => !v) }}
            whileTap={{ scale: 0.99 }}>
            <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(138,128,120,0.55)' }}>Chi tiết</span>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {item.hot && <span className="text-xs" style={{ color: '#ff9060' }}>☕</span>}
                {item.iced && <span className="text-xs" style={{ color: '#80c0ff' }}>🧊</span>}
              </div>
              <motion.span animate={{ rotate: infoExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}
                className="text-rita-muted text-xs">▼</motion.span>
            </div>
          </motion.button>

          <AnimatePresence>
            {infoExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}>
                <div className="px-5 pb-4">
                  <p className="text-sm leading-relaxed text-rita-muted mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.hot && (
                      <span className="px-3 py-1.5 rounded-full text-xs"
                        style={{ background: 'rgba(255,120,50,0.1)', color: '#ff9060', border: '1px solid rgba(255,120,50,0.18)' }}>
                        ☕ Phục vụ nóng
                      </span>
                    )}
                    {item.iced && (
                      <span className="px-3 py-1.5 rounded-full text-xs"
                        style={{ background: 'rgba(80,160,255,0.08)', color: '#80c0ff', border: '1px solid rgba(80,160,255,0.15)' }}>
                        🧊 Phục vụ đá
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Like button */}
          <div className="flex justify-end px-5 pb-4">
            <motion.button onClick={onLike}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: liked ? 'rgba(232,87,122,0.15)' : 'rgba(40,37,35,0.9)',
                border: `1.5px solid ${liked ? '#e8577a' : 'rgba(58,54,51,0.8)'}`,
                boxShadow: liked ? '0 0 16px rgba(232,87,122,0.25)' : 'none',
              }}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }}>
              <FiHeart size={16} style={{ color: liked ? '#e8577a' : '#8a8078', fill: liked ? '#e8577a' : 'none' }} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}