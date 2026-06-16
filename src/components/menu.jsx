import NavBar from "./navbar"
import { site_data } from "../data/site_data"
import ProductView from "./productsview"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "./productContext"

export default function MenuSection() {
  const { viewProduct, product} = useContext(ProductContext)
  const navigate = useNavigate()
  
  return (
    <div className="relative h-screen bg-black">
      <NavBar/>
    <div className=" bg-black text-white text-sm flex flex-col items-center overflow-y-auto lg:mx-40">
    
        <h1 className="text-2xl p-1 m-3 font-bold border w-1/2 rounded-ee-2xl rounded-l-2xl text-center">Food Menu</h1>
    <div className="flex flex-col justify-center items-center p-4 border m-1 rounded-2xl bg-amber-950">
      <section className="grid grid-cols-2 gap-2">
        {site_data.map((data, index) => <div
          className="border flex flex-col w-full justify-center items-center rounded-2xl"
          key={index}>
          <img
            onClick={() => viewProduct(data) }
            className="h-2/1 rounded-2xl"
            src={data.photo} alt="food photo here" />
          <h1 className="text-xl font-bold py-1">{data.name}</h1>
          <p className="text-sm italic text-red-500 font-extrabold p-1">Price: {data.price}</p>
          <p className="p-2 text-gray-400 italic">{data.desc}</p>
          <a
            onClick={() => viewProduct(data) }
            className="bg-amber-500 px-4 m-2 rounded p-1 font-semibold active:scale-110 active:bg-amber-800">Order Now</a>
        </div>)}
      </section>
    </div>

    <h1 className="text-2xl p-1 m-3 font-bold border w-1/2 rounded-ee-2xl rounded-l-2xl text-center">Drinks Menu</h1>
    <div className="flex flex-col justify-center items-center p-4 border m-1 rounded-2xl bg-amber-950">
      <section className="grid grid-cols-2 gap-2">
        {site_data.map((data, index) => <div
          className="border flex flex-col w-full justify-center items-center rounded-2xl"
          key={index}>
          <img
            onClick={() => viewProduct(data) }
            className="h-2/1 rounded-2xl"
            src={data.photo} alt="food photo here" />
          <h1 className="text-xl font-bold py-1">{data.name}</h1>
          <p className="text-sm italic text-red-500 font-extrabold p-1">Price: {data.price}</p>
          <p className="p-2 text-gray-400 italic">{data.desc}</p>
          <a
            className="bg-amber-500 px-4 m-2 rounded p-1 font-semibold active:scale-110 active:bg-amber-800">Order Now</a>
        </div>)}
      </section>
    </div>
    </div>
  </div>)
}