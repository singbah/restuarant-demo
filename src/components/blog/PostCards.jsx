import { Download, DownloadIcon } from "lucide-react"
import { API_URL } from "../../../libs/api"
import Tagbadges from "./TagBadges"
import Inputs from "../ui/Inputs"


export default function PostCard({content}){
    return(<div className="p-4 m-2 rounded shadow-2xl overflow-y-auto">
        <h1 className="text-3xl font-bold p-4">{content.title}</h1>
        <img src={`${API_URL}posts/send_file?filename=${content.featured_image}`} alt="" />
        <h4>{content.excert}</h4>
        <p className="px-4">{content.content}</p>
        <p>{content.created_at}</p>
        <Inputs placeholder={'enter text here'}/>
        <Tagbadges/>
    </div>)

}