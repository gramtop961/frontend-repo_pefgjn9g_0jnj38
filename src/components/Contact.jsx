import { useState } from 'react'
import { Phone, MessageCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    alert('Thanks! We will get back to you shortly.')
  }

  return (
    <section id="contact" className="relative py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Us</h2>
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <form onSubmit={onSubmit} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div>
              <label className="block text-sm mb-1 text-white/70">Name</label>
              <input name="name" value={form.name} onChange={onChange} className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[#7B1E1E]" required />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Email</label>
              <input type="email" name="email" value={form.email} onChange={onChange} className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[#7B1E1E]" required />
            </div>
            <div>
              <label className="block text-sm mb-1 text-white/70">Message</label>
              <textarea name="message" value={form.message} onChange={onChange} rows={4} className="w-full bg-black/50 border border-white/10 rounded-md px-3 py-2 text-white outline-none focus:ring-2 focus:ring-[#7B1E1E]" required />
            </div>
            <button className="px-6 py-3 rounded-md bg-gradient-to-r from-[#800000] to-[#7B1E1E] text-white font-semibold shadow-[0_0_30px_rgba(128,0,0,0.35)] hover:shadow-[0_0_40px_rgba(128,0,0,0.55)] transition">Send Message</button>
          </form>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop')] bg-cover min-h-[320px]">
            <div className="w-full h-full bg-black/50" />
          </div>
        </div>
      </div>

      <a href="https://wa.me/" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-105 transition" aria-label="WhatsApp">
        <MessageCircle />
      </a>
      <a href="tel:+10000000000" className="fixed bottom-6 right-20 bg-[#7B1E1E] text-white p-4 rounded-full shadow-lg hover:scale-105 transition" aria-label="Call">
        <Phone />
      </a>
    </section>
  )
}
