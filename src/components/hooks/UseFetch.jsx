import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState('')


    async function getData(){
        try{
            const resp = await axios.get(url);
            const result = resp.data;
            setData(result);
            setLoading(false)
        }catch(error){
            setError(error.response.data)
            setLoading(false)
        }
    }

    useEffect(() =>{
        getData()
    },[url])

    return {data, loading, error, refetch:getData}
}