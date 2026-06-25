import HeroSection from "./components/hero"
import { FanIcon } from "lucide-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import AboutUs from "./components/about"
import ContactSection from "./components/contact"
import FindUs from "./components/map"
import Restuarants from "./components/restaurants"
import {FaFacebook, FaVoicemail, FaWhatsapp,
} from "react-icons/fa"



const navAStyle = "px-3 p-1 rounded-2xl text-sm font-bold focus:text-red-500 cursor-pointer"
const iconStyle = "inline"


export default function App() {
  const navigate = useNavigate()

  return (<div className="relative">
    <Routes>
      <Route path="/" element={<Restuarants />} />
      <Route path="/home" element={<HeroSection />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<ContactSection />} />
      <Route path="/find-us" element={<FindUs />} />
    </Routes>
  </div>)
}