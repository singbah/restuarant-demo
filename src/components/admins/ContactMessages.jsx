import { useReducer, useState, useEffect, act, useMemo } from "react";
import Dashboard from "./dashboard";
import AlertCard from "../layouts/AlertCard";
import axios from "axios";
import { api } from "../../../libs/api";
import { formatDistanceToNow} from "date-fns";
import LoadingEffect from "../layouts/LoadingEffect";
import Fdate from '../../../libs/utilities'



export default function ContactMessage(){
    const [msg, setMsg] = useState({title:'', message:"", open:false});
    const [mailTo, setMailTo] = useState({name:'', email:'', body:'', subject:'', type:''})

    const [message, setMessage] = useState([])
    const [cursor, setCursor] = useState(null);
    const [hasMore, setHasMore] = useState(20)

    const [newletters, setNewsletters] = useState([])
    const [lastLid, setLastId] = useState(null)
    const [limit, setLimit] = useState(20)
    const [activeTab, setActiveTab] = useState(null)
    const [loading, setLoading] = useState(true)
    const [switchUser, setSwitchUser] = useState(null)

    function handelMailTo(e){
        const {name, value} = e.target;
        setMailTo((prev) => ({...prev, [name]:value}))
    }
    async function getMessages(){
        setLoading(true)
        try{
            const response = await api.get(`/admin/all-contacts?cursor=${Number(cursor)|| 0}&limit=${Number(hasMore)}`) 
            const data = response.data;
            setMessage(data.contacts)
            setCursor(data.cursor)
            setHasMore(data.has_more)
            setLoading(false)

        } catch (error) {
            console.error("Error fetching messages:", error.response?.data.detail || "An error Occur");
            setMsg({title:'Error', message: error.response?.data.detail | "Failed to fetch messages", open:true})
            setLoading(false)
        }
    }

    async function getNewsLetter(){
        setLoading(true)
        try{
            const response = await api.get(`/admin/all-newsletters?cursor=${Number(lastLid)|| 0}&limit=${Number(limit)}`) 
            const data = response.data;
            setNewsletters(data.newsletters)
            console.log(data)
            setLastId(data.cursor)
            setLimit(data.has_more)
            setLoading(false)

        } catch (error) {
            console.error("Error fetching messages:", error.response?.data.detail || "An error Occur");
            setMsg({title:'Error', message: error.response?.data.detail | "Failed to fetch messages", open:true})
            setLoading(false)
        }
    }

    async function sendNewsletter(e){
        e.preventDefault();
        setLoading(true)
        const user_data = {...mailTo}
        console.log(mailTo)

        try{
            const response = await api.post(`/admin/send_newsletter`, user_data);
            const data = response.data;
            setMsg({message:data.detail, title:"Success", open:true})
            setLoading(false)
            console.log(data);
            return;
        }catch(error){
            setMsg({message:"Email didn't go.", status:"error", title:"Error", open:true})
            setLoading(false)
        }
    }


    useEffect(() => {
        getNewsLetter()
        getMessages()
    }, [])
    if(loading) return <LoadingEffect />
    
    return(<Dashboard component={<div className="m-4 w-full flex flex-row">
        <AlertCard message={msg.message} title={msg.title} open={msg.open} onClose={() => setMsg({...msg, open: false})} />
        <div className="border w-full overflow-y-auto rounded-2xl">
            <h1 className="p-4 mx-4 text-3xl text-center font-bold">Conversation</h1>
            {activeTab === null && (<div>
                <h1 className="text-2xl font-bold m-2 p-4"
                    >Username : {mailTo.name}</h1>
                <p  className="px-4 font-semibold italic ">User Email : {mailTo.email}</p>
                <div className="p-4 m-4 border rounded-2xl bg-green-100 text-lg">
                    <p className="font-black text-sm">{mailTo.subject}</p>
                    <p className="p-4 text-lg">{mailTo.message}</p>
                    < a 
                        className="text-blue-500 italic underline cursor-pointer"
                        href={mailTo.source} >{mailTo.source}</a>
                </div>
                <button
                    className="bg-green-600 px-8 py-2 text-lg font-bold text-white rounded-lg m-8 hover:scale-105 active:bg-green-800 transition" 
                    onClick={() => setActiveTab("send-mail")}>Email Now</button>
            </div>)}
            
            {activeTab === "send-mail" && (<form onSubmit={sendNewsletter} className="m-4 text-lg px-4">
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
                    type="text" name="subject"/>

                <p className="text-2xl mx-8 p-2 font-bold">Message</p>
               <textarea 
                    className="border p-4 mx-4 h-50 w-full rounded-2xl text-lg"
                    onChange={handelMailTo}
                    name="message"></textarea>
                <button
                    className="bg-green-500 px-4 py-2 rounded-2xl font-bold m-4 shadow shadow-black text-white" 
                    type="submit">Send Mail</button>
            </form>)}
         </div>

        <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 w-1/2 relative">
            <article className="flex justify-center items-center p-4 gap-4 text-lg border-b-2 border-gray-500">
                <button 
                    onClick={() => setSwitchUser(null)}
                    className="focus:border font-semibold focus:font-extrabold px-2 rounded focus:bg-green-300 transition text-gray-500 focus:scale-105">Subscribers</button>
                <button 
                    onClick={() => setSwitchUser("message")}
                    className="focus:border font-semibold focus:font-extrabold px-2 rounded focus:bg-green-300 transition text-gray-500 focus:scale-105">Contact Message</button>
            </article>
            {/* NEWSLETTER SUBSCRIBERS */}
            {switchUser === null && newletters.map((subscriber, index) => <div 
                key={index} 
                onClick={() => {
                    setMailTo((prev) => ({...prev, email:subscriber.email, name:subscriber.name, message:subscriber.message, subject:subscriber.subject, type:"newsletter"}))
                    setActiveTab('send-mail')
                }}
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{subscriber.email}</p>
                <p className="text-sm">{subscriber.subject}</p>
                <p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{subscriber.status}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{Fdate(subscriber.created_at)}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{Fdate(subscriber.last_open)}</p>
            </div>
            )}

            {switchUser === 'message' && message.map((contact, index) => <div 
                key={index} 
                onClick={() => {
                    setMailTo((prev) => ({...prev, email:contact.email, name:contact.name, message:contact.message, subject:contact.subject, type:'contact', source:contact.source}))
                    setActiveTab(null)
                }}
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{contact.email}</p>
                <p className="text-sm">{contact.subject}</p>
                <p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{contact.status}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{Fdate(contact.created_at)}</p>
            </div>
            )}
            <button>see more</button>
        </div>
         
    </div>}/>)
}