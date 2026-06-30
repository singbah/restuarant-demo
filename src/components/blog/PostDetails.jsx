import { useLocation, useParams } from "react-router-dom"
import { Helmet } from "react-helmet";
import ReactMarkDown from "react-markdown"

import useFetch from "../hooks/UseFetch";
import PostCard from "./PostCards";
import LayoutScreen from "../layouts/Layout";
import { API_URL } from "../../../libs/api";
import logo from '../../logo.jpg'
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";


export default function PostsDetails({}){
    const {postSlug} = useParams();
    const urlLocation = useLocation()
    const blog = urlLocation.state
    const pathname = urlLocation.pathname

    const {data, loading, error} = useFetch(`${API_URL}posts${pathname}`)

    const postUrl = `${API_URL}${postSlug}`
    
    if(!data) return(<div>'loading ...'</div>)

    const articleSchema = {
        "@context":"https://schema.org",
        "@type":"Article",
        "headline":`${data.title}`,
        "description":data.excert,
        "image":`${API_URL}posts/send_file?filename=${data.featured_image}`,
        "datePublished":data.published_at,
        "author":{
            "name":"John P. Singbah"
        },
        "publisher":{
            "@type":"Organization",
            "name":"Easi Tech Lr.",
            "logo":{
                "@type":"imageObject",
                "url":logo
            }
        },
        "mainEntityOfPage":postUrl
    }

    return(<LayoutScreen compo={
        <div>
        <Helmet>
            <title>{data.title} | Easi Tech</title>
            <meta name="description" content={data.content}  />
            <link rel="canonical" href={`${API_URL}/posts/${postSlug}`} />
            <script type="application/id+json">{JSON.stringify(articleSchema)}</script>
        </Helmet>

        <article className="p-2">
            <h1 className="text-3xl font-bold p-2">{data.title}</h1>
            <img 
                className="rounded"
                src={`${API_URL}posts/send_file?filename=${data.featured_image}`} alt="photo.jpg"/>
            <p>{data.excert}</p>
            <ReactMarkDown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}>
                {data.content}
            </ReactMarkDown>
            
        </article>
    
    </div>
    }/>)
}