import { useReducer, useState, useEffect } from "react";
import Dashboard from "./dashboard";
import AlertCard from "../layouts/AlertCard";
import axios from "axios";
import { API_URL } from "../../../libs/api";
import { formatDistanceToNow} from "date-fns";
import LoadingEffect from "../layouts/LoadingEffect";



export default function ContactMessage(){
    const [msg, setMsg] = useState({title:'', message:"", open:false});
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(20)
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState([])
    const [mailTo, setMailTo] = useState({name:'', email:'', body:'', subject:'', })

    function handelMailTo(e){
        const {name, value} = e.target;
        setMailTo((prev) => ({...prev, [name]:value}))
    }
    async function getMessages(){
        setLoading(true)
        try{
            const response = await axios.get(API_URL + `admin/all-contacts?cursor=${Number(cursor)|| 0}&limit=${Number(hasMore)}`) 
            const data = response.data;
            setMessage(data.contacts)
            setCursor(data.cursor)
            setHasMore(data.last_id)
            setLoading(false)

        } catch (error) {
            console.error("Error fetching messages:", error.response?.data.detail || "An error Occur");
            setMsg({title:'Error', message: error.response?.data.detail | "Failed to fetch messages", open:true})
            setLoading(false)
        }
    }

    async function sendNewsletter(e){
        e.preventDefault();
        console.log(mailTo)
        setLoading(true)
        const user_data = {...mailTo}
        console.log(mailTo)

        try{
            const response = await axios.post(`${API_URL}admin/send_newsletter`, user_data);
            const data = response.data;
            setMsg({message:data.detail, title:"Success", open:true})
            setLoading(false)
            console.log(data);
            return;
        }catch(error){
            setMsg({message:"An error occur, check your internet connection", title:"Error", open:true})
            setLoading(false)
            console.log(error.response.data.detail)
        }
    }


    useEffect(() => {
        getMessages()
    }, [cursor])
    if(loading) return <LoadingEffect message={"Sending Email"} title={"Emailing"}/>
    
    return(<Dashboard component={<div className="border m-4 w-full flex flex-row">
        <AlertCard message={msg.message} title={msg.title} open={msg.open} onClose={() => setMsg({...msg, open: false})} />
        <div className="border w-full overflow-y-auto rounded-2xl">
            <h1>Conversation</h1>
            <form onSubmit={sendNewsletter} className="m-4 text-lg px-4">
                <h1>{mailTo.name}</h1>
                <p className="text-2xl mx-8 p-2 font-bold">Email </p>
                <input 
                    className="border mx-4 p-2 rounded-2xl text-xl mb-6"
                    onChange={handelMailTo}
                    // readOnly
                    value={mailTo.email}
                    type="email" 
                    name="email"/>
                
                <p className="text-2xl mx-8 p-2 font-bold"> Subject</p>
                <input 
                    className="border mx-4  p-2 rounded-2xl text-xl mb-6"
                    onChange={handelMailTo}
                    value={mailTo.subject}
                    type="text" name="subject"/>

                <p className="text-2xl mx-8 p-2 font-bold">Message</p>
               <textarea 
                    className="border p-4 mx-4 h-50 w-full rounded-2xl text-lg"
                    onChange={handelMailTo}
                    value={mailTo.message}
                    name="message"></textarea>
                <button
                    className="bg-green-500 px-4 py-2 rounded-2xl font-bold m-4 shadow shadow-black text-white" 
                    type="submit">Send Mail</button>
            </form>

         </div>

        <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 w-1/2 relative">
            <article className="flex justify-center items-center p-4 gap-4 text-lg border-b-2 border-gray-500">
                <button className="focus:border font-semibold focus:font-extrabold px-2 rounded focus:bg-green-300 transition text-gray-500 focus:scale-105">Subscribers</button>
                <button className="focus:border font-semibold focus:font-extrabold px-2 rounded focus:bg-green-300 transition text-gray-500 focus:scale-105">Contact Message</button>
            </article>
            {message.map((contact, index) => <div 
                key={index} 
                onClick={() => setMailTo((prev) => ({...prev, email:contact.email, name:contact.name}))}
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{contact.name}</p>
                <p className="text-sm">{contact.email}</p>
                <p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{contact.status}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}</p>
            </div>
            )}
            <button>see more</button>
        </div>
         
    </div>}/>)
}