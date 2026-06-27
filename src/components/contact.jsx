
import { FaWhatsapp, FaPhone, FaClock, FaLocationArrow } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import NavBar from "./layouts/navbar"


export default function ContactSection() {
  const navigate = useNavigate()

  return (<div className="relative h-screen">
    <NavBar/>
    <div className="relative h-screen flex flex-col justify-center items-center">
    <a
      className="bg-green-600 text-2xl p-4 font-bold px-6 m-10 rounded-2xl text-white shadow-xl shadow-black whitespace-nowrap cursor-pointer active:bg-green-800 transition hover:bg-green-700"
      href="https://wa.me/231880868634?text=Hi, I want to order"><FaWhatsapp className="inline" size={50} /> Order On WhatsApp</a>
    
    <article className="my-6">
      <h3
        className="text-xl font-bold text-red-700"
      ><FaLocationArrow className="inline" size={30} /> Find Us</h3>
      <p
        className="font-semibold"
      >Omega Oldfield community paynesville Liberia</p>
      <a
        onClick={() => navigate("/find-us")}
        className="text-blue-700 italic font-bold cursor-pointer active:bg-blue-900 hover:text-blue-800">click here</a>
    </article>

    <article className="my-4">
      <h1 className="text-xl font-bold text-red-700"><FaClock className="inline" size={30}/> Working Hour:</h1>
      <p className="font-semibold">Monday-Sunday: 9:00AM - 10:00PM</p>
    </article>

    <a
      className="m-4 p-2 border-4 rounded-2xl shadow-2xl border-green-700 text-xl font-bold text-green-600 cursor-pointer active:bg-green-800 active:text-white transition hover:bg-green-700 hover:text-white"
      href="#">
      <FaPhone
        className="inline text-green-600 " size={30} />
        +231777322000</a>
    </div>
  </div>)
}