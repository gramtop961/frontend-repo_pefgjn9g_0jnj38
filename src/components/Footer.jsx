export default function Footer(){
  return (
    <footer className="bg-black border-t border-white/10 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-xl font-extrabold tracking-wider">INNOVA</div>
          <p className="text-white/70 mt-2 text-sm">Advanced automotive mounting and NVH solutions.</p>
        </div>
        <div>
          <div className="font-bold mb-2">Quick Links</div>
          <ul className="space-y-1 text-white/70">
            {['About','Products','Industries','Why Innova','Contact'].map((i)=>(
              <li key={i}><a href={`#${i.toLowerCase().split(' ').join('')}`} className="hover:text-[#ffeded] transition">{i}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-bold mb-2">Products</div>
          <ul className="space-y-1 text-white/70">
            {['Engine Mounts','Powertrain Mounts','Bushes','Exhaust Hangers','Propeller Shaft Mountings'].map((i)=>(
              <li key={i} className="hover:text-[#ffeded] transition">{i}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-bold mb-2">Connect</div>
          <div className="text-white/70 text-sm">info@innova-auto.com</div>
          <div className="text-white/70 text-sm">+1 (000) 000-0000</div>
        </div>
      </div>
      <div className="text-center text-white/50 text-sm mt-8">© {new Date().getFullYear()} Innova. All rights reserved.</div>
    </footer>
  )
}
