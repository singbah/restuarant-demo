import { ArrowUp } from "lucide-react"


export default function CommentsBlock({handelComment, sendComment}){
    return(<div>
        <article className="w-full border-2 rounded-2xl relative flex">
            <textarea 
                className="border w-full p-4 rounded-2xl"
                placeholder="Comment prices in your local community"
                required
                onChange={handelComment}
                name="comment"/>
            <ArrowUp 
                onClick={sendComment}
                className="absolute right-0 bottom-0 text-blue-700 active:scale-101 cursor-pointer rounded-3xl m-2" size={35}/>
        </article>
    </div>)
}