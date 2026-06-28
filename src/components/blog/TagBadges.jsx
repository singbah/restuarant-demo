import { useMemo, useState } from "react"
import { userFetch } from "../../../libs/api";

export default function Tagbadges(){
    const [tags, setTags] = useState([]);

    useMemo(() =>{
        userFetch("posts/tags")
        .then(res => setTags(res))
        .catch(err => console.log(err))
    }, [])
    const tagStyle = 'rounded-2xl text-blue-300 mx-2 p-0.5 cursor-pointer active:scale-110 transition'
    return(<div className="inline p-2 active:scale-110">
        {tags?tags.map((tag, index) => <a className={tagStyle} key={index}>{tag.name},</a>):''}
        
    </div>)
}