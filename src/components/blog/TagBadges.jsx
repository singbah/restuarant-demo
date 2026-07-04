import { useMemo, useState } from "react"
import useFetch from "../hooks/UseFetch";

export default function Tagbadges({tagSlug}){
    
    const [tags, setTags] = useState([]);
    const {data, loading, error} = useFetch(`/search/tag/${tagSlug}`)

    const tagStyle = 'rounded-2xl text-blue-300 mx-2 p-0.5 cursor-pointer active:scale-110 transition'
    return(<div className="inline p-2 active:scale-110">
        <h1>See Related Topic</h1>
        {data?data.map((tag, index) => <a className={tagStyle} key={index}>{tag.name},</a>):''}
        
    </div>)
}