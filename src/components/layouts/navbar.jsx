import { useNavigate } from "react-router-dom"


const navAStyle = "px-3 p-1 rounded-xl text-sm border font-bold focus:text-red-500 cursor-pointer active:scale-105 active:text-red-500 transition"
const iconStyle = "inline"

export default function NavBar() {
  const navigate = useNavigate()
  return (<div>
    <header className="bg-black text-white sticky top-0 flex justify-center items-center py-3 gap-3 z-50">
      <nav className="flex justify-center items-center gap-4">
        <a onClick={() => navigate("/")} className={navAStyle}>Home</a>
        <a onClick={() => navigate("/menu")} className={navAStyle}>Blogs</a>
        <a onClick={() => navigate("/contact")} className={navAStyle}>Contact</a>
        <a onClick={() => navigate("/about-us")}
          className={navAStyle}>About</a>
      </nav>
    </header>
  </div>)
}