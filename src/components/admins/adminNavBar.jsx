import { AdminContext } from "./adminContext"
import { useContext } from "react"
import { ArrowBigDownDash, ArrowBigDownIcon, ArrowDown, ArrowDown01, BookAlert, Calendar1Icon, Edit2Icon, HomeIcon, LogInIcon, LogOutIcon, MessageCircle, Search, Settings, Settings2 } from "lucide-react"
import { FaCalendar, FaMessage, FaRegMessage, FaSignalMessenger, FaUser } from "react-icons/fa6"
import { BsPeople } from "react-icons/bs"
import { GrAnalytics } from "react-icons/gr"
import { BiExit } from "react-icons/bi"

export default function NavigationBar({tapFunc}) {
  const navStyle = "font-bold cursor-pointer hover:scale-105 transition"
  const { admin, Logout, errorMsg, setErrorMsg, successMsg, setSuccessMsg, refreshAdmin } = useContext(AdminContext)
  const iconStyle = "inline mx-2"
  const navAstyle = 'my-2 p-1 rounded hover:bg-green-500 focus:bg-green-500 cursor-pointer transition active:bg-green-300'


  return (<header className=" bg-green-950  text-white flex flex-col p-4 w-1/5">
      
      <nav className="flex">
        <ul className="flex flex-col items-left">
          <a onClick={() =>tapFunc(null)} className={navAstyle}><HomeIcon className={iconStyle}/> Home</a>
          <a onClick={() => tapFunc("edit-post")} className={navAstyle}><Edit2Icon className={iconStyle}/>Create Posts</a>
          <a onClick={() =>tapFunc("convos")} className={navAstyle}><MessageCircle className={iconStyle}/>Comments</a>
          <a onClick={() => tapFunc("leads")} className={navAstyle}><BsPeople className={iconStyle}/> Leads</a>
          <a onClick={() => tapFunc("customer")} className={navAstyle}><FaUser className={iconStyle}/> Customers</a>
          <a onClick={() => tapFunc("analytic")} className={navAstyle}><GrAnalytics className={iconStyle}/> Analytics</a>
          <a onClick={() => tapFunc("settings")} className={navAstyle}><Settings className={iconStyle} /> Setting</a>
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
        <h1 className="font-bold p-2 text-green-500">Monrovia Food Center</h1>
        <p className="text-gray-500 font-semibold text-sm">Paynesville City, Liberia</p>
      </div>
    </header>)
}