import { motion } from 'framer-motion'
import SpeedLines from './SpeedLines'
import GlowTrails from './GlowTrails'
import ExplodedCar from './ExplodedCar'

export default function Hero() {
  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Removed 3D running car background for a clean focus on the white SUV exploded view */}

      {/* cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/60 to-black" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent" />

      {/* motion layers */}
      <GlowTrails count={7} />
      {/* Foreground exploded white SUV parts */}
      <ExplodedCar />
      <SpeedLines density={14} />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-3xl text-left">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Engineering Precision. Delivering Performance.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, delay: 0.1 }} className="mt-4 text-lg sm:text-xl text-white/80">
            Advanced Automotive Mounting & NVH Solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
            <a href="#products" className="px-6 py-3 rounded-md bg-gradient-to-r from-[#800000] to-[#7B1E1E] text-white font-semibold shadow-[0_0_30px_rgba(128,0,0,0.35)] hover:shadow-[0_0_40px_rgba(128,0,0,0.55)] transition">
              View Products
            </a>
            <a href="#contact" className="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur border border-white/20 transition">
              Contact Us
            </a>
          </motion.div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
            {[{label:'Years',value:25},{label:'OEM Clients',value:40},{label:'SKUs',value:1200}].map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Counter({ value, label }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }} className="text-3xl font-extrabold text-white">
        {value}+
      </motion.div>
      <div className="text-sm uppercase tracking-wider text-white/70">{label}</div>
    </motion.div>
  )
}
