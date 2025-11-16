import { useState } from 'react'
import { Menu, X, Phone, Layers } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Industries', href: '#industries' },
  { label: 'Why Innova', href: '#why' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" onClick={(e)=>handleNav(e,'#home')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#800000] to-[#7B1E1E] flex items-center justify-center shadow-[0_0_20px_rgba(128,0,0,0.5)]">
              <Layers className="text-white" size={18} />
            </div>
            <span className="text-white font-extrabold tracking-wider text-lg">INNOVA</span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e)=>handleNav(e,item.href)} className="text-sm uppercase tracking-wide text-white/80 hover:text-white transition-colors">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={(e)=>handleNav(e,'#contact')} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#800000] to-[#7B1E1E] text-white px-4 py-2 rounded-md shadow-lg shadow-[#800000]/30 hover:shadow-[#800000]/50 transition">
              <Phone size={16} /> Contact
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-black/80 border-t border-white/10">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e)=>handleNav(e,item.href)} className="block text-white/90 py-2 border-b border-white/5">
                {item.label}
              </a>
            ))}
            <a href="#contact" onClick={(e)=>handleNav(e,'#contact')} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#800000] to-[#7B1E1E] text-white px-4 py-2 rounded-md">
              <Phone size={16} /> Contact
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
