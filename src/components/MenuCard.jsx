import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { FiHeart, FiX, FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi'

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

// Kiểm tra có phải video không
function isVideo(src) {
  if (!src || !src.trim()) return false
  return src.trim().match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) !== null
}

// Component thumbnail card cho video
function VideoThumb({ src, hovered }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e1c1a 0%, #0f0e0d 100%)' }}>
      <video
        src={src}
        className="w-full h-full"
        style={{ objectFit: 'cover' }}
        muted playsInline preload="metadata"
      />
      {/* Play icon overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(6px)' }}>
          <FiPlay size={18} fill="white" color="white" style={{ marginLeft: '2px' }} />
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}>
        <div className="px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-white"
          style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(8px)' }}>
          Xem Video
        </div>
      </motion.div>
    </div>
  )
}

export default function MenuCard({ item, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const images = getImages(item)
  const firstMedia = images.find(src => src && src.trim() !== '') || null
  const hasVideo = isVideo(firstMedia)
  const tag = item.tag ? tagColors[item.tag] : null

  return (
    <>
      <motion.div
        className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
        style={{ background: '#161514', border: '1px solid rgba(48,44,41,0.9)' }}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -5, borderColor: 'rgba(232,87,122,0.35)', transition: { duration: 0.25 } }}
        onClick={() => setShowModal(true)}
      >
        {/* ── MEDIA ── */}
        <div className="relative overflow-hidden flex items-center justify-center"
          style={{ height: '320px', background: '#161514' }}>

          {firstMedia ? (
            hasVideo ? (
              <VideoThumb src={firstMedia} hovered={hovered} />
            ) : (
              <motion.img
                src={firstMedia}
                alt={item.name}
                className="w-full h-full"
                style={{ objectFit: 'cover' }}
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
              <span className="text-5xl opacity-10">🍽️</span>
              <span className="text-xs" style={{ color: 'rgba(138,128,120,0.3)' }}>Chưa có hình</span>
            </div>
          )}

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
           />

          {/* Tag */}
          {tag && (
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: tag.bg, color: tag.text, backdropFilter: 'blur(6px)' }}>
              {tag.label}
            </div>
          )}

          {/* Video badge */}
          {hasVideo && (
            <div className="absolute top-3 right-10 px-2 py-0.5 rounded-full text-xs"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.05)' }}>
              🎬 Video
            </div>
          )}

          {/* Like */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(10,9,9,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}
            whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <FiHeart size={13} style={{ color: liked ? '#e8577a' : 'rgba(255,255,255,0.5)', fill: liked ? '#e8577a' : 'none' }} />
          </motion.button>
        </div>

        {/* ── INFO ── */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading text-base text-rita-cream mb-1 leading-snug line-clamp-2 group-hover:text-rita-pink transition-colors duration-300">
            {item.name}
          </h3>
          <p className="text-rita-muted text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{item.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="price-badge">{formatPrice(item.price)}</span>
            <div className="flex gap-1.5">
              {item.hot && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,120,50,0.1)', color: '#ff9060' }}>☕</span>}
              {item.iced && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(80,160,255,0.08)', color: '#80c0ff' }}>🧊</span>}
            </div>
          </div>
        </div>
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

// ── VIDEO PLAYER trong modal ──
function ModalVideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center"
      style={{ background: '#000' }}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full"
        style={{ objectFit: 'contain' }}
        playsInline
        loop
        muted
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
      />
      {/* Play/pause overlay */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggle}>
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(232,87,122,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 0 40px rgba(232,87,122,0.4)' }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiPlay size={24} fill="white" color="white" style={{ marginLeft: '3px' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pause btn khi đang play */}
      {playing && (
        <motion.button
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
          onClick={toggle}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          ⏸
        </motion.button>
      )}
    </div>
  )
}

function DetailModal({ item, images, tag, liked, onLike, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)

  const currentSrc = images[activeImg]?.trim() || null
  const currentIsVideo = isVideo(currentSrc)
  const filledMedia = images.filter(i => i && i.trim())

  const prev = (e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length) }

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-3 sm:p-4"
      style={{ background: 'rgba(4,3,3,0.93)', backdropFilter: 'blur(22px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '480px',
          borderRadius: '22px',
          background: '#0e0d0d',
          border: '1px solid rgba(232,87,122,0.1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.9)',
        }}
        initial={{ scale: 0.93, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 24, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 36 }}
        onClick={e => e.stopPropagation()}
      >
        {/* ══ MEDIA AREA ══ */}
        <div className="relative overflow-hidden"
          style={{
            height: currentIsVideo ? '65vh' : '58vh',
            minHeight: '280px',
            maxHeight: currentIsVideo ? '560px' : '500px',
            background: currentIsVideo ? '#000' : 'radial-gradient(ellipse at 50% 35%, #201e1c 0%, #090807 100%)',
          }}>

          <AnimatePresence mode="wait">
            {currentSrc ? (
              currentIsVideo ? (
                <motion.div key={`video-${activeImg}`} className="absolute inset-0"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}>
                  <ModalVideoPlayer src={currentSrc} />
                </motion.div>
              ) : (
                <motion.img
                  key={`img-${activeImg}`}
                  src={currentSrc}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: 'cover', padding: '0' }}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              )
            ) : (
              <motion.div key={`empty-${activeImg}`}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="text-6xl opacity-10">📷</span>
                <span className="text-xs tracking-widest" style={{ color: 'rgba(138,128,120,0.3)' }}>
                  Slot {activeImg + 1} — chưa có ảnh
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gradient dưới — ẩn khi là video */}
          {!currentIsVideo && (
            <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(8,7,7,1) 0%, rgba(8,7,7,0.55) 45%, transparent 100%)' }} />
          )}

          {/* Top controls */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pointer-events-none">
            <div className="px-2.5 py-1 rounded-full text-xs font-mono pointer-events-auto"
              style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {activeImg + 1} / {images.length}
            </div>
            {tag ? (
              <span className="px-3 py-1 rounded-full text-xs font-medium pointer-events-none"
                style={{ background: tag.bg, color: tag.text, backdropFilter: 'blur(8px)' }}>
                {tag.label}
              </span>
            ) : <span />}
            <motion.button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center pointer-events-auto"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)' }}
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <FiX size={15} />
            </motion.button>
          </div>

          {/* Arrows — chỉ hiện khi nhiều media */}
          {filledMedia.length > 1 && (
            <>
              <motion.button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(6px)' }}
                whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.55)' }} whileTap={{ scale: 0.9 }}>
                <FiChevronLeft size={18} />
              </motion.button>
              <motion.button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(6px)' }}
                whileHover={{ scale: 1.1, background: 'rgba(232,87,122,0.55)' }} whileTap={{ scale: 0.9 }}>
                <FiChevronRight size={18} />
              </motion.button>
            </>
          )}

          {/* Tên + giá — chỉ hiện khi KHÔNG phải video */}
          {!currentIsVideo && (
            <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
              <div className="flex items-end justify-between mb-2.5">
                <div className="flex-1 mr-3">
                  <h2 className="font-heading text-white leading-tight" style={{ fontSize: '1.35rem' }}>{item.name}</h2>
                  {item.nameEn && (
                    <p className="text-xs italic mt-0.5" style={{ color: 'rgba(232,87,122,0.6)' }}>{item.nameEn}</p>
                  )}
                </div>
                <div className="font-heading text-xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #e8577a, #f5a0b4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-sm ml-0.5">đ</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                {images.map((_, i) => (
                  <motion.button key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                    className="rounded-full"
                    animate={{ width: i === activeImg ? '18px' : '6px', background: i === activeImg ? '#e8577a' : 'rgba(255,255,255,0.2)' }}
                    style={{ height: '5px' }} transition={{ duration: 0.22 }} />
                ))}
              </div>
            </div>
          )}

          {/* Tên + giá khi là video — hiển thị ở dưới cùng với nền mờ */}
          {currentIsVideo && (
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
              <div className="flex items-end justify-between">
                <div className="flex-1 mr-3">
                  <h2 className="font-heading text-white leading-tight" style={{ fontSize: '1.2rem' }}>{item.name}</h2>
                  {item.nameEn && (
                    <p className="text-xs italic mt-0.5" style={{ color: 'rgba(232,87,122,0.6)' }}>{item.nameEn}</p>
                  )}
                </div>
                <div className="font-heading text-xl flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #e8577a, #f5a0b4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-sm ml-0.5">đ</span>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex gap-1.5 mt-2">
                  {images.map((_, i) => (
                    <motion.button key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                      className="rounded-full"
                      animate={{ width: i === activeImg ? '18px' : '6px', background: i === activeImg ? '#e8577a' : 'rgba(255,255,255,0.2)' }}
                      style={{ height: '5px' }} transition={{ duration: 0.22 }} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ══ THUMBNAILS — chỉ hiện khi có nhiều hơn 1 media ══ */}
        {filledMedia.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto"
            style={{ background: '#0b0a0a', borderTop: '1px solid rgba(44,40,38,0.6)' }}>
            {images.map((src, i) => {
              const hasSrc = src && src.trim() !== ''
              const isVid = isVideo(src)
              return (
                <motion.button key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  className="relative flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-center"
                  style={{
                    width: '62px', height: '52px',
                    background: hasSrc ? '#161514' : '#191817',
                    border: `1.5px solid ${i === activeImg ? '#e8577a' : 'rgba(48,44,41,0.7)'}`,
                    boxShadow: i === activeImg ? '0 0 10px rgba(232,87,122,0.28)' : 'none',
                    padding: '3px',
                  }}
                  whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}>
                  {hasSrc ? (
                    isVid ? (
                      <>
                        <video src={src} className="w-full h-full" style={{ objectFit: 'cover' }} muted playsInline preload="metadata" />
                        <div className="absolute inset-0 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(0,0,0,0.45)' }}>
                          <FiPlay size={12} fill="white" color="white" style={{ marginLeft: '1px' }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <img src={src} alt="" className="w-full h-full" style={{ objectFit: 'contain' }} />
                        {i !== activeImg && <div className="absolute inset-0 rounded-xl" style={{ background: 'rgba(0,0,0,0.38)' }} />}
                      </>
                    )
                  ) : (
                    <span className="text-base opacity-15">📷</span>
                  )}
                  <div className="absolute bottom-0.5 right-1 text-[9px]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}>{i + 1}</div>
                </motion.button>
              )
            })}
          </div>
        )}

        {/* ══ CHI TIẾT COLLAPSIBLE ══ */}
        <div style={{ background: '#0f0e0e', borderTop: '1px solid rgba(44,40,38,0.5)' }}>
          <motion.button
            className="w-full flex items-center justify-between px-5 py-3.5"
            onClick={(e) => { e.stopPropagation(); setInfoExpanded(v => !v) }}
            whileTap={{ scale: 0.99 }}>
            <span className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(138,128,120,0.5)' }}>Chi Tiết</span>
            <motion.span animate={{ rotate: infoExpanded ? 180 : 0 }} transition={{ duration: 0.22 }}
              style={{ color: 'rgba(138,128,120,0.45)', fontSize: '11px' }}>▼</motion.span>
          </motion.button>

          <AnimatePresence>
            {infoExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: 'hidden' }}>
                <div className="px-5 pb-4 pt-1">
                  <p className="text-sm leading-relaxed text-rita-muted mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.hot && (
                      <span className="px-3 py-1 rounded-full text-xs"
                        style={{ background: 'rgba(255,120,50,0.09)', color: '#ff9060', border: '1px solid rgba(255,120,50,0.14)' }}>
                        ☕ Phục vụ nóng
                      </span>
                    )}
                    {item.iced && (
                      <span className="px-3 py-1 rounded-full text-xs"
                        style={{ background: 'rgba(80,160,255,0.07)', color: '#80c0ff', border: '1px solid rgba(80,160,255,0.12)' }}>
                        🧊 Phục vụ đá
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-end px-5 pb-4 pt-1">
            <motion.button onClick={onLike}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: liked ? 'rgba(232,87,122,0.14)' : 'rgba(36,33,31,0.9)',
                border: `1.5px solid ${liked ? '#e8577a' : 'rgba(48,44,41,0.9)'}`,
                boxShadow: liked ? '0 0 16px rgba(232,87,122,0.22)' : 'none',
              }}
              whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }}>
              <FiHeart size={16} style={{ color: liked ? '#e8577a' : '#6a6060', fill: liked ? '#e8577a' : 'none' }} />
            </motion.button>
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}