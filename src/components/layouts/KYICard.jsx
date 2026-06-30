import { BsPeople } from "react-icons/bs"

export default function KyiCard({ title, value, percentage, icon, color}) {
  return (<div
    onClick={() => console.log("")}
    className={`w-40 h-40 m-2 rounded-2xl bg-white flex flex-col justify-center text-sm items-center shadow hover:scale-105 cursor-pointer transition`}>
    {icon}
    <p className={`text-${color}-500 font-bold text-xl`}>{title}</p>
    <h1 className={`text-xl font-bold text-center text-${color}-700`}>{value}</h1>
    <p><a
      style={{color:percentage<=0?"red":"green"}}
      className={`font-bold`}>%{percentage}</a> from last 7 days</p>
  </div>)
}