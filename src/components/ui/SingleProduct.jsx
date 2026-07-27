import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { FileWarning, Home, Tags, ShoppingBag, User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import LoadingEffect from "../layouts/LoadingEffect";

export default function Product() {
  const { prodcutSlug } = useParams();
  const navigate = useNavigate(null);
  const [total, setTotal] = useState(1);

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
    <div className="max-w-6xl mx-auto p-4">
      <div className="h-screen m-4 flex flex-col justify-center items-center">
        {data && (
          <div className="w-full m-4">
            <img
              className="w-100 h-100 border mb-2 rounded-lg"
              src={data.featured_image}
              alt="photo"
            />
            <h1 className="text-2xl font-bold m-1">{data.product_name}</h1>
            <p className="mb-4 text-red-500">$ {data.price}</p>
            <div className="m-2 flex  flex-1 gap-4 mb-4 lg:w-200">
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
              <label>
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
            <a
              href={`https://wa.me/+231${data.vendor_phone}`}
              className="bg-green-500 px-6 py-2 rounded-lg text-white font-bold hover:bg-green-700 transition cursor-pointer"
            >
              <FaWhatsapp className="inline mr-3" size={25} />
              Order Now
            </a>
          </div>
        )}
      </div>
      <div className="z-20 sticky bottom-0 flex justify-around items-center border-t-2 pt-2 inset-0 border-gray-400 bg-white">
        <Home
          className="cursor-pointer hover:scale-103 transition hover:text-blue-500 "
          onClick={() => navigate("/market")}
        />
        <Tags className="cursor-pointer hover:scale-103 transition hover:text-blue-600" />
        <ShoppingBag className="cursor-pointer hover:scale-103 transition hover:text-blue-600" />
        <User
          onClick={() => navigate("/vendor-signup")}
          className="cursor-pointer hover:scale-103 transition hover:text-blue-600"
        />
      </div>
    </div>
  );
}
