
import {Footer1, Footer2} from "./Footer"
import { useMemo, useState } from "react"
import axios from "axios"

import { getBlogs } from "../../../libs/api"
import NavBar from "./navbar"
import PostCard from "../blog/PostCards"
import PostLists from "../blog/PostLists"
import ContactForm from "../forms/ContactForms"


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
        {compo?compo:
        <div 
            className="flex-1 m-1 
            gap-2 overflow-y-auto flex flex-col lg:flex-row lg:mx-20 ">
            <div className=" lg:w-full lg:overflow-y-auto">
                <ContactForm/>
            </div>
            <div className=" lg:w-1/3 lg:overflow-y-auto">
                
            </div>
        </div>}
        <Footer2/>
    </div>)
}