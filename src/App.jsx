import HeroSection from "./components/hero"
import { FanIcon } from "lucide-react"
import { Route, Routes } from "react-router-dom"
import MenuSection from "./components/menu"
import AboutUs from "./components/about"
import ContactSection from "./components/contact"
import FindUs from "./components/map"
import { FaFacebook, FaVoicemail, FaWhatsapp } from "react-icons/fa"

const navAStyle = "px-3 p-1 rounded-2xl text-sm font-bold focus:text-red-500"
const iconStyle = "inline"


export default function App() {
  return (<div className="relative">
    <header className="bg-black text-white sticky top-0 flex justify-center items-center py-3 gap-3 z-50">
      <nav className="flex justify-center items-center gap-2">
        <a href="/" className={navAStyle}>Home</a>
        <a href="/menu" className={navAStyle}>Menu</a>
        <a href="/contact" className={navAStyle}>Contact</a>
        <a href="about-us" className={navAStyle}>About</a>

      </nav>
    </header>

    <Routes>
      <Route path="/" element={<HeroSection />} />
      <Route path="/menu" element={<MenuSection />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/find-us" element={<FindUs />} />
    </Routes>
    

    <footer className="bg-black text-white sticky bottom-0 flex justify-center items-center p-2 gap-3">
      <a
        className="text-green-500 font-bold p-3 active:text-green-900 transition"
        href="https://wa.me/0880868634"><FaWhatsapp className={iconStyle} /> WhatsApp</a>
      <a
        className="text-blue-500 font-bold p-3 active:text-blue-900 transition"
        href="#"><FaFacebook className={iconStyle} /> FaceBook</a>
      <a
        className="text-red-500 font-bold p-3 active:text-red-900 transition"
        href="#"><FaVoicemail className={iconStyle} /> Email</a>
    </footer>
  </div>)
}