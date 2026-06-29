
import {Footer1, Footer2} from "./Footer"
import { useMemo, useState } from "react"
import axios from "axios"

import { getBlogs } from "../../../libs/api"
import NavBar from "./navbar"
import PostCard from "../blog/PostCards"
import PostLists from "../blog/PostLists"
import ContactForm from "../forms/ContactForms"
import NewsLetter from "../forms/NewsLetters"
import SearchBars from "../forms/SearchBar"


export default function LayoutScreen({compo}){
    const [blogs, setBlogs] = useState([]);
    const [currentBlog, setCurrentBlog] = useState({})

    useMemo(() =>{
        getBlogs()
        .then(res => {
            setCurrentBlog(res?res[0]:{})
            setBlogs(res)})
        .catch(err => console.log(err))

    },[])

    return(<div 
    className="h-dvh flex flex-col relative">
        <NavBar/>
        <div className="flex gap-2 overflow-y-auto flex-col lg:flex-row lg:mx-20 ">
            {compo} 
        <Footer2/>
        </div>
    </div>)
}