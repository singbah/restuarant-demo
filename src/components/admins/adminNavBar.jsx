import { AdminContext } from "./adminContext"
import { useContext } from "react"
import { ArrowBigDownDash, ArrowBigDownIcon, ArrowDown, ArrowDown01, BookAlert, Calendar1Icon, Edit2Icon, HomeIcon, LogInIcon, LogOutIcon, MessageCircle, Search, Settings, Settings2 } from "lucide-react"
import { FaCalendar, FaMessage, FaRegMessage, FaSignalMessenger, FaUser } from "react-icons/fa6"
import { BsPeople } from "react-icons/bs"
import { GrAnalytics } from "react-icons/gr"
import { BiExit } from "react-icons/bi"
import { Link, NavLink, useNavigate } from "react-router-dom"

export default function NavigationBar() {
  const navStyle = "font-bold cursor-pointer hover:scale-105 transition"
  const { admin, Logout, errorMsg, setErrorMsg, successMsg, setSuccessMsg, refreshAdmin } = useContext(AdminContext)
  const iconStyle = "inline mx-2"
  const navAstyle = 'my-2 p-1 rounded hover:bg-green-500 focus:bg-green-500 cursor-pointer transition active:bg-green-300'


  const navigate = useNavigate()

  return (<header className=" bg-green-950  text-white flex flex-col p-4 w-1/5">
      
      <nav className="flex">
        <ul className="flex flex-col items-left">
          <NavLink to="/admin/analytics" className={navAstyle}><HomeIcon className={iconStyle}/> Home</ NavLink>
          <NavLink to="/admin/post/editor" className={navAstyle}><Edit2Icon className={iconStyle}/>Create Posts</ NavLink>
          <NavLink to="/admin/messages" className={navAstyle}><MessageCircle className={iconStyle}/>Messages</ NavLink>
          <NavLink to="/admin/settings" className={navAstyle}><Settings className={iconStyle} /> Setting</NavLink>
        </ul>
      </nav>

      <div className="rounded-2xl shadow shadow-green-500 bg-green-950 flex flex-col p-2 mt-4">
        {admin?<div className="gap-4">
          <img 
            className="w-20 h-20 border-2 p-2 rounded-full"
            src="photo.png" alt="admin" />
            <p>{admin.username}</p>
            <p>{admin.role}</p>
            <LogOutIcon onClick={Logout}/>
        </div>:<LogInIcon onClick={Logout} />}
        <h1 className="font-bold p-2 text-green-500">Monrovia Money</h1>
        <p className="text-gray-500 font-semibold text-sm">Paynesville City, Liberia</p>
      </div>
    </header>)
}