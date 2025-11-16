import { motion } from 'framer-motion'
import { FlaskConical, BadgeCheck, Wrench, ShieldCheck, LineChart } from 'lucide-react'

const reasons = [
  { icon: FlaskConical, title: 'Advanced R&D', desc: 'Material science, NVH analysis, rapid prototyping.' },
  { icon: Wrench, title: 'Precision Engineering', desc: 'Tight tolerances and robust process controls.' },
  { icon: ShieldCheck, title: 'Quality Control Lab', desc: '100% inspection regimes and traceability.' },
  { icon: BadgeCheck, title: 'OEM Trusted', desc: 'Supplying leading automotive brands globally.' },
]

export default function Why() {
  return (
    <section id="why" className="relative py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Choose Innova</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#7B1E1E]/50 transition">
              <div className="w-12 h-12 rounded-lg bg-[#7B1E1E]/20 border border-[#7B1E1E]/40 flex items-center justify-center text-[#ffeded] shadow-[0_0_20px_rgba(123,30,30,0.4)]">
                <Icon />
              </div>
              <div className="mt-4 font-bold text-lg">{title}</div>
              <div className="text-white/70 text-sm">{desc}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <div className="h-2 w-full rounded bg-[#111] overflow-hidden">
            <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-[#7B1E1E] to-[#800000] shadow-[0_0_20px_rgba(123,30,30,0.6)]" />
          </div>
          <div className="mt-2 text-sm text-white/70 flex items-center gap-2"><LineChart size={16}/> Quality metrics consistently above industry standards</div>
        </div>
      </div>
    </section>
  )
}
