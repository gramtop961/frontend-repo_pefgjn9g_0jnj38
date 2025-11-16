import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function Car({ className = '', color = '#7B1E1E', y = 0, scale = 1, blur = 0 }) {
  return (
    <motion.div
      style={{ y, scale, filter: `blur(${blur}px)` }}
      className={`absolute ${className}`}
    >
      <svg width="220" height="80" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <rect x="0" y="40" width="220" height="6" fill="url(#g)" opacity="0.6" />
        <path d="M15 45 C40 10, 160 10, 205 45 L205 55 L15 55 Z" fill="url(#g)" stroke="#9b1c1c" strokeOpacity="0.35" />
        <circle cx="55" cy="60" r="10" fill="#111" stroke="#666" />
        <circle cx="165" cy="60" r="10" fill="#111" stroke="#666" />
        <circle cx="55" cy="60" r="5" fill="#aaa" />
        <circle cx="165" cy="60" r="5" fill="#aaa" />
        <rect x="120" y="34" width="28" height="6" rx="3" fill="#b91c1c" opacity="0.9" />
      </svg>
    </motion.div>
  )
}

export default function ParallaxCars() {
  const { scrollYProgress } = useScroll()
  const yNear = useTransform(scrollYProgress, [0, 1], [0, -200])
  const yFar = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yDistant = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div className="pointer-events-none absolute inset-0">
      <Car className="left-[-40px] bottom-6" color="#991b1b" y={yNear} scale={1} blur={0.2} />
      <Car className="right-[-60px] bottom-12" color="#7B1E1E" y={yFar} scale={0.9} blur={0.6} />
      <Car className="left-[20%] bottom-[18%]" color="#5a0f0f" y={yDistant} scale={0.8} blur={1} />
    </div>
  )
}
