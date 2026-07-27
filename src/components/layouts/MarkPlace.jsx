import { useEffect, useRef, useState } from "react";
import { api, API_URL } from "../../../libs/api";
import {
  Camera,
  Home,
  PlusIcon,
  Search,
  ShoppingBag,
  Tags,
  User,
} from "lucide-react";
import ListingCard from "../ui/ProductCard";
import LoadingEffect from "./LoadingEffect";
import AlertCard from "./AlertCard";
import useFetch from "../hooks/UseFetch";
import { useNavigate } from "react-router-dom";

export default function MarketPlace() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [msg, setMsg] = useState({
    isOpen: false,
    title: "",
    message: "",
    status: "",
    action: null,
    linkTo: "",
  });
  const [cursor, setCursor] = useState(0);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(null);
  const fileInputRef = useRef(null);
  const { data, refetch } = useFetch(`/user/me`);

  const openCamera = async () => {
    fileInputRef.current.click();
  };

  const categoryFileter = (data) => {
    setFiltered(
      listings.filter(
        (item) =>
          item.category
            .toLocaleLowerCase()
            .includes(data.toLocaleLowerCase()) ||
          item.market.toLocaleLowerCase().includes(data.toLocaleLowerCase()),
      ),
    );
  };

  useEffect(() => {
    const _ = () => {
      setFiltered(
        listings.filter(
          (item) =>
            item.product_name
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()) ||
            item.market
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()),
        ),
      );
    };
    _();
  }, [search, listings]);

  useEffect(() => {
    refetch();
    const _ = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `products/listings?cursor=${cursor}&limit=${limit}`,
        );
        const result = response.data;
        setListings(result.listings || []);
        setFiltered(result.listings || []);
        setLimit(result.limit || 20);
        setCursor(result.cursor);
        setLoading(false);
        console.log(result);
      } catch (error) {
        console.error(
          "Failed to fetch product",
          error.response?.data || error.message,
        );
        setLoading(false);
      }
    };
    _();
  }, [cursor, limit]);

  const handelCameraSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setMsg({
      isOpen: true,
      title: "Info",
      message: "This feature is camming soon with AI Vision..",
      status: "info",
    });
    console.log("Photo", file);
    e.target.value = "";
    console.log(previewURL);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {loading ? <LoadingEffect /> : null}
      <AlertCard
        open={msg.isOpen}
        message={msg.message}
        title={msg.title}
        status={msg.status}
        onClose={() => setMsg({ isOpen: false })}
      />
      <div className="max-w-2xl mx-auto bg-white rounded-full shadow-lg flex items-center p-2 sticky top-0 z-20 border border-blue-300">
        <Search
          className="text-gray-400 ml-3"
          size={20}
          onClick={handelCameraSearch}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search rice, oil, chicken..."
          className="flex-1 px-4 py-2 text-gray-800 outline-none bg-transparent"
        />
        {/* CAMERA ICON FOR IMAGE SEARCH */}
        <button
          onClick={openCamera}
          className="bg-blue-500 p-3 rounded-full hover:bg-blue-700 transition"
        >
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handelCameraSearch}
          />
          <Camera className="text-white" size={20} />
        </button>
      </div>

      <div className="mt-10 mb-2 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Market Prices</h1>
        <select
          className=" p-2 text-green-600 rounded-lg border-2 border-blue-400"
          onChange={(e) => categoryFileter(e.target.value)}
        >
          <option value="">Categories</option>
          <option value="food">Food</option>
          <option value="fasion">Frasion</option>
          <option value="eletronic">Electronic</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {loading && "Loading...."}
        <h1 className="text-2xl font-bold mb-4">
          {search ? `Results for ${search}` : "Latest Prices Today"}
        </h1>
        {filtered.length === 0 ? (
          <p>No Items Found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, index) => (
              <ListingCard key={index} item={item} />
            ))}
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

        <PlusIcon
          onClick={() => navigate("/addItem")}
          className="cursor-pointer hover:scale-103 transition hover:text-green-600"
        />
      </div>
    </div>
  );
}
