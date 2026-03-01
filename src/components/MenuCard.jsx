import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FiHeart, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const tagColors = {
  bestseller: { bg: 'rgba(232,87,122,0.2)', text: '#f07898', label: '🔥 Bán Chạy' },
  popular:    { bg: 'rgba(100,160,255,0.15)', text: '#82b4ff', label: '💫 Phổ Biến' },
  signature:  { bg: 'rgba(180,120,255,0.15)', text: '#c494ff', label: '⭐ Signature' },
  new:        { bg: 'rgba(80,200,120,0.15)', text: '#5cd68c', label: '✨ Mới' },
  healthy:    { bg: 'rgba(60,190,100,0.15)', text: '#3dbe64', label: '🌿 Healthy' },
}

// Generate a few extra "angles" for the detail gallery
const buildGallery = (item) => {
  const bases = [
    item.image,
    item.image.replace('w=400', 'w=401').replace('q=80', 'q=81'),
    item.image.replace('w=400', 'w=600').replace('q=80', 'q=75'),
    item.image.replace('w=400', 'w=402'),
  ]
  // Use Unsplash variation trick
  const variants = [
    item.image,
    `https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80`,
    `https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80`,
    `https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80`,
  ]
  return variants
}

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ'

export default function MenuCard({ item, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const tag = item.tag ? tagColors[item.tag] : null

  const handleLike = (e) => {
    e.stopPropagation()
    setLiked(!liked)
    if (!liked) toast.success(`Đã thêm ${item.name} vào yêu thích!`)
  }

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
        whileHover={{ y: -8, borderColor: 'rgba(232,87,122,0.4)', transition: { duration: 0.3 } }}
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden" style={{ background: '#161514' }}>
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e1c1b]/90 via-transparent to-transparent" />

          {tag && (
            <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium"
              style={{ background: tag.bg, color: tag.text }}>
              {tag.label}
            </div>
          )}

          <motion.button
            onClick={handleLike}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(14,13,13,0.6)', backdropFilter: 'blur(8px)' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <FiHeart size={13} className={liked ? 'text-rita-pink fill-rita-pink' : 'text-white/60'} />
          </motion.button>

          <div className="absolute bottom-3 left-3 flex gap-1">
            {item.hot && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{ background: 'rgba(255,120,50,0.2)', color: '#ff9060', border: '1px solid rgba(255,120,50,0.25)' }}>
                ☕ Hot
              </span>
            )}
            {item.iced && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                style={{ background: 'rgba(80,160,255,0.15)', color: '#80c0ff', border: '1px solid rgba(80,160,255,0.25)' }}>
                🧊 Iced
              </span>
            )}
          </div>

          {/* View detail overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-white"
              style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(8px)' }}>
              Xem Chi Tiết
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-heading text-lg text-rita-cream mb-1 group-hover:text-rita-pink transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-rita-muted text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="price-badge">{formatPrice(item.price)}</span>
            <motion.span className="text-xs text-rita-pink/50 group-hover:text-rita-pink transition-colors tracking-wide"
              whileHover={{ x: 3 }}>
              Chi tiết →
            </motion.span>
          </div>
        </div>

        {/* Pink glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{ boxShadow: hovered ? '0 20px 60px rgba(232,87,122,0.12)' : '0 0 0 rgba(232,87,122,0)' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* ── DETAIL MODAL ── */}
      <AnimatePresence>
        {showModal && (
          <DetailModal item={item} tag={tag} onClose={() => setShowModal(false)} liked={liked} onLike={() => setLiked(!liked)} />
        )}
      </AnimatePresence>
    </>
  )
}

function DetailModal({ item, tag, onClose, liked, onLike }) {
  const gallery = buildGallery(item)
  const [activeImg, setActiveImg] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)

  const prev = (e) => { e.stopPropagation(); setImgLoaded(false); setActiveImg(i => (i - 1 + gallery.length) % gallery.length) }
  const next = (e) => { e.stopPropagation(); setImgLoaded(false); setActiveImg(i => (i + 1) % gallery.length) }

  // keyboard navigation
  const handleKey = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') { setImgLoaded(false); setActiveImg(i => (i - 1 + gallery.length) % gallery.length) }
    if (e.key === 'ArrowRight') { setImgLoaded(false); setActiveImg(i => (i + 1) % gallery.length) }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'rgba(6,5,5,0.92)', backdropFilter: 'blur(18px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={-1}
    >
      {/* ── MODAL SHELL: near-full-screen, cinematic 16:9-ish ── */}
      <motion.div
        className="relative flex flex-col md:flex-row w-full h-full md:h-auto md:rounded-3xl overflow-hidden"
        style={{
          maxWidth: '1100px',
          maxHeight: '92vh',
          margin: '0 auto',
          background: '#161514',
          border: '1px solid rgba(232,87,122,0.2)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(232,87,122,0.08)',
        }}
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── LEFT: GALLERY (55%) ── */}
        <div className="relative md:w-[55%] flex-shrink-0 flex flex-col" style={{ minHeight: '300px' }}>

          {/* Main image */}
          <div className="relative flex-1 overflow-hidden" style={{ background: '#0e0d0d', minHeight: '260px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg]}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                onLoad={() => setImgLoaded(true)}
              />
            </AnimatePresence>

            {/* Invisible load trigger */}
            <img key={`pre-${activeImg}`} src={gallery[activeImg]} alt="" className="hidden"
              onLoad={() => setImgLoaded(true)} />

            {/* Bottom gradient */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(22,21,20,1) 0%, rgba(22,21,20,0.2) 35%, transparent 60%)' }} />
            {/* Left vignette into info panel */}
            <div className="absolute inset-0 pointer-events-none hidden md:block"
              style={{ background: 'linear-gradient(to right, transparent 70%, rgba(22,21,20,0.6) 100%)' }} />

            {/* Image counter pill */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono text-white/60"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {activeImg + 1} / {gallery.length}
            </div>

            {/* Arrow buttons */}
            <motion.button onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.5)' }}
              whileTap={{ scale: 0.9 }}>
              <FiChevronLeft size={20} />
            </motion.button>
            <motion.button onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
              whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.5)' }}
              whileTap={{ scale: 0.9 }}>
              <FiChevronRight size={20} />
            </motion.button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-none">
              {gallery.map((_, i) => (
                <motion.div key={i}
                  className="rounded-full"
                  animate={{ width: i === activeImg ? '22px' : '6px', background: i === activeImg ? '#e8577a' : 'rgba(255,255,255,0.25)' }}
                  style={{ height: '6px' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2.5 p-3 overflow-x-auto flex-shrink-0"
            style={{ background: '#0e0d0d', borderTop: '1px solid rgba(58,54,51,0.6)' }}>
            {gallery.map((img, i) => (
              <motion.button key={i} onClick={() => { setImgLoaded(false); setActiveImg(i) }}
                className="relative flex-shrink-0 overflow-hidden rounded-xl"
                style={{
                  width: '72px', height: '56px',
                  border: `2px solid ${i === activeImg ? '#e8577a' : 'rgba(58,54,51,0.7)'}`,
                  boxShadow: i === activeImg ? '0 0 14px rgba(232,87,122,0.4)' : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
                {i !== activeImg && <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── RIGHT: INFO (45%) ── */}
        <div className="md:w-[45%] flex flex-col overflow-y-auto"
          style={{ borderLeft: '1px solid rgba(58,54,51,0.5)' }}>

          {/* Sticky header with close */}
          <div className="flex items-center justify-between px-8 pt-7 pb-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(58,54,51,0.4)' }}>
            <div className="flex items-center gap-3">
              {tag && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: tag.bg, color: tag.text }}>
                  {tag.label}
                </span>
              )}
              <span className="text-xs tracking-widest uppercase text-rita-muted/50">RITA Cafe</span>
            </div>
            <motion.button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-rita-muted hover:text-white transition-colors"
              style={{ background: 'rgba(58,54,51,0.5)', border: '1px solid rgba(58,54,51,0.8)' }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}>
              <FiX size={15} />
            </motion.button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {/* Name */}
            <motion.h2
              className="font-heading leading-tight text-rita-cream mb-1"
              style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {item.name}
            </motion.h2>
            <motion.p className="text-rita-pink/60 text-sm italic mb-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}>
              {item.nameEn}
            </motion.p>

            {/* Description */}
            <motion.p className="text-rita-muted leading-relaxed text-sm mb-7"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
              {item.description}
            </motion.p>

            {/* Hot / Iced */}
            <div className="flex gap-2.5 mb-7">
              {item.hot && (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(255,120,50,0.12)', color: '#ff9060', border: '1px solid rgba(255,120,50,0.2)' }}>
                  ☕ Phục vụ nóng
                </span>
              )}
              {item.iced && (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(80,160,255,0.1)', color: '#80c0ff', border: '1px solid rgba(80,160,255,0.18)' }}>
                  🧊 Phục vụ đá
                </span>
              )}
            </div>

            {/* Specs */}
            <div className="rounded-2xl overflow-hidden mb-7"
              style={{ border: '1px solid rgba(58,54,51,0.7)', background: 'rgba(14,13,13,0.4)' }}>
              {[
                { label: 'Danh mục', value: item.categorySlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) },
                { label: 'Phù hợp', value: 'Mọi lứa tuổi' },
                { label: 'Xuất xứ', value: 'RITA Original' },
              ].map(({ label, value }, i, arr) => (
                <div key={label} className="flex items-center justify-between px-5 py-3.5 text-sm"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(58,54,51,0.5)' : 'none' }}>
                  <span className="text-rita-muted">{label}</span>
                  <span className="text-rita-cream font-medium">{value}</span>
                </div>
              ))}
            </div>

            {/* Rating stars flair */}
            <div className="flex items-center gap-2 mb-2">
              {Array(5).fill(0).map((_, i) => (
                <motion.svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#e8577a"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06 }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </motion.svg>
              ))}
              <span className="text-rita-muted text-xs ml-1">5.0 · Khách yêu thích</span>
            </div>
          </div>

          {/* ── Sticky footer: price + CTA ── */}
          <div className="flex-shrink-0 px-8 py-6"
            style={{ borderTop: '1px solid rgba(58,54,51,0.4)', background: 'rgba(14,13,13,0.6)' }}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-xs text-rita-muted tracking-[0.2em] uppercase mb-1">Giá niêm yết</div>
                <div className="font-heading"
                  style={{
                    fontSize: '38px', lineHeight: 1,
                    background: 'linear-gradient(135deg, #e8577a, #f07898)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>
                  {new Intl.NumberFormat('vi-VN').format(item.price)}
                  <span className="text-lg ml-1">đ</span>
                </div>
              </div>

              <motion.button onClick={(e) => { e.stopPropagation(); onLike() }}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: liked ? 'rgba(232,87,122,0.18)' : 'rgba(40,37,35,0.8)',
                  border: `1.5px solid ${liked ? '#e8577a' : 'rgba(58,54,51,0.8)'}`,
                  boxShadow: liked ? '0 0 20px rgba(232,87,122,0.3)' : 'none',
                }}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.85, rotate: -15 }}
              >
                <FiHeart size={18} style={{ color: liked ? '#e8577a' : '#8a8078', fill: liked ? '#e8577a' : 'none' }} />
              </motion.button>
            </div>

            <motion.button
              className="w-full py-4 rounded-2xl text-white font-semibold tracking-widest text-sm uppercase flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, #e8577a 0%, #c43d5e 100%)' }}
              whileHover={{ scale: 1.02, boxShadow: '0 12px 50px rgba(232,87,122,0.4)' }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); toast.success(`${item.name} — gọi tại quán nhé! 🍹`); onClose() }}
            >
              <span>Gọi Món Này</span>
              <span className="text-lg">🍹</span>
            </motion.button>

            <p className="text-center text-rita-muted/40 text-xs mt-3 tracking-wide">
              Nhấn ESC hoặc click ngoài để đóng
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}