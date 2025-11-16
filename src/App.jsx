import Navbar from './components/Navbar'
import Hero from './components/Hero'
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
        <Hero />
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
