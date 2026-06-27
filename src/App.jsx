import { Route, Routes, useNavigate } from "react-router-dom"
import { FanIcon } from "lucide-react"
import {FaFacebook, FaVoicemail, FaWhatsapp,
} from "react-icons/fa"

import HeroSection from "./components/hero"
import ContactSection from "./components/contact"
import Restuarants from "./components/restaurants"
import LayoutScreen from "./components/layouts/Layout"



const navAStyle = "px-3 p-1 rounded-2xl text-sm font-bold focus:text-red-500 cursor-pointer"
const iconStyle = "inline"


export default function App() {
  const navigate = useNavigate()

  return (<div className="relative">
    <Routes>
      <Route path="/" element={<LayoutScreen />} />
      <Route path="/home" element={<HeroSection />} />
    </Routes>
  </div>)
}