import { motion } from 'framer-motion'
import { Factory, Truck, Cog, Wrench } from 'lucide-react'

const items = [
  { icon: Factory, title: 'Automotive OEMs', desc: 'Precision components for leading vehicle manufacturers.' },
  { icon: Truck, title: 'Heavy Vehicles', desc: 'Durable mounts and bushes for trucks and buses.' },
  { icon: Cog, title: 'Industrial Applications', desc: 'Isolation solutions for machinery and equipment.' },
  { icon: Wrench, title: 'Aftermarket Solutions', desc: 'Reliable replacements with OEM-grade performance.' },
]

export default function Industries() {
  return (
    <section id="industries" className="relative py-24 bg-[#0b0b0b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Industries We Serve</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="p-6 rounded-2xl bg-gradient-to-br from-[#121212] to-[#0d0d0d] border border-white/10 hover:border-[#7B1E1E]/50 transition">
              <div className="w-12 h-12 rounded-lg bg-[#7B1E1E]/20 border border-[#7B1E1E]/40 flex items-center justify-center text-[#ffeded] shadow-[0_0_20px_rgba(123,30,30,0.4)]">
                <Icon />
              </div>
              <div className="mt-4 font-bold text-lg">{title}</div>
              <div className="text-white/70 text-sm">{desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
