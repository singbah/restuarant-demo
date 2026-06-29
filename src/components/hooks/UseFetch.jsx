import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch(url){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState('')

    useEffect(() =>{
        if(loading){
            fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false))
        }
    },[url])

    return {data, loading, error}
}