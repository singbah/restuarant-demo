import {
  ArrowLeft,
  DollarSign,
  Camera,
  Upload,
  ShoppingBag,
  Info,
  Phone,
  Store,
  Grid,
  X,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AlertCard from "./AlertCard";
import { useNavigate } from "react-router-dom";
import { api } from "../../../libs/api";
import useFetch from "../hooks/UseFetch";
import LoadingEffect from "./LoadingEffect";
import BottomNav from "../ui/BottomNav";

export default function ProductListing() {
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    productName: "",
    market: "",
    vendor_phone: "",
    price: "",
    category: "",
    details: "",
  });

  const [msg, setMsg] = useState({
    isOpen: false,
    title: "",
    status: "",
    action: null,
    message: "",
    linkTo: "",
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error, refetch } = useFetch(`/user/me`);

  // Auto-refetch user data on mount
  useEffect(() => {
    refetch();
  }, []);

  // Set default phone number from user profile once loaded
  useEffect(() => {
    if (data?.phone) {
      setForm((prev) => ({ ...prev, vendor_phone: data.phone }));
    }
  }, [data]);

  // Clean up camera stream on component unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, [stream]);

  const stopCameraStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
        setPhoto(null);
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setMsg({
        isOpen: true,
        title: "Camera Access Error",
        message:
          "Unable to access device camera. Please upload an image file instead.",
        status: "error",
      });
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      setPhoto(blob);
    }, "image/jpeg");

    setPreview(canvas.toDataURL("image/jpeg"));
    stopCameraStream();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    stopCameraStream();
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      setMsg({
        isOpen: true,
        message: "Please select or take a photo of your product.",
        title: "Photo Required",
        status: "error",
      });
      return;
    }

    if (isNaN(Number(form.price)) || Number(form.price) <= 0) {
      setMsg({
        isOpen: true,
        message: "Please enter a valid numeric price.",
        title: "Invalid Price",
        status: "error",
      });
      return;
    }

    setIsLoading(true);

    const fd = new FormData();
    const slug = form.productName.trim().replaceAll(" ", "-").toLowerCase();
    const vendor_phone = form.vendor_phone || data?.phone || "";

    fd.append("photo", photo);
    fd.append("product_name", form.productName);
    fd.append("vendor_phone", vendor_phone);
    fd.append("price", form.price);
    fd.append("market", form.market);
    fd.append("category", form.category);
    fd.append("slug", slug);
    fd.append("details", form.details);

    try {
      const response = await api.post("/products/upload", fd);
      const result = response.data;

      setMsg({
        isOpen: true,
        message: result.detail || "Product posted successfully!",
        status: "success",
        title: "Product Listed",
      });

      // Reset Form State
      setForm({
        productName: "",
        market: "",
        vendor_phone: data?.phone || "",
        price: "",
        category: "",
        details: "",
      });
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
      setPhoto(null);
    } catch (err) {
      const errData =
        err.response?.data?.detail || "Uploading failed, please try again.";
      setMsg({
        isOpen: true,
        message: errData,
        title: "Upload Failed",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBackHome = () => {
    setMsg({
      isOpen: true,
      message: "Are you sure you want to discard this listing and leave?",
      title: "Discard Listing?",
      action: () => navigate("/market"),
      status: "info",
      linkTo: "Yes, Leave",
    });
  };

  if (loading) return <LoadingEffect />;

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Sign in Required
        </h1>
        <p className="text-xs text-gray-500 max-w-xs mb-6">
          You need an active vendor account to list items on the marketplace.
        </p>
        <button
          onClick={() => navigate("/vendor-signin")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition active:scale-95"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {isLoading && (
        <LoadingEffect
          title="Posting Product..."
          message="Uploading image and saving details."
        />
      )}

      <AlertCard
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        message={msg.message}
        action={msg.action}
        linkTo={msg.linkTo}
        onClose={() => setMsg({ ...msg, isOpen: false })}
      />

      {/* Top Sticky Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-xs">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={goBackHome}
            className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 transition active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            Post to Market
          </h1>
          <div className="w-8" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 pt-4">
        {/* Media Capture / Upload Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs mb-5 space-y-3">
          <div className="relative w-full h-72 rounded-xl bg-gray-900 overflow-hidden flex items-center justify-center border border-gray-100">
            {preview ? (
              <div className="relative w-full h-full">
                <img
                  src={preview}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(preview);
                    setPreview(null);
                    setPhoto(null);
                  }}
                  className="absolute top-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white p-1.5 rounded-full backdrop-blur-md transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : isCameraActive ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={takePhoto}
                  className="absolute bottom-4 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-lg border-2 border-white transition active:scale-95"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="text-center p-6 space-y-2">
                <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-xs text-slate-300 font-medium">
                  No photo selected yet
                </p>
                <p className="text-[11px] text-slate-500">
                  Take a photo or upload an image file
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={startCamera}
              className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition active:scale-95"
            >
              <Camera className="w-4 h-4" />
              <span>Use Camera</span>
            </button>

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold py-2.5 px-4 rounded-xl transition active:scale-95"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo</span>
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Product Details Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs space-y-4"
        >
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
            Product Details
          </h2>

          {/* Product Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Product Title
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <ShoppingBag className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                required
                value={form.productName}
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="e.g. Fresh Red Palm Oil (5 Liters)"
                onChange={(e) =>
                  setForm({ ...form, productName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Price Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Price ($ USD)
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <DollarSign className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                required
                value={form.price}
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="0.00"
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>

          {/* Market & Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Market Location
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
                <Store className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select
                  required
                  value={form.market}
                  onChange={(e) => setForm({ ...form, market: e.target.value })}
                  className="w-full text-xs text-gray-800 bg-transparent outline-none"
                >
                  <option value="">Select Market</option>
                  <option value="Red Light Market">Red Light Market</option>
                  <option value="Duala Market">Duala Market</option>
                  <option value="Water Side Market">Water Side Market</option>
                  <option value="Old Road Market">Old Road Market</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">
                Category
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
                <Grid className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full text-xs text-gray-800 bg-transparent outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="food">Food & Produce</option>
                  <option value="fashion">Fashion & Clothing</option>
                  <option value="phone">Phones & Mobile</option>
                  <option value="electronic">Electronics</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>
          </div>

          {/* WhatsApp Phone Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              WhatsApp Phone Number
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <input
                type="tel"
                required
                value={form.vendor_phone}
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="Phone number e.g. 077000000"
                onChange={(e) =>
                  setForm({ ...form, vendor_phone: e.target.value })
                }
              />
            </div>
          </div>

          {/* Details Textarea */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Description / Specifications
            </label>
            <div className="flex items-start gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <Info className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <textarea
                required
                rows={3}
                value={form.details}
                onChange={(e) => setForm({ ...form, details: e.target.value })}
                className="w-full text-xs text-gray-800 bg-transparent outline-none resize-none placeholder:text-gray-400"
                placeholder="Provide details about quality, origin, quantity, or delivery notes..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Publish Listing</span>
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
}
