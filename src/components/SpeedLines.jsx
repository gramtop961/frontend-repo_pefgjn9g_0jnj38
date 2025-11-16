import React from 'react'

export default function SpeedLines({ density = 10 }) {
  const lines = Array.from({ length: density })
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lines.map((_, i) => {
        const top = Math.random() * 100
        const delay = Math.random() * 2
        const duration = 3 + Math.random() * 2
        const scale = 0.6 + Math.random() * 1.2
        return (
          <span
            key={i}
            className="absolute h-px w-40 sm:w-64 bg-gradient-to-r from-transparent via-white/70 to-transparent will-change-transform"
            style={{
              top: `${top}%`,
              left: `-30%`,
              transform: `scale(${scale}) rotate(12deg)`,
              animation: `speedline ${duration}s linear ${delay}s infinite`,
              opacity: 0.15,
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.5))',
            }}
          />
        )
      })}
    </div>
  )
}
