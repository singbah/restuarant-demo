
import { Link } from "react-router-dom"
import { Button } from "../ui/Buttons"
import photo from '../../assets/logo.jpg'
import { FaWhatsapp } from "react-icons/fa6"
import { PhoneCallIcon } from "lucide-react"

export default function MarketTable(){
    const hdstyle = "py-3 px-4 text-left text-normal font-bold text-gray"
    const tdStyle = "py-3 px-4"
    return(<div className="overflow-x-auto mt-10 m-2">
        <h1 className="text-xl m-2 font-bold">Top Trending Liberian Product</h1>
        <div className="flex mb-1 flex-col">
            <img 
                className="h-8 w-8"
                src={photo} alt="" />
            <p className="text-sm italic font-bold">Sponsored By: Easi Tech Lr.</p>
            <a href="#">
                <PhoneCallIcon className="text-green-600 inline"
                    size={20}/> 0777322000
            </a>
            <a href="https://www.wa.me/+213777233000">
                <FaWhatsapp 
                    className="text-green-600 inline"
                    size={20}/> 0777322000
            </a>
        </div>
        <table className="min-w-full gb-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-500 text-white">
                <tr>
                    <th className={hdstyle}>Market</th>
                    <th className={hdstyle}>Item</th>
                    <th className={hdstyle}>Price</th>
                </tr>
            </thead>

            <tbody >
                <tr className="border-t hover:bg-gray-500">
                    <td className={tdStyle}>Red Light Market</td>
                    <td className={tdStyle}>Rice</td>
                    <td className={tdStyle}>$15 USD</td>
                </tr>

                <tr className="border-t hover:bg-gray-500">
                    <td className={tdStyle}>Duala Market</td>
                    <td className={tdStyle}>Rice</td>
                    <td className={tdStyle}>$15 USD</td>
                </tr>

                <tr className="border-t hover:bg-gray-500">
                    <td className={tdStyle}>Waterside Market</td>
                    <td className={tdStyle}>Rice</td>
                    <td className={tdStyle}>$14 USD</td>
                </tr>
            </tbody>
        </table>
        <Link to="/market" className="m-2 bg-green-50 rounded p-1 text-green-700 transition active:scale-105">View All</Link>
        </div>)
}