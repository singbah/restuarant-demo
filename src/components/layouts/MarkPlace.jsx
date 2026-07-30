import { useEffect, useRef, useState, useCallback } from "react";
import { api } from "../../../libs/api";
import { Camera, Search, X, ShoppingBag } from "lucide-react";
import ListingCard from "../ui/ProductCard";
import LoadingEffect from "./LoadingEffect";
import AlertCard from "./AlertCard";
import { useNavigate } from "react-router-dom";
import BottomNav from "../ui/BottomNav";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "fashion", label: "Fashion" },
  { id: "electronic", label: "Electronics" },
  { id: "phone", label: "Phones" },
];

export default function MarketPlace() {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  // Fetch initial product listings
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `products/listings?cursor=${cursor}&limit=${limit}`,
        );
        const result = response.data;
        const dataListings = result.listings || [];
        setListings(dataListings);
        setFiltered(dataListings);
        setLimit(result.limit || 20);
        setCursor(result.cursor);
      } catch (error) {
        console.error(
          "Failed to fetch products",
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [cursor, limit]);

  // Combined Search and Category Filter
  const applyFilters = useCallback(() => {
    let result = [...listings];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (item) =>
          item.category
            ?.toLowerCase()
            .includes(selectedCategory.toLowerCase()) ||
          item.market?.toLowerCase().includes(selectedCategory.toLowerCase()),
      );
    }

    // Filter by search query
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.product_name?.toLowerCase().includes(query) ||
          item.market?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query),
      );
    }

    setFiltered(result);
  }, [search, selectedCategory, listings]);

  useEffect(() => {
    applyFilters();
  }, [search, selectedCategory, listings, applyFilters]);

  const handleCameraSearch = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMsg({
      isOpen: true,
      title: "AI Vision Search",
      message:
        "Visual search is coming soon! You'll be able to snap photos of products to find them instantly.",
      status: "info",
    });
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {loading && <LoadingEffect />}

      <AlertCard
        open={msg.isOpen}
        message={msg.message}
        title={msg.title}
        status={msg.status}
        onClose={() => setMsg({ ...msg, isOpen: false })}
      />

      {/* Sticky Header with Search */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          {/* Search Bar Input */}
          <div className="flex-1 bg-gray-100 hover:bg-gray-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 border border-transparent rounded-full flex items-center px-3.5 py-2 transition-all">
            <Search className="text-gray-400 w-5 h-5 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search rice, oil, chicken..."
              className="w-full px-3 text-sm text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Camera Search Button */}
          <button
            onClick={openCamera}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-2.5 rounded-full transition shadow-md shadow-emerald-600/20 flex-shrink-0"
            title="Search with camera"
          >
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              className="hidden"
              onChange={handleCameraSearch}
            />
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Category Filter Pills */}
        <div className="max-w-4xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200/70"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
              {search ? `Results for "${search}"` : "Market Prices Today"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Showing {filtered.length}{" "}
              {filtered.length === 1 ? "item" : "items"}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 && !loading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-gray-100 mt-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-base font-semibold text-gray-800">
              No products found
            </h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xs">
              We couldn't find anything matching your search. Try adjusting your
              search query or filters.
            </p>
            {(search || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-lg hover:bg-emerald-100 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((item, index) => (
              <ListingCard key={item.id || index} item={item} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
