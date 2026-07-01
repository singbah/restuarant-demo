
import Footer from "./Footer"
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

    return(<div className="flex-1">
                <NavBar/>
            <div className="flex flex-col gap-6 lg:flex-row lg:mx-20">
                <main className="flex-1">
                {/* <SearchBars/> */}
                {compo}
                </main>

                <aside 
                    style={{display:blogs.length>0?"block":"none"}}
                    className="w-full lg:w-80 shrink-0 lg:mt-20">
                <NewsLetter />
                </aside>

            </div>
                <Footer/>
            </div>)
}