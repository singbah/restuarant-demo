import { useLocation, useParams } from "react-router-dom"
import useFetch from "../hooks/UseFetch";
import PostCard from "./PostCards";
import LayoutScreen from "../layouts/Layout";

export default function PostsDetails({}){
    const {postSlug} = useParams();
    const urlLocation = useLocation()
    const blog = urlLocation.state
    const pathname = urlLocation.pathname

    // const {data, loading, error} = useFetch(`http://127.0.0.1:8000/posts/${pathname}`)

    return(<div>
        <LayoutScreen compo={<PostCard content={blog}/>}/>
    </div>)
}