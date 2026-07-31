import { useState } from "react";
import useFetch from "../hooks/UseFetch";
import { Helmet } from "react-helmet";
import {
  FileWarning,
  Info,
  Minus,
  Plus,
  Store,
  Mail,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LoadingEffect from "../layouts/LoadingEffect";
import BottomNav from "./BottomNav";
import { api } from "../../../libs/api";
import AlertCard from "../layouts/AlertCard";
import { useParams } from "react-router-dom";

export default function Product() {
  // 1. Fixed parameter typo here
  const { productSlug } = useParams();

  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    title: "",
    status: "",
  });

  // 2. Fetch using correct slug
  const { data, loading, error } = useFetch(
    productSlug ? `/products/product/${productSlug}` : null,
  );

  const handleQuantityChange = (val) => {
    const newQty = Math.max(1, Number(val) || 1);
    setTotal(newQty);
  };

  const sendOrderNOw = async (productData) => {
    setIsLoading(true);
    const product_info = {
      quantity: total,
      money: productData.price * total,
      vendor_id: Number(productData.vendor_id).toFixed(4),
      product_name: productData.product_name,
      product_id: productData.id,
    };
    try {
      await api.post("/products/send_order", product_info);

      const phone = productData.vendor_phone || productData.phone;
      const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";

      const whatsappUrl = `https://wa.me/+231${cleanPhone}?text=${encodeURIComponent(
        `Hello, I want to order ${total} units of ${productData.product_name} ($${productData.price} each). Total: $${(total * productData.price).toFixed(2)}`,
      )}`;

      window.open(whatsappUrl, "_blank");
    } catch (err) {
      let errData = "Order could not be sent right now.";
      if (err.response) {
        errData = err.response?.data?.detail;
      }
      setMsg({
        isOpen: true,
        message: errData || "An error occurred",
        status: "error",
        title: "Order Failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) return <LoadingEffect />;

  if (error || !data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
          <FileWarning className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">
          Product Unavailable
        </h1>
        <p className="text-gray-500 text-sm max-w-sm">
          This product is no longer available or might have been removed by the
          seller.
        </p>
      </div>
    );
  }

  const totalPrice = (total * Number(data.price || 0)).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12">
      {/* 3. Open Graph Meta Tags for Social Sharing */}
      <Helmet>
        <title>{data.product_name} | Easi Tech Lr</title>
        <meta
          name="description"
          content={data.details || `Buy ${data.product_name} on Easi Tech Lr.`}
        />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={data.product_name} />
        <meta
          property="og:description"
          content={`Price: $${data.price} - ${data.details || "Order via WhatsApp"}`}
        />
        <meta property="og:image" content={data.featured_image} />
        <meta property="og:image:secure_url" content={data.featured_image} />
        <meta property="og:url" content={window.location.href} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.product_name} />
        <meta name="twitter:image" content={data.featured_image} />
      </Helmet>

      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        onClose={() => setMsg({ ...msg, isOpen: false })}
      />

      {isLoading && <LoadingEffect />}

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Product Image */}
            <div className="relative group overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
              <img
                className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-center transform transition duration-300 group-hover:scale-105"
                src={data.featured_image}
                loading="lazy"
                alt={data.product_name}
              />
            </div>

            {/* Right Column: Information & Actions */}
            <div className="flex flex-col justify-between h-full space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                  {data.product_name}
                </h1>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-emerald-600">
                    ${data.price}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    per unit
                  </span>
                </div>
              </div>

              {/* Quantity & Price Summary Card */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(total - 1)}
                      className="p-2 hover:bg-gray-50 text-gray-600 transition active:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={total}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="w-12 text-center text-sm font-semibold focus:outline-none border-x border-gray-200 py-1"
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(total + 1)}
                      className="p-2 hover:bg-gray-50 text-gray-600 transition active:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-600">
                    Total Price
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${totalPrice}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => sendOrderNOw(data)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <FaWhatsapp className="w-6 h-6" />
                <span>Order via WhatsApp</span>
              </button>

              {/* Product Details Section */}
              <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-sm">
                  <Info className="w-4 h-4 text-emerald-600" />
                  <span>Product Details</span>
                </div>
                <p className="text-sm text-emerald-950/80 leading-relaxed pl-6">
                  {data.details ||
                    "No additional details provided for this product."}
                </p>
              </div>

              {/* Seller's Info Card */}
              <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm border-b border-gray-100 pb-2">
                  <Store className="w-4 h-4 text-gray-500" />
                  <span>Seller Information</span>
                </div>
                <div className="space-y-1.5 text-xs text-gray-600 pl-1">
                  {data.vendor_name && (
                    <p className="font-medium text-gray-800">
                      {data.vendor_name}
                    </p>
                  )}
                  {data.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      {data.email}
                    </p>
                  )}
                  {(data.phone || data.vendor_phone) && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {data.vendor_phone || data.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
