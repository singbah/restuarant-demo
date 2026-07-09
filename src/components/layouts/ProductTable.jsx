
import { Link } from "react-router-dom";
import LayoutScreen from "./Layout";

const products = [
  {
    id: "1",
    name: "Rice",
    market: "Red Light Market",
    unit: "25kg bag",
    price: 19.5,
    updatedAt: new Date().toDateString(),
  },
  {
    id: "2",
    name: "Rice",
    market: "Waterside Market",
    unit: "25kg bag",
    price: 17.5,
    updatedAt: new Date().toDateString(),
  },
  {
    id: "3",
    name: "Rice",
    market: "Duala Market",
    unit: "25kg bag",
    price: 18,
    updatedAt: new Date().toDateString(),
  },
  
];


export default function ProductTable() {
  return (<LayoutScreen compo={
    <div className="overflow-x-auto my-2 p-2">
      <h1 className="text-3xl text-center m-8 font-bold">Today Market Prices in Monrovia</h1>
      <table className="min-w-full border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Market</th>
            <th className="px-4 py-3 text-left">Unit</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-left">Updated</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">{product.market}</td>
              <td className="px-4 py-3">{product.unit}</td>
              <td className="px-4 py-3 text-right">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">
                {product.updatedAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link className="bg-blue-600 px-2 py-2 m-8 shadow-blue-200 
        shadow-lg rounded-2xl active:scale-105 text-white font-bold
       hover:bg-blue-800 cursor-pointer transition">View More</Link>
      
    </div>
  }/>);
}