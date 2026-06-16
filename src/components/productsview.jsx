import { useContext, useState } from "react"
import { ProductContext } from "./productContext"
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function ProductView() {
  const { product, viewProduct } = useContext(ProductContext);
  const [item, setItemData] = useState({})
  const navigate = useNavigate()

  const orderBtn = "bg-blue-600 px-4 rounded text-white font-bold hover:scale-110 active:bg-blue-800 active:scale-110 transition"
  const articleDesc = "flex flex-col justify-center items-center border p-2 rounded-2xl"

  if(product) {return (<div>

    <button
      onClick={() => navigate("/menu")}
    ><FaArrowAltCircleLeft className="mx-4 my-2 active:scale-110 cursor-pointer" size={25} /></button>
    <section className="p-4">
      <img
        className="h-120 border rounded-2xl shadow-2xl"
        src={product.photo} alt="product_photo" />
      <h1 className="text-center text-3xl font-bold p-2 text-amber-800 border m-4 rounded shadow-xs shadow-black">{product.name}</h1>
      <p className="italic font-semibold px-4 text-xl">{product.desc}</p>

      <section className="grid grid-cols-2 p-2  m-4 rounded gap-4">

        <article className={articleDesc}>
        <h3 className="font-bold text-xl font-serif">Whole</h3>
        <p className="text-gray-500 italic font-bold">{product.price }</p>
          <a
            href="https://wa.me/231880868634?text=I want to order"
          className={ orderBtn}>Order</a>  
      </article>
      
      <article className={articleDesc}>
        <h3 className="font-bold text-xl font-serif">Half</h3>
        <p className="text-gray-500 italic font-bold">{product.price}</p>
        <a
          href="https://wa.me/231880868634?text=I want to order"
        className={ orderBtn}>Order</a>  
      </article>
      </section>

    </section>
  </div>)
  } else {
    return (<div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-center font-bold p-4">Select from our menu</h1>
      <button
        onClick={() => navigate("/menu")}
        className={orderBtn}>Menu</button>
    </div>)
  }
}