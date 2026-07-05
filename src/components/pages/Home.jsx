import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiFoodTruck } from "react-icons/gi";
import { FuelIcon } from "lucide-react";

import { API_URL, getBlogs, api } from "../../../libs/api";

import NavBar from "../layouts/navbar";
import Footer from "../layouts/Footer";
import NewsLetter from "../forms/NewsLetters";

import KyiCard from "../layouts/KYICard";
import MarketTable from "../layouts/MarkeyTable";
import CurrencyConvertor from "../layouts/CurrencyConvert";
import BudgetHelper from "../layouts/BudgetTracker";
import PostCard from "../blog/PostCards";
import SearchBars from "../forms/SearchBar";
import LoadingEffect from "../layouts/LoadingEffect";
import axios from "axios";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [msg, setMsg] = useState({ open: false, title: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function fetchBlogs(){
    setLoading(true)
    try {
      const data = await api.get(`/home?cursor=${Number(cursor) || 0}&limit=20`);
      setBlogs((prev) => ([...prev, ...data.data.posts]));
      console.log(data.data.posts)
      setCursor(data.data.last_id);
      setHasMore(data.data.has_more);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blogs:", error.response?.data || error.message);
      setMsg({ open: true, title: "Error", message: "Failed to fetch blogs" });
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  if(loading) return <LoadingEffect/>;

  return (
    <div className="min-h-dvh flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-400 to-green-500 text-white">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <SearchBars/>
            <h1 className="text-4xl md:text-6xl font-bold">
              Easi Tech Lr.
            </h1>


            <p className="mt-4 text-lg md:text-xl max-w-2xl">
              Stay updated with the latest market prices, exchange rates,
              fuel prices, and helpful financial tools for everyday life.
            </p>

            <Link
              to="/contact"
              className="inline-block mt-8 rounded-lg bg-white text-blue-600 font-semibold px-6 py-3 hover:bg-gray-100 transition"
            >
              Get Updates
            </Link>
          </div>
        </section>

        {/* Latest Prices */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              Latest Prices
            </h2>

            <Link
              to="/market"
              className="text-blue-600 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <KyiCard
                title="Gasoline"
                value="$950/Gal"
                percentage={8}
                icon={
                <FuelIcon
                    size={100}
                    className="rounded-xl bg-red-100 p-3 text-red-600"
                />
                }
            />

            <KyiCard
                title="Diesel"
                value="$900/Gal"
                percentage={-3}
                icon={
                <FuelIcon
                    size={100}
                    className="rounded-xl bg-blue-100 p-3 text-blue-600"
                />
                }
            />

            <KyiCard
                title="Rice"
                value="$15 / 25kg"
                percentage={5}
                icon={
                <GiFoodTruck
                    size={100}
                    className="rounded-xl bg-green-100 p-3 text-green-600"
                />
                }
            />
            </div>
        </section>

        {/* Latest Articles */}
        {blogs &&blogs.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">
              Latest Articles
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs && blogs.slice(0, 6).map((blog) => (
                <PostCard
                  key={blog.id}
                  content={blog}
                />
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold mb-8">
            Financial Tools
          </h2>

          <section className="grid gap-6 lg:grid-cols-3 items-start">
                <MarketTable />
                <CurrencyConvertor />
                <BudgetHelper />
            </section>

        </section>

        {/* Newsletter */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <NewsLetter />
        </section>
      </main>

      <Footer />
    </div>
  );
}