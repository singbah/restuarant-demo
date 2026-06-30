import { Download, DownloadIcon } from "lucide-react"
import ReactMarkDown from "react-markdown"

import { API_URL } from "../../../libs/api"
import Tagbadges from "./TagBadges"
import Inputs from "../ui/Inputs"
import dateFormator from "../../../libs/DateFormating"



export default function PostCard({content}){
    if(!content) return(<div>
        <h1>Can't find content</h1>
    </div>)

    return(<div className="p-4 m-2 rounded shadow-2xl overflow-y-auto">
        <h1 className="text-3xl font-bold p-4">{content.title}</h1>
        <img src={`${API_URL}posts/send_file?filename=${content.featured_image}`} alt="" />
        <h4>{content.excert}</h4>
        <ReactMarkDown>
            {content.content}
        </ReactMarkDown>
        <p>{dateFormator(content.created_at)}</p>
    </div>)

}