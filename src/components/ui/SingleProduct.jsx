import { useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { FileWarning, Info } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import LoadingEffect from "../layouts/LoadingEffect";
import BottomNav from "./BottomNav";
import { api } from "../../../libs/api";
import AlertCard from "../layouts/AlertCard";

export default function Product() {
  const { prodcutSlug } = useParams();

  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    title: "",
    status: "",
  });

  const sendOrderNOw = async (data) => {
    setIsLoading(true);
    const product_info = {
      quantity: total,
      money: data.price * total,
      vendor_id: Number(data.vendor_id).toFixed(4),
      product_name: data.product_name,
      product_id: data.id,
    };
    try {
      const request = await api.post("/products/send_order", product_info);
      const result = request.data;
      let a = document.createElement("a");
      a.href = `https://wa.me/+231${data.vendor_phone}?text=I want ${total}pcs of ${data.product_name}`;
      a.click();
      console.log(result);
    } catch (error) {
      let errData = "Order Can't be sent right now";
      if (error.response) {
        errData = error.response?.data?.detail;
      }
      setMsg({
        isOpen: true,
        message: errData || "An error occur",
        status: "error",
        title: "Order Failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const { data, loading } = useFetch(`/products/product/${prodcutSlug}`);
  if (loading) return <LoadingEffect />;
  if (!data)
    return (
      <div>
        <FileWarning />
        <h1>this product is no longer aviable</h1>
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto p-4 md:w-150">
      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        onClose={() => setMsg({ isOpen: false })}
      />
      {isLoading && <LoadingEffect />}

      <div className="m-4 flex flex-col justify-center items-center">
        {data && (
          <div className="w-full m-4 ">
            <img
              className="w-full h-100 border mb-2 rounded-lg"
              src={data.featured_image}
              alt="photo"
            />
            <h1 className="text-2xl font-bold m-1">{data.product_name}</h1>
            <p className="mb-4 text-red-500 font-bold text-xl">
              $ {data.price}
            </p>
            <div className="m-2 flex  flex-1 gap-4 mb-6 lg:w-200 justify-between">
              <label>
                Quantity:{" "}
                <input
                  type="number"
                  min={1}
                  className="border w-20 p-1 rounded-lg"
                  defaultValue={1}
                  onChange={(e) => setTotal(e.target.value)}
                />
              </label>
              <label className="md:w-100">
                {" "}
                Total:{" $ "}
                <input
                  type="text"
                  readOnly
                  min={1}
                  className="border w-25 p-1 rounded-lg"
                  value={total * Number(data.price)}
                />
              </label>
            </div>

            <button
              onClick={() => sendOrderNOw(data)}
              className="bg-green-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition cursor-pointer w-full shadow-xl active:scale-105  shadow-black"
            >
              <FaWhatsapp className="inline mr-3" size={25} />
              Buy Now
            </button>

            <article className="mb-4 border p-2 mt-8 rounded bg-green-100">
              <p className="font-bold text-green-900 mb-4">
                <Info className="inline" /> Product Details
              </p>
              <span className="m-2 text-sm">
                {data.details || "No Details"}
              </span>
            </article>

            <article className="border rounded-lg p-2 text-sm">
              <h1 className="font-bold text-green-900 mb-1 text-lg">
                Seller's Info
              </h1>
              <p>{data.vendor_name}</p>
              <p>{data.email}</p>
              <p>{data.phone}</p>
            </article>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
