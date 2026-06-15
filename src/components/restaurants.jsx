import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Restuarants() {
  const navigate = useNavigate()
  return (<div className="bg-white h-screen text-black text-sm flex  flex-col  items-center overflow-y-auto overflow-x-hidden">
    <section className="">
      <h1 className="text-6xl text-center p-6 m-4 font-bold text-gray-900">Restuarants Website for You</h1>
    </section>

    <p className="m-4 text-xl font-semibold text-red-500 text-center">Stop loosing customers to restaurants with websites</p>
    
    <p className="font-bold text-gray-400 text-2xl text-center">Live in 24hrs. Mobile-friendly Whatsapp order $49.5</p>

    <a
      className="p-4 font-bold text-xl bg-green-700 text-white px-8 rounded-3xl m-8 shadow-2xl shadow-black"
      href="https://wa.me/231880868634?text=I want a website for my resturant"><FaWhatsapp className="inline" size={40} /> +231 880 868 634</a>
    
    <p className="text-xl text-gray-400 text-center">I Will Reply in 5mins. No Upfront payment</p>

    <h1 className="p-4 text-2xl">see my work</h1>
    <a
      className="italic bg-green-500 px-4 rounded-2xl shadow-xl shadow-black p-2 text-white font-bold active:bg-green-700"
      onClick={() => navigate("/home")}>click here</a>

    <section className="p-8">
      <h1 className="p-2 text-center text-3xl font-bold m-2 text-green-800">What You get for $49.5</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center p-6 rounded-2xl shadow-2xl flex flex-col border">
          <div className="text-4xl text-center m-4">
            📱
          </div>
          <h2 className="text-center font-bold text-2xl">Mobile First</h2>
          <p className="">90% of customers use phone. So your menu look perfect on line</p>
        </div>
    
        <div className="text-center p-6 rounded-2xl shadow-2xl flex flex-col border">
          <div className="text-4xl text-center m-4 text-green-600">
            💬
          </div>
          <h2 className="text-center font-bold text-2xl">Whatsapp Order</h2>
          <p className="">One tap customers order directly from whatsapp no extra app</p>
        </div>

        <div className="text-center p-6 rounded-2xl shadow-2xl flex flex-col border">
          <div className="text-4xl text-center m-4 text-green-600">
            🚀
          </div>
          <h2 className="text-center font-bold text-2xl">Live in 24hrs</h2>
          <p className="">Send me your menu and your site will be live tomorrow</p>
        </div>

        <div className="text-center p-6 rounded-2xl shadow-2xl flex flex-col border">
          <div className="text-4xl text-center m-4 text-green-600">
            🌍
          </div>
          <h2 className="text-center font-bold text-2xl">Free Domain Name</h2>
          <p className="">Your Business name with free .com</p>
        </div>
      </div>
    </section>

    <section className="py-16 px-6 text-center">
      <h1 className="text-xl font-bold m-8">Ready to go <a className="text-green-600">online</a></h1>
      <a
        className="text-white text-xl p-4 bg-green-600 px-4 shadow-2xl m-4 rounded-xl shadow-black font-mono"
        href="https://wa.me/231880868634?text=I want build a website for my restaurant"><FaWhatsapp className="inline" size={40}/> Whatsap Me Now</a>
    </section>

  </div>)
}