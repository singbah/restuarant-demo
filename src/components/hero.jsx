import heroPic from "../assets/hero.png"
import { site_data } from "../data/site_data"
import bgPhogo from "../data/restuarant/Glass-stout-hops.jpg"


export default function HeroSection() {

  function getOrederData() {
    for (let x = 0; x <= site_data.length; x++){
      console.log(site_data[x])
    }
  }
  return (<div
    style={{backgroundImage: `url(${bgPhogo})`}}
    className="bg-black text-white bg-cover bg-center h-screen flex flex-col justify-center items-center p-2">
    <h1 className="uppercase text-5xl font-bold m-3 p-1 text-center ">Welcome to</h1>
    <h1 className="uppercase text-3xl font-bold m-3 p-1 text-center">Monrovia Food Center</h1>
    <a
      href="https://wa.me/0880868634?text=Hello, I woul like to order from your menu"
      className="bg-orange-400 px-4 text-2xl p-3 border rounded-2xl shadow-2xl shadow-white hover:scale-110 hover:bg-amber-500 m-5 active:scale-110 font-semibold active:bg-orange-700">Order Now</a>
    
    <section className="absolute bottom-50 text-center border p-4 rounded-xl shadow-xl shadow-black text-l font-bold font-mono lg:static">
      <p >Open Monday-Sunday 9:00AM - 9:00PM</p>
      <p >0880868634 / 0777322000</p>
    </section>
  </div>) 
}