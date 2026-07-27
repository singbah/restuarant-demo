import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../libs/api";

export default function ListingCard({ key, item }) {
  const navigate = useNavigate(null);
  return (
    <div
      key={key}
      className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden hover:scale-102 transition"
      onClick={() => navigate(`/product/${item.slug}`, { state: item })}
    >
      <img
        className="w-full h-40 object-cover"
        src={`${API_URL}products/photo?filename=${item.photo}`}
        alt="product image"
      />
      <div className="p-3">
        {" "}
        <h1 className="font-bold text-lg">{item.product_name}</h1>
        <p className="text-sm text-green-500">${item.price}</p>
        <p className="text-sm text-gray-500">{item.market}</p>
        <a
          className="mt-2 bg-green-500 text-white text-sm px-3 rounded block text-center hover:animate-pulse font-bold"
          href={`https://wa.me/${item.vendor_phone || "+231777322000"}`}
        >
          Buy
        </a>
      </div>
    </div>
  );
}
