import { motion } from 'framer-motion'
import { Factory, Truck, Wrench, Cog } from 'lucide-react'

export default function Industries() {
  const items = [
    { icon: Factory, title: 'Automotive OEM', desc: 'Precision mounts and NVH components for global OEMs.' },
    { icon: Truck, title: 'Commercial Vehicles', desc: 'Heavy-duty mounts for trucks and buses.' },
    { icon: Wrench, title: 'Aftermarket', desc: 'Reliable replacements with OEM-grade tolerances.' },
    { icon: Cog, title: 'Industrial', desc: 'Custom rubber-to-metal solutions for machinery.' },
  ]

  return (
    <section id="industries" className="relative py-24 bg-gradient-to-b from-[#0b0b0b] to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(123,30,30,0.18),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10">Industries We Serve</motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0c0c0c] p-6"
            >
              <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#7B1E1E]/20 blur-3xl" />
              <motion.div
                className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                initial={{ rotate: -6 }}
                whileHover={{ rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <Icon className="text-white" />
              </motion.div>
              <div className="mt-4 font-bold text-lg">{title}</div>
              <div className="text-white/70 text-sm">{desc}</div>

              {/* subtle animated line under each card */}
              <motion.span
                className="absolute left-6 right-6 bottom-4 h-px bg-gradient-to-r from-transparent via-[#7B1E1E] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
