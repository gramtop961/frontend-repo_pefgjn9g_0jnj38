import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Simplified exploded-view car using SVG groups.
// Groups: chassis, wheels, shocks, engine mount, bushes.
// On load: parts animate outward (explode). On scroll: subtle parallax drift.

const partTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 14,
}

export default function ExplodedCar({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const driftX = useTransform(scrollYProgress, [0, 1], [0, 20])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  }

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`} aria-hidden>
      <motion.svg
        initial="hidden"
        animate="show"
        variants={container}
        width="100%"
        height="100%"
        viewBox="0 0 1200 600"
        className="max-w-[1200px] max-h-[600px] w-full h-auto"
      >
        <defs>
          <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#4A4A4A" />
          </linearGradient>
          <linearGradient id="maroon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="100%" stopColor="#7B1E1E" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Chassis */}
        <ExplodeGroup
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ ...partTransition, delay: 0.05 }}
        >
          <g transform="translate(200,220)">
            <rect x="0" y="0" width="800" height="120" rx="20" fill="url(#metal)" stroke="#595959" strokeWidth="2" />
            <rect x="120" y="-40" width="560" height="60" rx="18" fill="#111" opacity="0.7" />
            <rect x="140" y="-30" width="520" height="40" rx="12" fill="#1b1b1b" opacity="0.9" />
          </g>
        </ExplodeGroup>

        {/* Wheels */}
        <ExplodeGroup
          initial={{ x: -80, y: 80, opacity: 0 }}
          animate={{ x: -30, y: 40, opacity: 1 }}
          transition={partTransition}
          style={{ y: driftY }}
        >
          <Wheel cx={300} cy={380} />
          <Wheel cx={900} cy={380} />
        </ExplodeGroup>

        {/* Shock absorbers */}
        <ExplodeGroup
          initial={{ x: 80, y: -80, opacity: 0 }}
          animate={{ x: 40, y: -40, opacity: 1 }}
          transition={{ ...partTransition, stiffness: 140 }}
          style={{ x: driftX }}
        >
          <Shock x={270} y={260} angle={-25} />
          <Shock x={870} y={260} angle={25} />
        </ExplodeGroup>

        {/* Engine/Transmission Mount */}
        <ExplodeGroup
          initial={{ x: 0, y: -60, opacity: 0 }}
          animate={{ x: 0, y: -20, opacity: 1 }}
          transition={partTransition}
        >
          <EngineMount x={580} y={240} />
        </ExplodeGroup>

        {/* Bushes (NVH mounts) */}
        <ExplodeGroup
          initial={{ x: 0, y: 60, opacity: 0 }}
          animate={{ x: 0, y: 30, opacity: 1 }}
          transition={partTransition}
        >
          <Bush x={380} y={320} />
          <Bush x={820} y={320} />
          <Bush x={600} y={320} />
        </ExplodeGroup>

        {/* Labels (optional subtle) */}
        <g opacity="0.85" filter="url(#glow)">
          <Label x={300} y={470} text="Wheel Assembly" />
          <Label x={900} y={470} text="Wheel Assembly" />
          <Label x={585} y={215} text="Engine Mount" />
          <Label x={380} y={360} text="Bush" />
          <Label x={820} y={360} text="Bush" />
          <Label x={600} y={360} text="Bush" />
          <Label x={260} y={245} text="Shock Absorber" />
          <Label x={860} y={245} text="Shock Absorber" />
        </g>
      </motion.svg>
    </div>
  )
}

function ExplodeGroup({ children, initial, animate, transition, style }) {
  const variants = {
    hidden: initial || { opacity: 0, scale: 0.98 },
    show: animate || { opacity: 1, scale: 1 },
  }
  return (
    <motion.g
      variants={variants}
      transition={transition}
      style={style}
    >
      {children}
    </motion.g>
  )
}

function Wheel({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="62" fill="#0d0d0d" stroke="#2b2b2b" strokeWidth="4" />
      <circle cx={cx} cy={cy} r="48" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="16" fill="#7B1E1E" stroke="#a32b2b" />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x1 = cx + Math.cos(angle) * 12
        const y1 = cy + Math.sin(angle) * 12
        const x2 = cx + Math.cos(angle) * 44
        const y2 = cy + Math.sin(angle) * 44
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8a8a8a" strokeWidth="3" />
      })}
    </g>
  )
}

function Shock({ x, y, angle = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <rect x="-10" y="0" width="20" height="100" rx="10" fill="url(#maroon)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x="-16" y={10 + i * 10} width="32" height="6" rx="3" fill="#2A2A2A" />
      ))}
      <circle cx="0" cy="100" r="10" fill="#4A4A4A" />
    </g>
  )
}

function EngineMount({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-40" y="-20" width="80" height="40" rx="10" fill="#1f1f1f" stroke="#4A4A4A" />
      <circle cx="0" cy="0" r="12" fill="#7B1E1E" />
      <circle cx="0" cy="0" r="6" fill="#F2F2F2" />
      <rect x="-10" y="-50" width="20" height="30" rx="6" fill="#2A2A2A" />
      <rect x="-10" y="20" width="20" height="30" rx="6" fill="#2A2A2A" />
    </g>
  )
}

function Bush({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-18" y="-10" width="36" height="20" rx="10" fill="#2A2A2A" stroke="#555" />
      <circle cx="0" cy="0" r="6" fill="#7B1E1E" />
    </g>
  )
}

function Label({ x, y, text }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-8" y="-24" width={text.length * 7.2 + 16} height="28" rx="8" fill="#00000080" stroke="#7B1E1E66" />
      <text x="8" y="-6" fill="#F2F2F2" fontSize="14" fontFamily="Inter, system-ui, sans-serif">{text}</text>
    </g>
  )
}
