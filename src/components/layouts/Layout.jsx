
import Footer from "./Footer"
import { useMemo, useState, useEffect } from "react"
import axios from "axios"

import { getBlogs, API_URL } from "../../../libs/api"
import NavBar from "./navbar"
import PostCard from "../blog/PostCards"
import PostLists from "../blog/PostLists"
import ContactForm from "../forms/ContactForms"
import NewsLetter from "../forms/NewsLetters"
import SearchBars from "../forms/SearchBar"
import LoadingEffect from "./LoadingEffect"


export default function LayoutScreen({compo}){
    const [blogs, setBlogs] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [msg, setMsg] = useState({ open: false, title: "", message: "" });
    const [loading, setLoading] = useState(false);

    async function fetchBlogs(){
        setLoading(true)
        try {
        const data = await axios.get(API_URL + `home?cursor=${Number(cursor) || 0}&limit=20`);
        setBlogs((prev) => ([...prev, ...data.data.posts]));
        setCursor(data.data.last_id);
        setHasMore(data.data.has_more);
        setLoading(false);
        } catch (error) {
        setMsg({ open: true, title: "Error", message: "Failed to fetch blogs" });
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchBlogs();
    }, []);

    
    useMemo(() =>{
    },[])
    
    if(loading) return <LoadingEffect/>;

    return(<div className="flex-1">
                <NavBar/>
                <div className="flex flex-col gap-6 lg:flex-row lg:mx-20">

                    <main className="flex-1">
                        {compo}
                    </main>

                    <aside
                        className="w-full lg:w-80 shrink-0 lg:mt-20">
                        <div>Sponsors Banners</div>
                    </aside>

                </div>
                <Footer/>
            </div>)
}