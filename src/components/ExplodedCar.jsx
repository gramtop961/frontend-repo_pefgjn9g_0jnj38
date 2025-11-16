import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// White SUV exploded view with dismantled parts.
// Parts: body shell (white), hood, front/rear bumper, left/right doors, wheels, shocks, engine mount, bushes.
// On load they separate outward with spring. On scroll, subtle parallax drift.

const partSpring = { type: 'spring', stiffness: 140, damping: 16, mass: 0.8 }

export default function ExplodedCar({ className = '' }) {
  const { scrollYProgress } = useScroll()
  const driftY = useTransform(scrollYProgress, [0, 1], [0, -36])
  const driftX = useTransform(scrollYProgress, [0, 1], [0, 24])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
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
          <linearGradient id="maroon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#800000" />
            <stop offset="100%" stopColor="#7B1E1E" />
          </linearGradient>
          <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2A2A2A" />
            <stop offset="100%" stopColor="#4A4A4A" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Body shell (white SUV silhouette) */}
        <ExplodeGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...partSpring, delay: 0.05 }}
          style={{ y: driftY }}
        >
          <BodyShell x={200} y={150} />
        </ExplodeGroup>

        {/* Hood */}
        <ExplodeGroup
          initial={{ opacity: 0, x: 0, y: -20, rotate: 0 }}
          animate={{ opacity: 1, x: 40, y: -80, rotate: -6 }}
          transition={partSpring}
          style={{ y: driftY }}
        >
          <Hood x={330} y={220} />
        </ExplodeGroup>

        {/* Front bumper */}
        <ExplodeGroup
          initial={{ opacity: 0, x: 0, y: 10 }}
          animate={{ opacity: 1, x: 80, y: 60 }}
          transition={partSpring}
        >
          <Bumper x={310} y={295} width={180} side="front" />
        </ExplodeGroup>

        {/* Rear bumper */}
        <ExplodeGroup
          initial={{ opacity: 0, x: 0, y: 10 }}
          animate={{ opacity: 1, x: -80, y: 50 }}
          transition={partSpring}
        >
          <Bumper x={760} y={295} width={160} side="rear" />
        </ExplodeGroup>

        {/* Left door */}
        <ExplodeGroup
          initial={{ opacity: 0, x: -20, y: 0 }}
          animate={{ opacity: 1, x: -120, y: -10, rotate: -2 }}
          transition={{ ...partSpring, stiffness: 150 }}
          style={{ x: driftX }}
        >
          <Door x={520} y={220} side="left" />
        </ExplodeGroup>

        {/* Right door */}
        <ExplodeGroup
          initial={{ opacity: 0, x: 20, y: 0 }}
          animate={{ opacity: 1, x: 140, y: -6, rotate: 3 }}
          transition={{ ...partSpring, stiffness: 150 }}
          style={{ x: driftX }}
        >
          <Door x={640} y={220} side="right" />
        </ExplodeGroup>

        {/* Wheels */}
        <ExplodeGroup
          initial={{ opacity: 0, x: -60, y: 60 }}
          animate={{ opacity: 1, x: -20, y: 30 }}
          transition={partSpring}
        >
          <Wheel cx={360} cy={395} />
        </ExplodeGroup>
        <ExplodeGroup
          initial={{ opacity: 0, x: 60, y: 60 }}
          animate={{ opacity: 1, x: 20, y: 30 }}
          transition={partSpring}
        >
          <Wheel cx={880} cy={395} />
        </ExplodeGroup>

        {/* Shocks */}
        <ExplodeGroup
          initial={{ opacity: 0, x: -40, y: -50 }}
          animate={{ opacity: 1, x: -10, y: -10 }}
          transition={partSpring}
        >
          <Shock x={340} y={290} angle={-22} />
        </ExplodeGroup>
        <ExplodeGroup
          initial={{ opacity: 0, x: 40, y: -50 }}
          animate={{ opacity: 1, x: 10, y: -10 }}
          transition={partSpring}
        >
          <Shock x={900} y={290} angle={22} />
        </ExplodeGroup>

        {/* Engine mount */}
        <ExplodeGroup
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: -10 }}
          transition={partSpring}
        >
          <EngineMount x={600} y={265} />
        </ExplodeGroup>

        {/* Bushes */}
        <ExplodeGroup initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 18 }} transition={partSpring}>
          <Bush x={460} y={330} />
          <Bush x={740} y={330} />
          <Bush x={600} y={330} />
        </ExplodeGroup>
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
    <motion.g variants={variants} transition={transition} style={style}>
      {children}
    </motion.g>
  )
}

function BodyShell({ x = 200, y = 150 }) {
  // Simplified white SUV silhouette composed of body, roof, windows
  return (
    <g transform={`translate(${x},${y})`} filter="url(#softGlow)">
      {/* Main body */}
      <path d="M40 170 L120 120 L370 100 L560 110 L620 140 L700 200 L700 240 L40 240 Z" fill="#F2F2F2" stroke="#D6D6D6" strokeWidth="3" />
      {/* Roofline */}
      <path d="M150 120 L360 100 L540 110 L600 140" fill="none" stroke="#E9E9E9" strokeWidth="6" strokeLinecap="round" />
      {/* Window area */}
      <path d="M170 130 L355 112 L525 122 L575 145 L640 195 L170 195 Z" fill="#101010" opacity="0.7" stroke="#2B2B2B" />
      {/* A-pillar/B-pillar */}
      <rect x="240" y="125" width="10" height="70" fill="#1a1a1a" opacity="0.9" />
      <rect x="420" y="118" width="10" height="77" fill="#1a1a1a" opacity="0.9" />
      {/* Side skirt accent */}
      <rect x="90" y="215" width="560" height="10" rx="5" fill="#CCCCCC" opacity="0.7" />
      {/* Maroon accent stripe */}
      <rect x="100" y="228" width="520" height="6" rx="3" fill="url(#maroon)" opacity="0.8" />
    </g>
  )
}

function Hood({ x = 330, y = 220 }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width="140" height="40" rx="8" fill="#FFFFFF" stroke="#D0D0D0" />
      <rect x="8" y="8" width="124" height="10" rx="5" fill="#EDEDED" />
    </g>
  )
}

function Bumper({ x, y, width = 160, side = 'front' }) {
  const isFront = side === 'front'
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width={width} height="24" rx="10" fill="#F6F6F6" stroke="#D6D6D6" />
      <rect x={isFront ? 8 : width - 28} y="6" width="20" height="8" rx="4" fill="url(#maroon)" opacity="0.9" />
    </g>
  )
}

function Door({ x, y, side = 'left' }) {
  const flip = side === 'right' ? -1 : 1
  return (
    <g transform={`translate(${x},${y}) scale(${flip},1)`}>
      <rect x="-90" y="0" width="110" height="80" rx="10" fill="#FFFFFF" stroke="#D0D0D0" />
      <rect x="-80" y="10" width="90" height="30" rx="8" fill="#141414" opacity="0.75" />
      <rect x="-30" y="48" width="22" height="6" rx="3" fill="#CCCCCC" />
    </g>
  )
}

function Wheel({ cx, cy }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="64" fill="#0d0d0d" stroke="#2b2b2b" strokeWidth="4" />
      <circle cx={cx} cy={cy} r="50" fill="#1a1a1a" stroke="#5a5a5a" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="17" fill="#7B1E1E" stroke="#a32b2b" />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const x1 = cx + Math.cos(angle) * 12
        const y1 = cy + Math.sin(angle) * 12
        const x2 = cx + Math.cos(angle) * 45
        const y2 = cy + Math.sin(angle) * 45
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8a8a8a" strokeWidth="3" />
      })}
    </g>
  )
}

function Shock({ x, y, angle = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <rect x="-10" y="0" width="22" height="108" rx="11" fill="url(#maroon)" />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x="-17" y={12 + i * 11} width="34" height="6" rx="3" fill="url(#steel)" />
      ))}
      <circle cx="1" cy="108" r="10" fill="#4A4A4A" />
    </g>
  )
}

function EngineMount({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-42" y="-22" width="84" height="44" rx="12" fill="#1f1f1f" stroke="#4A4A4A" />
      <circle cx="0" cy="0" r="12" fill="#7B1E1E" />
      <circle cx="0" cy="0" r="6" fill="#F2F2F2" />
      <rect x="-10" y="-52" width="22" height="30" rx="6" fill="#2A2A2A" />
      <rect x="-10" y="22" width="22" height="30" rx="6" fill="#2A2A2A" />
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
