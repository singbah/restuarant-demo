import { Route, Routes, useNavigate } from "react-router-dom"
import { FanIcon } from "lucide-react"
import {FaFacebook, FaVoicemail, FaWhatsapp,
} from "react-icons/fa"

import HomePage from "./components/pages/Home"
import Blogs from "./components/pages/Blog"
import PostsDetails from "./components/blog/PostDetails"
import ContactPage from "./components/pages/Contact"


const navAStyle = "px-3 p-1 rounded-2xl text-sm font-bold focus:text-red-500 cursor-pointer"
const iconStyle = "inline"


export default function App() {
  const navigate = useNavigate()

  return (<div className="relative">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<Blogs />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/post/:postSlug" element={<PostsDetails />} />
    </Routes>
  </div>)
}