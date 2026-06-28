import { SearchCheckIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"


const navAStyle = "px-3 p-1 rounded-xl text-sm font-bold focus:text-red-500 cursor-pointer active:scale-105 active:text-red-500 transition"
const iconStyle = "inline"

export default function NavBar() {
  const navigate = useNavigate()
  return (<div>
    <header className="bg-black text-white sticky top-0 flex flex-col lg:flex-row justify-center items-center py-3 lg:gap-10 gap-2 z-50">
      <nav className="flex justify-center items-center gap-4">
        <a onClick={() => navigate("/")} className={navAStyle}>Home</a>
        <a onClick={() => navigate("/menu")} className={navAStyle}>Blogs</a>
        <a onClick={() => navigate("/contact")} className={navAStyle}>Contact</a>
        <a onClick={() => navigate("/about-us")}
          className={navAStyle}>About</a>
      </nav>
      <article className="flex justify-center items-center  relative">
        <input 
        className="w-full border p-1 rounded-xl"
        type="text" name="search" />
        <SearchCheckIcon className="absolute right-1 rounded-full cursor-pointer active:scale-110 transition" size={28}/>
      </article>
    </header>
  </div>)
}