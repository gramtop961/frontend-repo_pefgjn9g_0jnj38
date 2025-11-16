import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black to-[#0b0b0b] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,0,0.2),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.03)]">
            <div className="w-full h-full bg-[conic-gradient(from_180deg_at_50%_50%,#7B1E1E,transparent,#800000,transparent)] opacity-20 rounded-2xl" />
          </motion.div>
          <div>
            <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-3xl sm:text-4xl font-extrabold tracking-tight">About Innova</motion.h2>
            <motion.p initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mt-4 text-white/80">
              Innova engineers and manufactures advanced automotive mounting solutions and NVH components. With decades of experience, we deliver precision, reliability, and performance for OEMs and industrial partners worldwide.
            </motion.p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { title: 'Quality', desc: 'ISO-grade quality systems' },
                { title: 'Reliability', desc: 'Proven OEM partnerships' },
                { title: 'Engineering', desc: 'FEA, NVH analysis, material testing' },
                { title: 'Innovation', desc: 'Rapid prototyping & R&D' },
              ].map((c)=> (
                <motion.div key={c.title} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold">{c.title}</div>
                  <div className="text-white/70 text-sm">{c.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
