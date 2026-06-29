import LayoutScreen from "../layouts/Layout"
import { Footer2 } from "../layouts/Footer"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { use, useEffect, useState } from "react"
import { getBlogs } from "../../../libs/api"
import PostCard from "../blog/PostCards"

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
            </li>):<h1>System down</h1>}
        </div>}/>
    </div>)
}