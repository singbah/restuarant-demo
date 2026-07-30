import { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle2,
  Eye,
  Trash2,
  RefreshCw,
  Trash,
} from "lucide-react";
import AlertCard from "../layouts/AlertCard";
import LoadingEffect from "../layouts/LoadingEffect";
import ItemCard from "../ui/ItemCard";
import useFetch from "../hooks/UseFetch";
import { api } from "../../../libs/api";
import PageNotFound from "../pages/NotFound";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products"); // 'products' | 'vendors' | 'orders'
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [rmetrics, setMetrics] = useState({});
  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const { data, error, loading } = useFetch("/user/me");

  const getAnalytics = async () => {
    try {
      const results = await api.get("/admin/vendors/analytic");
      const response = results.data;
      setMetrics(response.metrics);
      setVendors(response.vendors);
      setProducts(response.products);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Modal alert state
  const [msg, setMsg] = useState({
    isOpen: false,
    title: "",
    message: "",
    status: "info",
    action: null,
    linkTo: "",
  });

  // Mock Admin Metric Data
  const metrics = [
    {
      title: "Total Sales",
      value: rmetrics.total_sales,
      icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
      change: (Number(rmetrics.total_sales) / 100) * 10,
    },
    {
      title: "Active Products",
      value: rmetrics.active_products,
      icon: <ShoppingBag className="w-5 h-5 text-indigo-600" />,
      change: "+8 this week",
    },
    {
      title: "Registered Vendors",
      value: rmetrics.registered_vendors,
      icon: <Users className="w-5 h-5 text-sky-600" />,
      change: "0 pendding",
    },
    {
      title: "Pending Reviews",
      value: rmetrics.pending_reviews,
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
      change: "Action needed",
    },
  ];

  useEffect(() => {
    getAnalytics();
  }, []);

  // Filter products/vendors based on query
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vendor_phone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" ||
        item.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  }, [products, searchTerm, filterStatus]);

  const handleDeleteProduct = (productId, productName) => {
    setMsg({
      isOpen: true,
      title: "Delete Listing?",
      message: `Are you sure you want to remove "${productName}" from the marketplace?`,
      status: "warning",
      linkTo: "Yes, Remove",
      action: () => {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        api.delete(`/admin/delete/product?product_id=${productId}`);
        setMsg({
          isOpen: true,
          title: "Listing Removed",
          message: "The product was successfully deleted.",
          status: "success",
        });
      },
    });
  };

  const handleApproveProduct = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: "Active" } : p)),
    );
    setMsg({
      isOpen: true,
      title: "Listing Approved",
      message: "The product is now live on the marketplace.",
      status: "success",
    });
  };

  if (loading) return <LoadingEffect />;

  if ((data && data.role !== "admin") || error) {
    return <PageNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {isLoading && (
        <LoadingEffect
          title="Updating Records..."
          message="Connecting to admin service."
        />
      )}

      <AlertCard
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        message={msg.message}
        action={msg.action}
        linkTo={msg.linkTo}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md">
              A
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                Admin Overview
              </h1>
              <p className="text-xs text-gray-500">
                Marketplace Management & Audits
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition active:scale-95"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pt-5 space-y-6">
        {/* Metrics Section */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500">
                  {m.title}
                </span>
                <div className="p-2 rounded-xl bg-gray-50">{m.icon}</div>
              </div>
              <p className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
                {m.value}
              </p>
              <span className="text-[11px] font-medium text-emerald-600 mt-1 inline-block">
                {m.change}
              </span>
            </div>
          ))}
        </section>

        {/* Navigation Tabs & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "products"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("vendors")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === "vendors"
                    ? "bg-white text-gray-900 shadow-2xs"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Vendors ({vendors.length})
              </button>
            </div>

            {/* Filter Status Pills */}
            <div className="flex items-center gap-1.5">
              {["all", "active", "pending"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition ${
                    filterStatus === st
                      ? "bg-slate-900 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 focus-within:border-emerald-500 transition">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Dynamic Tab Contents */}
        {activeTab === "products" && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
              Marketplace Listings ({filteredProducts.length})
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400 text-xs">
                No matching product listings found.
              </div>
            ) : (
              filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 p-3 shadow-2xs flex items-center justify-between gap-3"
                >
                  <ItemCard
                    name={item.product_name}
                    price={`${item.price} • ${item.vendor_phone}`}
                    photo={item.featured_image}
                    type="item"
                    label={item.category}
                  />

                  {/* Action Controls */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 pr-2">
                    {item.status === "Pending" && (
                      <button
                        onClick={() => handleApproveProduct(item.id)}
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
                        title="Approve Listing"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(item.id, item.name)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {activeTab === "vendors" && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
              Registered Merchants ({vendors.length})
            </h2>

            {vendors.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs flex items-center justify-between gap-3"
              >
                <ItemCard
                  name={v.name}
                  price={`${v.phone} • ${v.productsCount} listings`}
                  type="people"
                  label={v.status}
                />

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() =>
                      setMsg({
                        isOpen: true,
                        title: "Merchant Details",
                        message: `Email: ${v.email}\nPhone: ${v.phone}\nListings: ${v.productsCount}`,
                        status: "info",
                      })
                    }
                    className="p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition"
                    title="View Profile"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-gray-100 transition"
                    title="View Profile"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
