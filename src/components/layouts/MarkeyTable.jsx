
import { Button } from "../ui/Buttons"

export default function MarketTable(){
    const hdstyle = "py-3 px-4 text-left text-normal font-bold text-gray"
    const tdStyle = "py-3 px-4"
    return(<div className="overflow-x-auto mt-10 m-2">
        <h1 className="text-xl m-2 font-bold">Top Trending Liberian Product</h1>
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
        <button className="m-2 bg-green-50 rounded p-1 text-green-700 transition active:scale-105">view in full</button>
        </div>)
}