import React from 'react'
import { motion } from 'framer-motion'

// Small stylized part badges that gently hover near a real car image.
// Positions are responsive using percentages so they sit around the car.

const float = (delay = 0) => ({
  initial: { y: 8, opacity: 0 },
  animate: {
    y: [8, -6, 8],
    opacity: 1,
    transition: {
      duration: 4.5,
      repeat: Infinity,
      delay,
      repeatType: 'mirror',
      ease: 'easeInOut',
    },
  },
})

export default function HoverParts() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Hood (front-left) */}
      <PartBadge style={{ left: '18%', top: '42%' }} variants={float(0.2)} label="Hood">
        <rect x="4" y="10" width="52" height="20" rx="6" fill="#ffffff"/>
        <rect x="8" y="14" width="44" height="6" rx="3" fill="#e6e6e6"/>
      </PartBadge>

      {/* Engine Mount (center) */}
      <PartBadge style={{ left: '42%', top: '46%' }} variants={float(0.6)} label="Engine Mount">
        <rect x="6" y="12" width="48" height="24" rx="10" fill="#1f1f1f" stroke="#4A4A4A"/>
        <circle cx="30" cy="24" r="6" fill="#7B1E1E"/>
      </PartBadge>

      {/* Suspension (front-right) */}
      <PartBadge style={{ right: '18%', top: '40%' }} variants={float(0.1)} label="Suspension">
        <rect x="26" y="8" width="8" height="34" rx="4" fill="#7B1E1E"/>
        {Array.from({length:6}).map((_,i)=> (
          <rect key={i} x="18" y={10 + i*5} width="24" height="4" rx="2" fill="#4A4A4A"/>
        ))}
      </PartBadge>

      {/* Front Wheel */}
      <PartBadge style={{ left: '30%', bottom: '18%' }} variants={float(0.4)} label="Front Wheel">
        <circle cx="30" cy="24" r="16" fill="#111" stroke="#555" strokeWidth="2"/>
        <circle cx="30" cy="24" r="10" fill="#1d1d1d" stroke="#777" strokeWidth="1"/>
      </PartBadge>

      {/* Rear Wheel */}
      <PartBadge style={{ right: '26%', bottom: '18%' }} variants={float(0.3)} label="Rear Wheel">
        <circle cx="30" cy="24" r="16" fill="#111" stroke="#555" strokeWidth="2"/>
        <circle cx="30" cy="24" r="10" fill="#1d1d1d" stroke="#777" strokeWidth="1"/>
      </PartBadge>

      {/* Door (mid-right) */}
      <PartBadge style={{ right: '22%', top: '50%' }} variants={float(0.5)} label="Door">
        <rect x="8" y="10" width="44" height="26" rx="6" fill="#ffffff" stroke="#d0d0d0"/>
        <rect x="12" y="14" width="36" height="10" rx="4" fill="#151515"/>
      </PartBadge>

      {/* Bumper (rear) */}
      <PartBadge style={{ right: '14%', top: '56%' }} variants={float(0.9)} label="Bumper">
        <rect x="6" y="16" width="48" height="12" rx="6" fill="#f6f6f6" stroke="#d6d6d6"/>
        <rect x="8" y="18" width="10" height="8" rx="3" fill="#7B1E1E"/>
      </PartBadge>
    </div>
  )
}

function PartBadge({ children, style, variants, label }) {
  return (
    <motion.div
      initial={variants.initial}
      animate={variants.animate}
      className="absolute"
      style={style}
      aria-hidden
    >
      <div className="relative">
        <svg width="64" height="48" viewBox="0 0 64 48" className="drop-shadow-[0_6px_20px_rgba(255,255,255,0.08)]">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glow)">
            {children}
          </g>
        </svg>
        <div className="mt-1 text-[11px] leading-none text-white/80 text-center font-medium bg-white/5 rounded-md px-2 py-1 backdrop-blur-sm border border-white/10">
          {label}
        </div>
      </div>
    </motion.div>
  )
}
