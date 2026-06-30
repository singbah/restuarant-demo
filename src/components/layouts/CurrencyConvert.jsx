import { useEffect, useState } from "react"

export default function CurrencyConvertor(){
    const [rate, setRate] = useState({usd_rate:1, lrd_rate:194});
    const [total, setTotal] = useState(rate.lrd_rate*rate.usd_rate)
    const handelRate = (e) =>{
        const {name, value} = e.target;
        setRate((prev) => ({...prev, [name]:value}))
    }
    
    useEffect(() =>{
        setTotal((rate.lrd_rate*rate.usd_rate))
    },[rate])

    return(<div className="flex flex-col justify-center p-2 m-4 rounded-2xl shadow shadow-black">
        <h1 className="text-xl text-center py-4 font-bold">current rate 194</h1>
        <article className="flex gap-4 font-bold justify-center items-center">
            <label >
            USD <input 
            onChange={handelRate}
            value={rate.usd_rate}
            className="border w-20 p-1 rounded"
            type="number" 
            name="usd_rate"/>
        </label>

        <label >
            LRD <input 
            onChange={handelRate}
            value={rate.lrd_rate}
            className="border w-20 p-1 rounded"
            type="number" 
            name="lrd_rate"/>
        </label>

        <label>{total}</label>
        </article>
    </div>)
}