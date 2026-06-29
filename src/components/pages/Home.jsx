import { useMemo, useState } from "react"
import { Footer2 } from "../layouts/Footer"
import LayoutScreen from "../layouts/Layout"
import { getBlogs } from "../../../libs/api";
import NavBar from "../layouts/navbar";
import SearchBars from "../forms/SearchBar";

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
            <h1>This is the home page</h1>
        </div>
        
    </div>
}