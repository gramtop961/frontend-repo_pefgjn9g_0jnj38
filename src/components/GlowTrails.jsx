import React from 'react'

export default function GlowTrails({ count = 6 }) {
  const trails = Array.from({ length: count })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {trails.map((_, i) => {
        const size = 60 + Math.random() * 120
        const left = Math.random() * 100
        const top = Math.random() * 100
        const hue = 350 + Math.random() * 20
        const dur = 6 + Math.random() * 4
        const delay = Math.random() * 2
        return (
          <span
            key={i}
            className="absolute rounded-full will-change-transform"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: `radial-gradient(circle, rgba(200,50,50,0.18), rgba(0,0,0,0))`,
              filter: `blur(${size / 8}px)`,
              animation: `floaty ${dur}s ease-in-out ${delay}s infinite alternate`,
            }}
          />
        )
      })}
    </div>
  )
}
