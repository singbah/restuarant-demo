import LayoutScreen from "../layouts/Layout"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { use, useEffect, useState } from "react"
import { API_URL, getBlogs, api } from "../../../libs/api"
import PostCard from "../blog/PostCards"
import PageNotFound from "./NotFound"
import LoadingEffect from "../layouts/LoadingEffect"
import axios from "axios"

export default function Blogs(){
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])
    const [msg, setMsg] = useState({open:false, title:'', message:''})
    const [loading, setLoading] = useState(false)
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)


    async function fetchBlogs() {
        setLoading(true)
        try {
            const resp = await api.get(`/home?cursor=${Number(cursor) || 0}&limit=20`)
            const data = resp.data;
            setBlogs((prev) => ([...prev, ...data.posts]))
            setCursor(data.last_id)
            setHasMore(data.has_more)
            setLoading(false)
            setMsg({open:true, title:'Success', message:'Blogs fetched successfully'})

            return;
        } catch (error) {
            console.log(error)
            console.log(error.response?.data.detail||"Failed to fetch posts")
            setLoading(false)
            setMsg({open:true, title:'Error', message:'Failed to fetch posts'})
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    if(loading) return <LoadingEffect/>

    return(<div>

        <LayoutScreen compo={<div>
            {blogs?blogs.map((blog, idex) => <li key={idex}
                onClick={() => navigate(`/post/${blog.slug}`, {state:blog})}
                >
                <PostCard content={blog}/>
            </li>):<PageNotFound/>}
        </div>}/>
    </div>)
}