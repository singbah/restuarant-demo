import { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";
import LoadingEffect from "../layouts/LoadingEffect";
import BottomNav from "../ui/BottomNav";
import {
  Coins,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartIcon,
  Tags,
  Trash2,
  TrendingUp,
  User,
  Users,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ItemCard from "../ui/ItemCard";
import { AdminContext } from "../admins/adminContext";
import { BsRobot } from "react-icons/bs";
import { api } from "../../../libs/api";
import AnalyticCard from "../ui/Cards";
import AlertCard from "../layouts/AlertCard";
import { useNavigate } from "react-router-dom";

export default function VendorProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [analytic, setAnalytic] = useState({});
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    title: "",
    status: "",
  });
  const [cursor, setCursor] = useState(0);
  const [activeTab, setActiveTab] = useState(null);

  const { data, error, loading, refetch } = useFetch("/user/me");
  const { Logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const agentActivities = [
    { name: "Customers", Icon: Users, label: "customers" },
    { name: "Products", Icon: Tags, label: "products" },
    { name: "Sales", Icon: Coins, label: "sales" },
  ];

  const tabNavigation = [
    { name: "Overview", Icon: TrendingUp, label: null },
    { name: "Ask AI", Icon: BsRobot, label: "robot" },
    { name: "My Orders", Icon: ShoppingCartIcon, label: "myorder" },
    { name: "Cart", Icon: ShoppingBag, label: "mycart" },
    ...agentActivities,
  ];

  async function getAnalytic() {
    setIsLoading(true);
    try {
      const result = await api.get(
        `/user/vendor_analytic?cursor=${Number(cursor)}&limit=${Number(20)}`,
      );
      const response = result.data;
      setAnalytic(response || {});
      if (response?.cursor) setCursor(response.cursor);
    } catch (err) {
      console.error("Error fetching vendor analytics:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function completeOrder(order_id) {
    setIsLoading(true);
    try {
      const request = await api.get(
        `/user/complete_transaction?order_id=${order_id}`,
      );
      const result = request.data;
      getAnalytic();
      setMsg({
        message: result.detail || "Order processed successfully",
        title: "Order Updated",
        status: "success",
        isOpen: true,
      });
    } catch (err) {
      console.error(err);
      setMsg({
        message: "Failed to update order status. Please try again.",
        title: "Action Failed",
        status: "error",
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteAccountAlert = () => {
    if (
      window.confirm(
        "Are you sure? All credentials including transactions and profile data will be permanently deleted and cannot be recovered.",
      )
    ) {
      // Handle account deletion logic here
    }
  };

  useEffect(() => {
    refetch();
    getAnalytic();
  }, []);

  if (loading) return <LoadingEffect />;

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-emerald-600">
          <User className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Sign in to view your profile
        </h1>
        <p className="text-sm text-gray-500 max-w-xs mb-6">
          Access your vendor dashboard, orders, analytics, and sales records.
        </p>
        <button
          onClick={() => navigate("/vendor-signup")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          Sign Up / Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {isLoading && <LoadingEffect />}

      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        onClose={() => setMsg({ ...msg, isOpen: false })}
      />

      <main className="max-w-2xl mx-auto px-4 pt-4">
        {/* Profile Header Card */}
        <div className="relative overflow-hidden bg-slate-900 text-white rounded-3xl p-6 shadow-xl mb-6">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                {data.photo ? (
                  <img
                    src={data.photo}
                    alt={data.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400">
                    <User className="w-8 h-8" />
                  </div>
                )}
                {data.is_vendor && (
                  <span
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"
                    title="Active Vendor"
                  />
                )}
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  {data.name}
                  {data.is_vendor && (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 inline" />
                  )}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{data.phone}</p>

                {!data.is_vendor && (
                  <button
                    onClick={() => navigate("/policy")}
                    className="mt-2 text-[11px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium transition"
                  >
                    Activate Vendor Account
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={Logout}
                className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 rounded-xl transition"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button
                onClick={handleDeleteAccountAlert}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition"
                title="Delete Account"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-4">
          {tabNavigation.map((tab) => {
            const Icon = tab.Icon;
            const isActive = activeTab === tab.label;

            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === null && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Dashboard Overview
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <AnalyticCard
                title="Total Products"
                Num={analytic.product_count || 0}
                Icon={<ShoppingBag className="w-5 h-5 text-emerald-600" />}
              />
              <AnalyticCard
                title="Total Orders"
                Num={analytic.user_orders_count || 0}
                Icon={<ShoppingCart className="w-5 h-5 text-emerald-600" />}
              />
              {data.is_vendor && (
                <>
                  <AnalyticCard
                    title="Customers Orders"
                    Num={analytic.customer_orders_count || 0}
                    Icon={<Users className="w-5 h-5 text-emerald-600" />}
                  />
                  <AnalyticCard
                    title="Earnings"
                    Num={`$${analytic.sales_record?.profit_margin?.toFixed(2) || "0.00"}`}
                    Icon={<Coins className="w-5 h-5 text-emerald-600" />}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CART */}
        {activeTab === "mycart" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-800">
              Cart Feature Coming Soon
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              You will be able to review and manage items saved in your basket.
            </p>
          </div>
        )}

        {/* TAB 3: MY ORDERS */}
        {activeTab === "myorder" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">My Orders</h2>
            {analytic.user_orders && analytic.user_orders.length > 0 ? (
              analytic.user_orders.map((item, index) => (
                <ItemCard
                  key={index}
                  name={item.product_name}
                  price={
                    item.status === "paid"
                      ? `$${item.money} • Paid`
                      : `$${item.money} • Pending`
                  }
                  lable="Decline"
                  type_="item"
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-100">
                No active orders found.
              </p>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOMERS ORDERS */}
        {activeTab === "customers" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">Customer Orders</h2>
            {analytic.customers_orders &&
            analytic.customers_orders.length > 0 ? (
              analytic.customers_orders.map((item, index) => (
                <ItemCard
                  onPress={() => completeOrder(item.order_id)}
                  key={index}
                  name={item.product_name}
                  price={
                    item.status === "paid"
                      ? `$${item.money} • Paid`
                      : `$${item.money} • Pending`
                  }
                  lable={item.status === "paid" ? "Delete" : "Mark Complete"}
                  type_="people"
                  photo="photo"
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-100">
                No customer orders received yet.
              </p>
            )}
          </div>
        )}

        {/* TAB 5: MY PRODUCTS */}
        {activeTab === "products" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900">My Listings</h2>
            {analytic.product && analytic.product.length > 0 ? (
              analytic.product.map((item, index) => (
                <ItemCard
                  key={index}
                  name={item.product_name}
                  price={`$${item.price}`}
                  lable="Modify"
                  type_="item"
                  photo={item.featured_image}
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-100">
                No products listed under your account.
              </p>
            )}
          </div>
        )}

        {/* TAB 6: ASK AI */}
        {activeTab === "robot" && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-800">
              AI Assistant Coming Soon
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Get intelligent pricing advice, market predictions, and automated
              customer support recommendations.
            </p>
          </div>
        )}

        {/* TAB 7: SALES RECORD */}
        {activeTab === "sales" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Sales Record</h2>
            {analytic.sales_record ? (
              <div className="space-y-3 text-sm">
                {/* Customer Orders Box */}
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Customer Orders
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
                    <p>
                      Total Orders:{" "}
                      <span className="font-bold">
                        {analytic.customer_orders_count || 0}
                      </span>
                    </p>
                    <p>
                      Pending:{" "}
                      <span className="font-bold">
                        {analytic.sales_record.pending_customers_orders || 0}
                      </span>
                    </p>
                    <p className="col-span-2">
                      Total Units Ordered:{" "}
                      <span className="font-bold">
                        {analytic.sales_record.total_product_customers_order ||
                          0}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Agent Inventory Box */}
                <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Agent Inventory
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700 pt-1">
                    <p>
                      Orders Placed:{" "}
                      <span className="font-bold">
                        {analytic.user_orders_count || 0}
                      </span>
                    </p>
                    <p>
                      Pending:{" "}
                      <span className="font-bold">
                        {analytic.sales_record.pending_orders || 0}
                      </span>
                    </p>
                    <p className="col-span-2">
                      Total Units:{" "}
                      <span className="font-bold">
                        {analytic.sales_record.total_products_order || 0}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Financial Summary Box */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Financial Summary
                  </span>
                  <div className="space-y-1 text-xs text-emerald-950 font-medium">
                    <div className="flex justify-between">
                      <span>Total Expenditure:</span>
                      <span>
                        ${analytic.sales_record.expenditure || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Sales:</span>
                      <span>
                        ${analytic.sales_record.total_sales || "0.00"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-emerald-500/20 flex justify-between font-bold text-sm">
                      <span>Profit Margin:</span>
                      <span
                        className={
                          analytic.sales_record.profit_margin >= 0
                            ? "text-emerald-700"
                            : "text-rose-600"
                        }
                      >
                        $
                        {Number(
                          analytic.sales_record.profit_margin || 0,
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center py-8 bg-white rounded-2xl border border-gray-100">
                No sales records available yet.
              </p>
            )}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
