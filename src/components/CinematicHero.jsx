import React, { useMemo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Cinematic video hero that plays pre-rendered 3D segments if URLs are provided via env.
// Segments supported (60fps, 16:9): rotate, explode, engine, suspension, reassembly
// Env keys (mp4/webm recommended):
// - VITE_SEG_ROTATE_MP4 / VITE_SEG_ROTATE_WEBM
// - VITE_SEG_EXPLODE_MP4 / VITE_SEG_EXPLODE_WEBM
// - VITE_SEG_ENGINE_MP4 / VITE_SEG_ENGINE_WEBM
// - VITE_SEG_SUSPENSION_MP4 / VITE_SEG_SUSPENSION_WEBM
// - VITE_SEG_REASSEMBLY_MP4 / VITE_SEG_REASSEMBLY_WEBM
// Optional: VITE_VIDEO_ALPHA = 'true' for transparent WebM with alpha

const titleMap = {
  rotate: 'SUV Orbit',
  explode: 'Exploded View',
  engine: 'Engine Breakdown',
  suspension: 'Suspension Breakdown',
  reassembly: 'Reassembly',
}

export default function CinematicHero() {
  const alpha = (import.meta.env.VITE_VIDEO_ALPHA || '').toString().toLowerCase() === 'true'

  const segments = useMemo(() => {
    const get = (key) => import.meta.env[key]
    const s = [
      { key: 'rotate', mp4: get('VITE_SEG_ROTATE_MP4'), webm: get('VITE_SEG_ROTATE_WEBM') },
      { key: 'explode', mp4: get('VITE_SEG_EXPLODE_MP4'), webm: get('VITE_SEG_EXPLODE_WEBM') },
      { key: 'engine', mp4: get('VITE_SEG_ENGINE_MP4'), webm: get('VITE_SEG_ENGINE_WEBM') },
      { key: 'suspension', mp4: get('VITE_SEG_SUSPENSION_MP4'), webm: get('VITE_SEG_SUSPENSION_WEBM') },
      { key: 'reassembly', mp4: get('VITE_SEG_REASSEMBLY_MP4'), webm: get('VITE_SEG_REASSEMBLY_WEBM') },
    ]
    return s
      .map((seg) => ({ ...seg, hasSrc: !!(seg.webm || seg.mp4) }))
      .filter((seg) => seg.hasSrc)
  }, [])

  const [activeIndex, setActiveIndex] = useState(0)
  const videoRef = useRef(null)

  const hasAny = segments.length > 0

  useEffect(() => {
    // Autoplay the first available segment if any
    if (hasAny && videoRef.current) {
      videoRef.current.currentTime = 0
      const play = async () => {
        try { await videoRef.current.play() } catch (_) {}
      }
      play()
    }
  }, [hasAny, activeIndex])

  if (!hasAny) return null

  const active = segments[activeIndex]

  return (
    <section aria-label="Cinematic 3D Hero" className="relative h-[100svh] w-full overflow-hidden">
      {/* Background: pure black with subtle vignette gradient */}
      <div className="absolute inset-0 bg-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),rgba(0,0,0,0.6))]" />

      {/* Video layer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="absolute inset-0 flex items-center justify-center">
        <video
          key={active.key}
          ref={videoRef}
          className={`w-full h-full object-contain ${alpha ? 'mix-blend-normal' : ''}`}
          playsInline
          muted
          loop
          preload="auto"
        >
          {active.webm && <source src={active.webm} type="video/webm" />}
          {active.mp4 && <source src={active.mp4} type="video/mp4" />}
        </video>
      </motion.div>

      {/* Top gradient for UI readability */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Controls */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
        <div className="flex flex-wrap items-center gap-2 bg-white/5 border border-white/10 backdrop-blur rounded-xl p-2 w-full md:w-auto">
          {segments.map((seg, i) => (
            <button
              key={seg.key}
              onClick={() => setActiveIndex(i)}
              className={`${i === activeIndex ? 'bg-white/15 text-white' : 'text-white/75 hover:text-white hover:bg-white/10'} transition px-3 py-2 rounded-lg text-sm font-medium`}
            >
              {titleMap[seg.key] || seg.key}
            </button>
          ))}
          <div className="flex items-center gap-2 pl-2 ml-2 border-l border-white/10">
            <button
              onClick={() => {
                if (!videoRef.current) return
                if (videoRef.current.paused) videoRef.current.play()
                else videoRef.current.pause()
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white"
            >
              Play/Pause
            </button>
            <button
              onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0 }}
              className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white"
            >
              Restart
            </button>
          </div>
        </div>
        <div className="mt-3 text-white/70 text-xs">
          60fps • 16:9 • Cinematic 3D render
        </div>
      </div>
    </section>
  )
}
