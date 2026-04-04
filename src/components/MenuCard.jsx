import { useState, useRef, useEffect } from 'react'

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

function isVideo(src) {
  if (!src || !src.trim()) return false
  return src.trim().match(/\.(mp4|webm|mov|ogg)(\?.*)?$/i) !== null
}

// ── SVG Icons (thay react-icons) ──
const IconHeart = ({ filled, color }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? color : 'none'}
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IconHeartLg = ({ filled, color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? color : 'none'}
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const IconLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)
const IconRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const IconPlay = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white"
    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

// ── CSS-only VideoThumb ──
function VideoThumb({ src, hovered }) {
  return (
    <div className="w-full h-full relative flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #1e1c1a 0%, #0f0e0d 100%)' }}>
      <video src={src} className="w-full h-full" style={{ objectFit: 'cover' }}
        muted playsInline preload="metadata" />
      {/* Play icon — ẩn khi hover */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ transition: 'opacity 0.2s', opacity: hovered ? 0 : 1 }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(6px)' }}>
          <IconPlay size={18} />
        </div>
      </div>
      {/* "Xem Video" label — hiện khi hover */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ transition: 'opacity 0.18s', opacity: hovered ? 1 : 0 }}>
        <div className="px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase text-white"
          style={{ background: 'rgba(232,87,122,0.85)', backdropFilter: 'blur(8px)' }}>
          Xem Video
        </div>
      </div>
    </div>
  )
}

// ── Main Card ──
export default function MenuCard({ item, index = 0 }) {
  const [liked, setLiked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  // whileInView → IntersectionObserver
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '-40px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const images = getImages(item)
  const firstMedia = images.find(src => src && src.trim() !== '') || null
  const hasVideo = isVideo(firstMedia)
  const tag = item.tag ? tagColors[item.tag] : null

  return (
    <>
      <div
        ref={ref}
        className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
        style={{
          background: '#161514',
          border: hovered ? '1px solid rgba(232,87,122,0.35)' : '1px solid rgba(48,44,41,0.9)',
          transform: visible ? (hovered ? 'translateY(-5px)' : 'translateY(0)') : 'translateY(32px)',
          opacity: visible ? 1 : 0,
          transition: `opacity 0.55s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.06}s, transform 0.25s ease`,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* ── MEDIA ── */}
        <div className="relative overflow-hidden flex items-center justify-center"
          style={{ height: '320px', background: '#161514' }}>

          {firstMedia ? (
            hasVideo ? (
              <VideoThumb src={firstMedia} hovered={hovered} />
            ) : (
              <img
                src={firstMedia}
                alt={item.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full"
                style={{
                  objectFit: 'cover',
                  transform: hovered ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.5s ease',
                }}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
              <span className="text-5xl opacity-10">🍽️</span>
              <span className="text-xs" style={{ color: 'rgba(138,128,120,0.3)' }}>Chưa có hình</span>
            </div>
          )}

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

          {/* Like button */}
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked) }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(10,9,9,0.65)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'transform 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.8)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1.2)'}
          >
            <IconHeart filled={liked} color={liked ? '#e8577a' : 'rgba(255,255,255,0.5)'} />
          </button>
        </div>

        {/* ── INFO ── */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-heading text-base mb-1 leading-snug line-clamp-2 transition-colors duration-300"
            style={{ color: hovered ? '#e8577a' : '#f0ebe3' }}>
            {item.name}
          </h3>
          <p className="text-rita-muted text-xs leading-relaxed mb-3 line-clamp-2 flex-1">{item.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <span className="price-badge">{formatPrice(item.price)}</span>
          </div>
        </div>
      </div>

      {showModal && (
        <DetailModal item={item} images={images} tag={tag} liked={liked}
          onLike={() => setLiked(!liked)} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

// ── Video Player trong modal ──
function ModalVideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const toggle = (e) => {
    e.stopPropagation()
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ background: '#000' }}>
      <video ref={videoRef} src={src} className="w-full h-full"
        style={{ objectFit: 'contain' }} playsInline loop muted
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onClick={toggle} />

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center cursor-pointer"
        style={{ transition: 'opacity 0.2s', opacity: playing ? 0 : 1, pointerEvents: playing ? 'none' : 'auto' }}
        onClick={toggle}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(232,87,122,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 0 40px rgba(232,87,122,0.4)' }}>
          <IconPlay size={24} />
        </div>
      </div>

      {/* Pause button */}
      {playing && (
        <button className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}
          onClick={toggle}>⏸</button>
      )}
    </div>
  )
}

// ── Detail Modal ──
function DetailModal({ item, images, tag, liked, onLike, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Animate in on mount
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
    // Prevent scroll
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const currentSrc = images[activeImg]?.trim() || null
  const currentIsVideo = isVideo(currentSrc)
  const filledMedia = images.filter(i => i && i.trim())

  const prev = (e) => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length) }
  const next = (e) => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length) }

  return (
    <div
      className="fixed inset-0 z-[999] flex items-end sm:items-center justify-center p-3 sm:p-4"
      style={{
        background: 'rgba(4,3,3,0.93)',
        backdropFilter: 'blur(22px)',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: '480px',
          borderRadius: '22px',
          background: '#0e0d0d',
          border: '1px solid rgba(232,87,122,0.1)',
          boxShadow: '0 40px 120px rgba(0,0,0,0.9)',
          transform: mounted ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(24px)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s',
        }}
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

          {/* Media content */}
          {currentSrc ? (
            currentIsVideo ? (
              <div key={`video-${activeImg}`} className="absolute inset-0"
                style={{ animation: 'fadeIn 0.25s ease' }}>
                <ModalVideoPlayer src={currentSrc} />
              </div>
            ) : (
              <img
                key={`img-${activeImg}`}
                src={currentSrc}
                alt={item.name}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'cover', animation: 'fadeInScale 0.3s cubic-bezier(0.25,0.46,0.45,0.94)' }}
              />
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-6xl opacity-10">📷</span>
              <span className="text-xs tracking-widest" style={{ color: 'rgba(138,128,120,0.3)' }}>
                Slot {activeImg + 1} — chưa có ảnh
              </span>
            </div>
          )}

          {/* Gradient bottom */}
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
              <span className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: tag.bg, color: tag.text, backdropFilter: 'blur(8px)' }}>
                {tag.label}
              </span>
            ) : <span />}
            <button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center pointer-events-auto"
              style={{
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.65)',
                cursor: 'pointer', transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}>
              <IconX />
            </button>
          </div>

          {/* Arrows */}
          {filledMedia.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(6px)', cursor: 'pointer', transition: 'transform 0.15s, background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(232,87,122,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}>
                <IconLeft />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(6px)', cursor: 'pointer', transition: 'transform 0.15s, background 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(232,87,122,0.55)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.5)' }}>
                <IconRight />
              </button>
            </>
          )}

          {/* Name + Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-5 pb-4"
            style={currentIsVideo ? { background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' } : {}}>
            <div className="flex items-end justify-between mb-2.5">
              <div className="flex-1 mr-3">
                <h2 className="font-heading text-white leading-tight"
                  style={{ fontSize: currentIsVideo ? '1.2rem' : '1.35rem' }}>{item.name}</h2>
                {item.nameEn && (
                  <p className="text-xs italic mt-0.5" style={{ color: 'rgba(232,87,122,0.6)' }}>{item.nameEn}</p>
                )}
              </div>
              <div className="font-heading text-xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #e8577a, #f5a0b4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {new Intl.NumberFormat('vi-VN').format(item.price)}<span className="text-sm ml-0.5">đ</span>
              </div>
            </div>
            {/* Dots */}
            <div className="flex gap-1.5">
              {images.map((_, i) => (
                <button key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  style={{
                    height: '5px',
                    width: i === activeImg ? '18px' : '6px',
                    background: i === activeImg ? '#e8577a' : 'rgba(255,255,255,0.2)',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'width 0.22s, background 0.22s',
                    padding: 0,
                  }} />
              ))}
            </div>
          </div>
        </div>

        {/* ══ THUMBNAILS ══ */}
        {filledMedia.length > 1 && (
          <div className="flex gap-2 px-4 py-3 overflow-x-auto"
            style={{ background: '#0b0a0a', borderTop: '1px solid rgba(44,40,38,0.6)' }}>
            {images.map((src, i) => {
              const hasSrc = src && src.trim() !== ''
              const isVid = isVideo(src)
              return (
                <button key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i) }}
                  className="relative flex-shrink-0 overflow-hidden rounded-xl flex items-center justify-center"
                  style={{
                    width: '62px', height: '52px',
                    background: hasSrc ? '#161514' : '#191817',
                    border: `1.5px solid ${i === activeImg ? '#e8577a' : 'rgba(48,44,41,0.7)'}`,
                    boxShadow: i === activeImg ? '0 0 10px rgba(232,87,122,0.28)' : 'none',
                    padding: '3px', cursor: 'pointer',
                    transition: 'transform 0.15s, border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  {hasSrc ? (
                    isVid ? (
                      <>
                        <video src={src} className="w-full h-full" style={{ objectFit: 'cover' }} muted playsInline preload="metadata" />
                        <div className="absolute inset-0 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(0,0,0,0.45)' }}>
                          <IconPlay size={12} />
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
                </button>
              )
            })}
          </div>
        )}

        {/* ══ CHI TIẾT COLLAPSIBLE ══ */}
        <div style={{ background: '#0f0e0e', borderTop: '1px solid rgba(44,40,38,0.5)' }}>
          <button
            className="w-full flex items-center justify-between px-5 py-3.5"
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
            onClick={(e) => { e.stopPropagation(); setInfoExpanded(v => !v) }}>
            <span className="text-xs tracking-[0.2em] uppercase font-medium"
              style={{ color: 'rgba(138,128,120,0.5)' }}>Chi Tiết</span>
            <span style={{
              color: 'rgba(138,128,120,0.45)', fontSize: '11px',
              display: 'inline-block',
              transform: infoExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.22s',
            }}>▼</span>
          </button>

          <div style={{
            overflow: 'hidden',
            maxHeight: infoExpanded ? '200px' : '0',
            opacity: infoExpanded ? 1 : 0,
            transition: 'max-height 0.25s ease, opacity 0.2s',
          }}>
            <div className="px-5 pb-4 pt-1">
              <p className="text-sm leading-relaxed text-rita-muted mb-3">{item.description}</p>
            </div>
          </div>

          <div className="flex justify-end px-5 pb-4 pt-1">
            <button onClick={onLike}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: liked ? 'rgba(232,87,122,0.14)' : 'rgba(36,33,31,0.9)',
                border: `1.5px solid ${liked ? '#e8577a' : 'rgba(48,44,41,0.9)'}`,
                boxShadow: liked ? '0 0 16px rgba(232,87,122,0.22)' : 'none',
                cursor: 'pointer', transition: 'transform 0.15s, background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.8)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1.15)'}>
              <IconHeartLg filled={liked} color={liked ? '#e8577a' : '#6a6060'} />
            </button>
          </div>
        </div>
      </div>

      {/* Keyframes cho image transition */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(1.04) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  )
}