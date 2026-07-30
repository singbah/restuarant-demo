import { useNavigate } from "react-router-dom";
import { MapPin, ShoppingBag } from "lucide-react";

export default function ListingCard({ item }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${item.slug}`, { state: item })}
      className="group bg-white rounded-2xl border border-gray-100 shadow-2xs hover:shadow-md hover:border-gray-200 overflow-hidden cursor-pointer transition-all duration-200 flex flex-col justify-between"
    >
      {/* Product Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        {item.featured_image ? (
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={item.featured_image}
            loading="lazy"
            alt={item.product_name}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}

        {/* Optional Category Tag */}
        {item.category && (
          <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-[10px] font-semibold text-gray-700 px-2 py-0.5 rounded-full shadow-2xs capitalize">
            {item.category}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2">
        <div>
          <h2 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {item.product_name}
          </h2>

          {/* Market Location */}
          {item.market && (
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
              <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="truncate">{item.market}</span>
            </div>
          )}
        </div>

        {/* Price & Buy Button Row */}
        <div className="mt-1 pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
              Price
            </span>
            <span className="text-base font-bold text-emerald-600">
              $
              {Number(item.price || 0).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            type="button"
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all shadow-xs shadow-emerald-600/20"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
