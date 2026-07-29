import { useContext, useEffect, useMemo, useState } from "react";
import useFetch from "../hooks/UseFetch";
import LoadingEffect from "../layouts/LoadingEffect";
import BottomNav from "../ui/BottomNav";
import {
  Coins,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartIcon,
  Tags,
  Trash,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import ItemCard from "../ui/ItemCard";
import { AdminContext } from "../admins/adminContext";
import { ImSwitch } from "react-icons/im";
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
  const [activeTap, setActiveTap] = useState(null);
  const { data, error, loading, refetch } = useFetch("/user/me");
  const { Logout } = useContext(AdminContext);
  const navigate = useNavigate(null);

  const agentActivitive =
    data && data.is_vendor
      ? [
          { name: "Customers Orders", Icon: Users, label: "customers" },
          { name: "Products", Icon: Tags, label: "products" },
          { name: "Sales", Icon: Coins, label: "sales" },
        ]
      : [];

  async function get_analytic() {
    setIsLoading(true);
    try {
      const result = await api.get(
        `/user/vendor_analytic?cursor=${Number(cursor)}&limit=${Number(20)}`,
      );
      const response = result.data;
      setAnalytic(response);
      setCursor(response.cursor);
      console.log(response);
    } catch (error) {
      console.log(error);
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
      get_analytic();
      setMsg({
        message: result.detail,
        title: "Order Checked",
        status: "success",
        isOpen: true,
      });
    } catch (error) {
      console.log(error);
      setMsg({
        message:
          "Transaction failed while checking orders please check try again",
        title: "Order Checked Failed",
        status: "error",
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const _ = () => {
      refetch();
      get_analytic();
    };
    _();
  }, []);

  if (loading) return <LoadingEffect />;
  if (error || !data) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <h1 className="font-bold text-lg">
          You Have to have an account to have a profile
        </h1>
        <a
          className="border-2 border-blue-600 px-4 py-2 font-bold shadow-lg rounded-2xl hover:scale-105 transition mt-4"
          href="/vendor-signup"
        >
          Sign Up Now
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto h-screen">
      {isLoading && <LoadingEffect />}
      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        onClose={() => setMsg({ isOpen: false })}
      />
      <div className="h-screen overflow-y-auto">
        <article className=" bg-black text-blue-600 p-2 flex relative items-center pb-10">
          {data.photo ? (
            <img className="border rounded-full mr-10" alt="photo" />
          ) : (
            <User className="border rounded-full mr-10" size={80} />
          )}
          <section>
            <h1 className="text-2xl font-bold text-white">
              {data && data.name}
            </h1>
            <p className="text-sm italic">{data && data.phone}</p>
          </section>
          <section className="absolute bottom-0 mb-2 mr-4 right-0 flex gap-8 justify-center items-center">
            <ImSwitch
              onClick={Logout}
              className="text-orange-400 cursor-pointer"
              size={20}
            />
            <Trash
              onClick={() =>
                alert(
                  "All your crendentails will be delete including: Transaction details, Personal info etc.. Please note that these information cannot be retrieve once deleted",
                )
              }
              className="text-red-500 cursor-pointer"
            />
          </section>
          {data && data.is_vendor ? (
            <p className="absolute bottom-8 left-16 w-4 h-4 mb-4  rounded-full bg-green-500 animate-pulse transition"></p>
          ) : (
            <p
              onClick={() => navigate("/policy")}
              className="absolute bottom-0 border-purple-500 border mb-2 text-[10px] text-purple-600 rounded px-2"
            >
              Activate Account
            </p>
          )}
        </article>

        <nav className="flex justify-around mx-2 items-center overflow-x-auto list-none mb-2 mt-4 whitespace-nowrap gap-2">
          {[
            { name: "Analytics", Icon: TrendingUp, label: null },
            { name: "Ask AI", Icon: BsRobot, label: "robot" },
            { name: "My Orders", Icon: ShoppingCartIcon, label: "myorder" },
            { name: "Cart Items", Icon: ShoppingBag, label: "mycart" },
            ...agentActivitive,
          ].map((item) => (
            <li
              className="border text-blue-600 font-bold border-2 border-black rounded px-2 py-1 cursor-pointer mb-2.5"
              key={item.name}
              onClick={() => setActiveTap(item.label)}
            >
              <item.Icon className="inline" /> {item.name}
            </li>
          ))}
        </nav>
        <hr className="text-white border-gray-400 border-2" />
        {activeTap === null && (
          <div className="px-4">
            <h1 className="text-2xl font-bold mb-4 mt-4">Over View</h1>
            <section className="grid grid-cols-2 gap-4 justify-center items-center mx-4">
              <AnalyticCard
                title={"Total Products"}
                Num={analytic.product_count}
                Icon={<ShoppingBag />}
              />

              <AnalyticCard
                title={"Total Orders"}
                Num={analytic.user_orders_count}
                Icon={<ShoppingCart />}
              />

              {data && data.is_vendor && (
                <>
                  <AnalyticCard
                    title={"Customers Orders"}
                    Num={analytic.customer_orders_count}
                    Icon={<Users />}
                  />
                  <AnalyticCard
                    title={"Earnings"}
                    Num={`$ ${analytic.sales_record && analytic.sales_record.profit_margin}`}
                    Icon={<Coins />}
                  />
                </>
              )}
            </section>
          </div>
        )}
        {activeTap === "mycart" && (
          <div>
            <h1 className="mx-4 font-black text-2xl m-4">Comming Soon!!</h1>
          </div>
        )}
        {activeTap === "myorder" && (
          <div className="overflow-y-auto">
            <h1 className="mx-4 font-black text-2xl m-4 overflow-y-auto">
              My Orders
            </h1>
            {analytic &&
              analytic.user_orders.map((item, index) => (
                <ItemCard
                  key={index}
                  name={item.product_name}
                  price={
                    item.status == "paid"
                      ? `$ ${item.money} - paid`
                      : `$ ${item.money} - pending`
                  }
                  lable={"Decline"}
                  type_={"item"}
                />
              ))}
          </div>
        )}
        {activeTap === "customers" && (
          <div>
            <h1 className="mx-4 font-black text-2xl m-4">Customers Orders</h1>
            {analytic &&
              analytic.customers_orders.map((item, index) => (
                <ItemCard
                  onPress={() => completeOrder(item.order_id)}
                  key={index}
                  name={item.product_name}
                  price={
                    item.status == "paid"
                      ? `${item.money} - paid`
                      : `${item.money} - pending`
                  }
                  lable={item.status == "paid" ? "Delete" : "Uncheck"}
                  type_={"people"}
                  photo={"photo"}
                />
              ))}
          </div>
        )}

        {activeTap === "products" && (
          <div className="overflow-y-auto">
            <h1 className="mx-4 font-black text-2xl mt-4 mb-4">My Products</h1>
            {analytic &&
              analytic.product.map((item, index) => (
                <ItemCard
                  key={index}
                  name={item.product_name}
                  price={item.price}
                  lable={"modify"}
                  type_={"item"}
                  photo={item.featured_image}
                />
              ))}
          </div>
        )}
        {activeTap === "robot" && (
          <div>
            <h1 className="font-bold text-center m-4 text-2xl">
              AI Comming Soon!!
            </h1>
          </div>
        )}
        {activeTap === "sales" && (
          <div className="mx-2">
            <h1 className="font-bold text-center m-4 text-2xl">Sales Record</h1>
            {analytic.sales_record && (
              <div className="mx-2 text-lg ">
                <section className="mb-4 p-2 rounded-lg bg-purple-200">
                  <p className="text-center font-bold mb-2">Customer Orders</p>
                  <p>Total Orders : {analytic.customer_orders_count}</p>
                  <p>
                    Total pendding orders :{" "}
                    {analytic.sales_record.pending_customers_orders}
                  </p>
                  <p>
                    Total Quantities Order{" "}
                    {analytic.sales_record.total_product_customers_order}
                  </p>
                </section>

                <article className=" mb-4 rounded-lg p-2 bg-red-50">
                  <p className="font-bold text-center mb-2">Agent Inventry</p>
                  <p>Orders Made : {analytic.user_orders_count}</p>
                  <p>
                    Pendding Orders : {analytic.sales_record.pending_orders}
                  </p>
                  <p>
                    Quantities Order{" "}
                    {analytic.sales_record.total_products_order}
                  </p>
                </article>

                <section className="bg-green-100 p-2 rounded-xl border-2">
                  <p className="font-bold text-center mb-2">Break Down</p>
                  <p>Total Expenditures: {analytic.sales_record.expenditure}</p>
                  <p>Total Sales : {analytic.sales_record.total_sales}</p>
                </section>
                <p
                  style={{
                    color:
                      analytic.sales_record.profit_margin > 0 ? "green" : "red",
                  }}
                  className="text-green-400 font-bold m-4 border rounded-lg px-4"
                >
                  Total Profit Margin :{" "}
                  <span className="font-bold italic">
                    ${analytic.sales_record.profit_margin.toFixed(2)}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
