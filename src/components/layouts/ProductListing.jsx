import {
  ArrowLeftCircle,
  User,
  DollarSign,
  Home,
  Tags,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AlertCard from "./AlertCard";
import { useNavigate } from "react-router-dom";
import { api, API_URL } from "../../../libs/api";
import useFetch from "../hooks/UseFetch";
import { BsWhatsapp } from "react-icons/bs";

export default function ProductListing() {
  //   const [postListing, PostListing] = useState([]);
  const videoRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    productName: "",
    market: "",
    vendor_phone: "",
    price: "",
    category: "",
  });
  const [msg, setMsg] = useState({
    isOpen: false,
    title: "",
    status: "",
    action: "",
    message: "",
  });
  const navigate = useNavigate(null);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useFetch(`${API_URL}user/me`);
  //   start camera
  async function startCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoRef.current.srcObject = stream;
  }
  async function takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = 720;
    canvas.height = 720;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => setPhoto(blob), "image/jpeg");
    setPreview(canvas.toDataURL(videoRef.current));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    const slug = form.productName.toLocaleLowerCase().replace(" ", "_");
    const vendor_phone = form.vendor_phone || data.phone;
    fd.append("photo", photo);
    fd.append("product_name", form.productName);
    fd.append("vendor_phone", vendor_phone);
    fd.append("price", form.price);
    fd.append("market", form.market);
    fd.append("category", form.category);
    fd.append("slug", slug);
    try {
      const response = await api.post("/products/upload", fd);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.error(error.response?.data?.detail || "An error occur!!");
    } finally {
      setLoading(false);
    }
  };

  function goBackHome() {
    setMsg({
      isOpen: true,
      message: "Are you sure to discard and to back?",
      title: "Info",
      action: () => navigate("/market"),
      status: "info",
      linkTo: "Yes",
    });
  }

  useEffect(() => {
    refetch();
  }, []);

  if (!data) return null;
  return (
    <div className="max-w-lg mx-auto p-4 h-screen">
      <AlertCard
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        message={msg.message}
        action={msg.action}
        linkTo={msg.linkTo}
        onClose={() => setMsg({ isOpen: false })}
      />
      <div className="flex justify-between items-center mb-4 mt-4">
        <ArrowLeftCircle
          onClick={goBackHome}
          className="text-blue-600 cursor-pointer active:scale-105 transition"
        />
        <h1 className="text-2xl font-bold mb-4">Post to Market</h1>
      </div>
      <video
        src=""
        ref={videoRef}
        autoPlay
        className="w-full rounded-lg bg-black mb-2"
      ></video>
      <div className="flex gap-2 mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded" onClick={startCamera}>
          Start Camera
        </button>
        <button
          onClick={takePhoto}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Take Photo
        </button>
      </div>
      {photo && (
        <img
          className="h-50 border rounded-2xl mb-2 object-cover"
          src={preview}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
          <User />
          <input
            type="text"
            name="productName"
            className="outline-none w-full"
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
          />
        </label>
        <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
          <DollarSign />
          <input
            type="number"
            className="outline-none w-full"
            placeholder="Product Price"
            required
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </label>

        <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
          <BsWhatsapp className="text-green-600" />
          <input
            className="outline-none w-full"
            type="phone"
            defaultValue={(data && data.phone) || ""}
            placeholder="WhatsApp Number 077..."
            onChange={(e) => setForm({ ...form, vendor_phone: e.target.value })}
          />
        </label>
        <select
          onChange={(e) => setForm({ ...form, market: e.target.value })}
          className="border w-full p-2 rounded"
        >
          <option value="redlight">Red Light Market</option>
          <option value="duala">Duala Market</option>
          <option value="waterside">Water Side Market</option>
          <option value="oldroad">Old Road Market</option>
        </select>

        <select
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border w-full p-2 rounded"
        >
          <option value="">Coose Category</option>
          <option value="food">Food</option>
          <option value="fasion">Frasion</option>
          <option value="eletronic">Electronic</option>
        </select>
        <button
          disabled={loading}
          className="bg-green-600 py-3 rounded text-white w-full font-bold"
          type="submit"
        >
          Submit
        </button>
        {loading ? "Posting" : null}
      </form>
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
