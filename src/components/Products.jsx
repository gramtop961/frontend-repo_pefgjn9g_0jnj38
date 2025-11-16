import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const rawProducts = [
  'Engine mounts',
  'Powertrain mounts',
  'Body mounts',
  'Tuned vibration absorbers',
  'Trailing arm bushes',
  'Control arm bushes',
  'Leaf spring bushes',
  'Steering couplings',
  'Steering mounts',
  'Strut mounts',
  'Axle bumpers & bump stoppers',
  'Shock absorber bushes',
  'Exhaust hangers',
  'Propeller shaft mountings',
  'Other automotive rubber-to-metal bonded components',
]

const categories = [
  'All',
  'Mounts',
  'Bushes',
  'Couplings',
  'Absorbers',
  'Hangers',
  'Others',
]

export default function Products() {
  const [filter, setFilter] = useState('All')

  const items = useMemo(() => {
    return rawProducts.map((name, i) => ({
      id: i,
      name,
      type: name.toLowerCase().includes('bush')
        ? 'Bushes'
        : name.toLowerCase().includes('mount')
        ? 'Mounts'
        : name.toLowerCase().includes('hanger')
        ? 'Hangers'
        : name.toLowerCase().includes('absorber')
        ? 'Absorbers'
        : name.toLowerCase().includes('coupling')
        ? 'Couplings'
        : 'Others',
      desc: 'Premium OEM-grade component engineered for NVH performance and durability.',
    }))
  }, [])

  const filtered = items.filter((it) => (filter==='All' ? true : it.type === filter))

  return (
    <section id="products" className="relative py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Product Categories</h2>
          <div className="hidden md:flex gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-3 py-2 rounded-md text-sm border ${filter===c?'bg-[#7B1E1E] border-[#7B1E1E] text-white shadow-[0_0_20px_rgba(123,30,30,0.5)]':'border-white/10 text-white/80 hover:text-white'} transition`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sticky top-16 z-40 bg-black/90 backdrop-blur">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-3 py-2 rounded-md text-sm border whitespace-nowrap ${filter===c?'bg-[#7B1E1E] border-[#7B1E1E] text-white':'border-white/10 text-white/80'} transition`}>
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div key={p.id} layout initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:10}} whileHover={{ y:-4 }} className="group relative rounded-2xl border border-[#7B1E1E]/40 bg-gradient-to-br from-[#121212] to-[#0d0d0d] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#800000]/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />
                <div className="p-6">
                  <div className="h-36 rounded-xl bg-[linear-gradient(135deg,#1a1a1a,#0f0f0f)] border border-white/10 mb-4" />
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold">{p.name}</div>
                      <div className="text-white/60 text-sm">{p.desc}</div>
                    </div>
                    <a href="#details" className="px-3 py-1.5 text-sm rounded-md border border-[#7B1E1E] text-white bg-[#7B1E1E]/20 hover:bg-[#7B1E1E]/30 transition shadow-[0_0_20px_rgba(123,30,30,0.4)]">View More</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
