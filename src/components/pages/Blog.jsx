import LayoutScreen from "../layouts/Layout"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { use, useEffect, useState } from "react"
import { getBlogs } from "../../../libs/api"
import PostCard from "../blog/PostCards"
import PageNotFound from "./NotFound"

export default function Blogs(){
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([])

    useEffect(() =>{
        getBlogs()
        .then(res => setBlogs(res))
        .catch(err => console.log(err))
    },[])

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