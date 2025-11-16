import { useEffect, useRef } from 'react'

export default function Clients() {
  const trackRef = useRef(null)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const clone = el.innerHTML
    el.innerHTML = clone + clone
  }, [])

  const logos = new Array(8).fill(0)

  return (
    <section id="clients" className="relative py-16 bg-[#0b0b0b] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest text-white/70">Trusted by OEMs</h2>
      </div>
      <div className="mt-6 whitespace-nowrap will-change-transform">
        <div ref={trackRef} className="flex gap-10 animate-[scroll_25s_linear_infinite] px-6">
          {logos.map((_, i) => (
            <div key={i} className="w-44 h-16 rounded-xl bg-gradient-to-br from-[#161616] to-[#0f0f0f] border border-white/10 hover:border-[#7B1E1E]/40 transition" />
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
    </section>
  )
}
