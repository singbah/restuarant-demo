import { Link, SearchCheckIcon } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"


const navAStyle = "px-3 p-1 rounded-xl text-sm font-bold focus:text-red-500 cursor-pointer active:scale-105 active:text-red-500 transition"
const iconStyle = "inline"

export default function NavBar() {
  const navigate = useNavigate()
  return (<div>
    <header className="bg-black text-white sticky top-0 flex flex-col lg:flex-row justify-center items-center py-3 lg:gap-10 gap-2 z-50">
      <nav className="flex justify-center items-center gap-4 lg:text-2xl font-bold">
        <NavLink to={'/'} className="active:text-red-500 active:scale-110 transition">Home</NavLink>
        <NavLink to={'/blog'} className="active:text-red-500 active:scale-110 transition">Blog</NavLink>
        <NavLink to={'/contact'} className="active:text-red-500 active:scale-110 transition">Contact</NavLink>
        <NavLink to={'/market'} className="active:text-red-500 active:scale-110 transition">Market Stat</NavLink>
      </nav>
    </header>
  </div>)
}