import { useMemo, useState } from "react"
import { Footer2 } from "../layouts/Footer"
import LayoutScreen from "../layouts/Layout"
import { getBlogs } from "../../../libs/api";
import NavBar from "../layouts/navbar";
import SearchBars from "../forms/SearchBar";
import KyiCard from "../layouts/KYICard";
import { GiFoodTruck } from "react-icons/gi";
import { FuelIcon } from "lucide-react";
import CurrencyConvertor from "../layouts/CurrencyConvert";
import MarketTable from "../layouts/MarkeyTable";
import BudgetHelper from "../layouts/BudgetTracker";
import NewsLetter from "../forms/NewsLetters";
import { Link } from "react-router-dom";

export default function HomePage(){
    const [blogs, setBlogs] = useState([]);
    
    useMemo(() =>{
        getBlogs()
            .then(res => setBlogs(res))
            .catch(err => console.error(err))
        
            return () => console.log("widget clear")
    },[])

    return<div className="relative">
        <NavBar/>
        <div>
            <section className="bg-gradient-to-b from-blue-400 to-green-400 text-white py-16 px-6">
                <h1 className="text-4xl font-bold mb-4">Monrovia Money</h1>
                <p className="text-xl mb-6">Latest prices for rice, fuel, and more</p>
                <Link
                    to={"/contact"}
                    className="bg-white text-blue-600 px-6 py-3 font-bold rounded-lg">Get Updates</Link>
            </section>

            <section className="py-10 px-2">
                <h2 className="text-2xl mb-6">Latest prices</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <KyiCard value={100} percentage={+10} icon={<FuelIcon size={50} className="text-red-600 bg-red-100 rounded-xl p-2"/>} color={'red'} title={"Gas or Fuel"} />
                    <KyiCard value={"$950/Gal"} color={'blue'} percentage={+10} icon={<FuelIcon size={50} className="text-blue-600 bg-blue-100 rounded-xl p-2"/>} title={"Desiel"} />
                    <KyiCard value={"$15USD/25KG"} color={'green'} percentage={-10} icon={<GiFoodTruck size={50} className="text-green-600 bg-blue-100 rounded-xl p-2"/>} title={"Rice"} />
                </div>
                <button>See More</button>
            </section>

                <h2 className="text-2xl mb-6">Tools</h2>
            <section className="grid lg:grid-cols-3 p-2">
                <MarketTable/>
                <CurrencyConvertor/>
                <BudgetHelper/>
            </section>
        </div>
        <NewsLetter/>
        <Footer2/>
    </div>
}