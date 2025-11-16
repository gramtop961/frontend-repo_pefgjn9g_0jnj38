import Navbar from './components/Navbar'
import CinematicHero from './components/CinematicHero'
import About from './components/About'
import Products from './components/Products'
import Industries from './components/Industries'
import Why from './components/Why'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <main>
        <CinematicHero />
        <About />
        <Products />
        <Industries />
        <Why />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
