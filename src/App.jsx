import { Route, Routes, useNavigate } from "react-router-dom"
import { FanIcon } from "lucide-react"
import {FaFacebook, FaVoicemail, FaWhatsapp,
} from "react-icons/fa"

import HomePage from "./components/pages/Home"
import Blogs from "./components/pages/Blog"
import PostsDetails from "./components/blog/PostDetails"
import ContactPage from "./components/pages/Contact"
import Analytics from "./components/admins/Analytics"
import { AdminLogin } from "./components/admins/auths"
import PostEditors from "./components/admins/PostEditor"
import ProductTable from "./components/layouts/ProductTable"
import Dashboard from "./components/admins/dashboard"
import Settings from "./components/admins/Settings"
import ContactMessage from "./components/admins/ContactMessages"
import FullBudgetPlaner from "./components/utilities/FullBudgetPlaner"
import PrivacyPolicy from "./components/pages/Policy"


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
      <Route path="/policy" element={<PrivacyPolicy />} />
      <Route path="/market" element={<ProductTable />} />
      <Route path="/budget/planer" element={<FullBudgetPlaner />} />

      <Route path="/admin/analytics" element={<Analytics />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/post/editor" element={<PostEditors />} />
      <Route path="/admin/messages" element={<ContactMessage />} />
    </Routes>
  </div>)
}