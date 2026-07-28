import { useEffect, useState } from "react";
import useFetch from "../hooks/UseFetch";
import LoadingEffect from "../layouts/LoadingEffect";
import BottomNav from "../ui/BottomNav";
import {
  ShoppingBag,
  ShoppingCartIcon,
  Tags,
  TrendingUp,
  User,
} from "lucide-react";
import ItemCard from "../ui/ItemCard";

export default function VendorProfile() {
  //   const [isLoading, setIsLoading] = useState(false);
  const [activeTap, setActiveTap] = useState(null);
  const { data, error, loading, refetch } = useFetch("/user/me");

  useEffect(() => {
    refetch();
  }, [activeTap]);
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
      <div className="h-screen">
        <article className=" bg-black text-blue-600 p-2 flex relative items-center pb-10">
          {data.photo ? (
            <img alt="photo" />
          ) : (
            <User className="border rounded-full mr-10" size={80} />
          )}
          <section>
            <h1 className="text-2xl font-bold">{data && data.name}</h1>
            <p className="text-sm italic">{data && data.phone}</p>
          </section>
          <a
            href="#"
            className="absolute bottom-0 mb-2 mr-4 text-red-600 font-bold border px-2 rounded-lg right-0"
          >
            Logout
          </a>
        </article>

        <nav className="flex justify-around mx-2 items-center overflow-x-auto list-none mb-2 mt-4 whitespace-nowrap gap-2">
          {[
            { name: "My Orders", Icon: ShoppingCartIcon, label: "myorder" },
            { name: "Cart Items", Icon: ShoppingBag, label: "mycart" },
            { name: "Customers", Icon: User, label: "customers" },
            { name: "Products", Icon: Tags, label: "products" },
            { name: "Sales", Icon: TrendingUp, label: "sales" },
          ].map((item) => (
            <li
              className="border rounded px-2 py-1 cursor-pointer mb-2.5"
              key={item.name}
              onClick={() => setActiveTap(item.label)}
            >
              <item.Icon className="inline" /> {item.name}
            </li>
          ))}
        </nav>
        {activeTap === "mycart" && (
          <div>
            <h1 className="mx-4 font-black text-2xl">Cart Items</h1>
            <ItemCard
              key={1}
              name={"Garie Bag 25kg"}
              price={"$20 USD"}
              lable={"Order"}
              type_={"item"}
            />
          </div>
        )}
        {activeTap === "myorder" && (
          <div>
            <h1 className="mx-4 font-black text-2xl">Order Items</h1>
            <ItemCard
              key={1}
              name={"Garie Bag 25kg"}
              price={"$20 USD"}
              lable={"Delete"}
              type_={"item"}
            />
          </div>
        )}
        {activeTap === "customers" && (
          <div>
            <h1 className="mx-4 font-black text-2xl">My Customers</h1>
            <ItemCard
              key={1}
              name={"Morris Kollie"}
              price={"0777322000"}
              lable={"Call"}
              type_={"people"}
            />
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
