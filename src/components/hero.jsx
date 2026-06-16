import heroPic from "../assets/hero.png"
import { site_data } from "../data/site_data"
import bgPhogo from "../data/restuarant/Glass-stout-hops.jpg"
import NavBar from "./navbar"
import { useNavigate } from "react-router-dom"


export default function HeroSection() {
  const navigate = useNavigate()

  return (<div className="h-dvh relative">
    <NavBar/>
    <div
    style={{backgroundImage: `url(${bgPhogo})`}}
    className="bg-black text-white h-dvh bg-cover bg-center flex flex-col justify-center items-center p-2">
    
    <h1 className="uppercase text-5xl font-bold m-3 p-1 text-center ">Welcome to</h1>
    <h1 className="uppercase text-3xl font-bold m-3 p-1 text-center">Monrovia Food Center</h1>
    <a
      onClick={() => navigate("/menu")}
        className="bg-orange-400 px-4 text-2xl p-3 border rounded-2xl shadow-xl shadow-black hover:scale-110 hover:bg-amber-500 m-5 active:scale-110 font-semibold active:bg-orange-700">Order Now</a>
    </div>
  </div>) 
}