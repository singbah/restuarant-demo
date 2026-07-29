import {
  ArrowLeftCircle,
  DollarSign,
  Camera,
  Upload,
  ShoppingBasket,
  Info,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import AlertCard from "./AlertCard";
import { useNavigate } from "react-router-dom";
import { api } from "../../../libs/api";
import useFetch from "../hooks/UseFetch";
import { BsWhatsapp } from "react-icons/bs";
import LoadingEffect from "./LoadingEffect";
import BottomNav from "../ui/BottomNav";

export default function ProductListing() {
  // const [postListing, PostListing] = useState([]);
  const videoRef = useRef(null);
  const fileRef = useRef(null);
  const [cameraRef, setCameraRef] = useState(false);
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
    action: "",
    message: "",
  });

  const navigate = useNavigate(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error, refetch } = useFetch(`/user/me`);
  //   start camera

  async function startCamera() {
    setPreview(null);
    setPhoto(null);
    setCameraRef(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
    videoRef.current.srcObject = stream;
  }

  async function takePhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 490;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => setPhoto(blob), "image/jpeg");
    setPreview(canvas.toDataURL(videoRef.current));
    setCameraRef(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!Number(form.price)) {
      setMsg({
        isOpen: true,
        message: "Price Cant't contain letter",
        title: "Post Failed",
        status: "error",
      });
      setIsLoading(false);
      return;
    }

    const fd = new FormData();
    const slug = form.productName.replaceAll(" ", "-");
    const vendor_phone = form.vendor_phone || data.phone;
    fd.append("photo", photo);
    fd.append("product_name", form.productName);
    fd.append("vendor_phone", vendor_phone);
    fd.append("price", form.price);
    fd.append("market", form.market);
    fd.append("category", form.category);
    fd.append("slug", slug);
    fd.append("details", form.details);
    console.log(slug.toLocaleLowerCase());
    setIsLoading(false);
    try {
      const response = await api.post("/products/upload", fd);
      const result = response.data;
      console.log(result);
      setMsg({
        isOpen: true,
        message: result.detail,
        status: "success",
        title: "Posted",
      });
      setForm({ price: 0, productName: "", details: "" });
      URL.revokeObjectURL(preview);
      setPreview(null);
      setPhoto(null);
    } catch (error) {
      let errData = "An error occur!!";
      if (error.response) {
        errData = error.response?.data?.detail || "An error occur!!";
      }
      setMsg({
        isOpen: true,
        message: "Uploading failed please try again",
        title: "Upload failed",
        status: "error",
      });
    } finally {
      setIsLoading(false);
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

  useMemo(() => {
    refetch();
  }, []);

  if (loading) return <LoadingEffect />;

  if (error || !data)
    return (
      <div className="h-screen flex flex-col justify-center items-center ">
        <h1 className="font-bold text-2xl text-center mb-4">
          You must login to access this page
        </h1>
        <a
          href="/vendor-signin"
          className="text-blue-600 font-bold active:scale-105 cursor-pointer transition border px-4 rounded"
        >
          Sign In
        </a>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-4 h-screen">
      <div className="h-screen">
        {isLoading && <LoadingEffect />}
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
        {photo ? (
          <img className="w-100 rounded-lg bg-black mb-2 h-80" src={preview} />
        ) : (
          <div className="relative">
            <video
              src=""

              ref={videoRef}
              autoPlay
              className="w-100 h-80 rounded-lg bg-black mb-2 "
            ></video>
            <button
              onClick={takePhoto}
              style={{ display: cameraRef ? "block" : "none" }}
              className=" absolute bg-transparent text-red-700 border-4 p-4 rounded-full bottom-4 right-35"
            >
              <Camera />
            </button>
          </div>
        )}
        <div className="flex gap-2 mb-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={startCamera}
          >
            <Camera />
          </button>

          <label className="border justify-center items-center flex px-2 rounded-lg bg-green-500 text-white">
            <Upload />
            <input
              ref={fileRef}
              type="file"
              className="hidden"
              onChange={(e) => {
                setPreview(URL.createObjectURL(e.target.files[0]));
                setPhoto(e.target.files[0]);
              }}
            />
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <ShoppingBasket />
            <input
              type="text"
              name="productName"
              required
              value={form.productName}
              className="outline-none w-full"
              placeholder="Product Name"
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />
          </label>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <DollarSign />
            <input
              type="text"
              value={form.price}
              className="outline-none w-full"
              placeholder="Product Price"
              required
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </label>

          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Info className="text-green-600" />
            <textarea
              className="outline-none w-full"
              required
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder="Please provide a details description about your product"
            ></textarea>
          </label>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <BsWhatsapp className="text-green-600" />
            <input
              className="outline-none w-full"
              type="phone"
              defaultValue={(data && data.phone) || ""}
              readOnly
              placeholder="WhatsApp Number 077..."
              onChange={(e) =>
                setForm({ ...form, vendor_phone: e.target.value })
              }
            />
          </label>
          <select
            onChange={(e) => setForm({ ...form, market: e.target.value })}
            className="border w-full p-2 rounded"
          >
            <option value="redlight">Select Market place</option>
            <option value="Red Light Market">Red Light Market</option>
            <option value="Duala Market">Duala Market</option>
            <option value="Water Side">Water Side Market</option>
            <option value="Old Road">Old Road Market</option>
          </select>

          <select
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border w-full p-2 rounded"
          >
            <option value="">Coose Category</option>
            <option value="food">Food</option>
            <option value="fashion">Fashion</option>
            <option value="phone">Phone</option>
            <option value="eletronic">Electronic</option>
            <option value="sports">Sports</option>
          </select>
          <button
            disabled={isLoading}
            className="bg-green-600 py-3 rounded text-white w-full font-bold"
            type="submit"
          >
            Submit
          </button>
          {isLoading ? "Posting" : null}
        </form>
      </div>
      <BottomNav />
    </div>
  );
}
