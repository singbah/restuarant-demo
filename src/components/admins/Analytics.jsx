import KyiCard from "../layouts/KYICard"
import { api } from "../../../libs/api"
import PostEditors from "./PostEditor"

import {formatDistanceToNow} from "date-fns"
import { MessageCircle, PhoneOutgoingIcon, PodcastIcon } from "lucide-react"
import { BsPeople } from "react-icons/bs"
import { FcNews } from "react-icons/fc"
import { useContext, useState, useEffect } from "react"
import { AdminContext } from "./adminContext"
import PageNotFound from "../pages/NotFound"
import Dashboard from "./dashboard"
import useFetch from "../hooks/UseFetch"
import { useParams } from "react-router-dom"
import { GiPhotoCamera } from "react-icons/gi"



export default function Analytics(){
    const {admin, refreshAdmin} = useContext(AdminContext)
    const [blogs, setBlogs] = useState([])
    const [subscribers, setSubscribers] = useState([])
    const [activeTap, setActiveTap] = useState(null)


    const {data, loading, error, refetch} = useFetch(`/admin/analytics`)
    
    useEffect(() =>{
        refreshAdmin()
        refetch()
    },[])

    return(<Dashboard component={<div className="w-full">
        {admin?(<section className="p-2 w-full overflow-x-hidden">
        {/* HEADER HERE */}
        {!loading?<>
            <section className="flex gap-4 justify-center items-center">
            <KyiCard title={"Visitors"} color={'blue'} value={"1K"} percentage={10} icon={<BsPeople 
            className="text-blue-700 bg-blue-200 p-1 rounded-xl" size={50}/>}/>

            <KyiCard title={"Comments"} color={'green'} value={"50"} percentage={-5} icon={<PhoneOutgoingIcon 
            className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

            <KyiCard title={"Total Posts"} color={'green'} value={data.posts_count} percentage={-5} icon={<GiPhotoCamera 
            className="text-purple-700 bg-purple-200 p-1 rounded-xl" size={50}/>}/>

            <KyiCard title={"Contact Messages"} color={'green'} value={data.contacts_count} percentage={5} icon={<MessageCircle 
            className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

            <KyiCard title={"Subscribers"} color={'green'} value={data.newsletters_count} percentage={5} icon={<FcNews 
            className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>
            
            </section>
        
            <section className="grid grid-cols-3 items-start">
            {/* RECENT CONTACTS */}
            <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                <h1 className="font-bold text-xl p-2">Recent Contacts</h1>
                {data.contacts.map((contact, index) => <div key={index} 
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{contact.name}</p>
                <p className="text-sm">{contact.email}</p>
                <p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{contact.status}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}</p>
                </div>)}
            </div>

            {/* RECENT POSTS */}
            <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                <h1 className="font-bold text-xl p-2">Recent Posts</h1>
                {data.posts?data.posts.map((blog, index) => <div key={index} 
                onClick={() => {
                    <PostEditors postToEdit={blog}/>
                    // setActiveTap('edit-post')
                }}
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{blog.title}</p>
                <p className="text-sm">{blog.excert}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}</p>
                {blog.status === "published"?<p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{blog.status}</p>:<p className="text-sm absolute top-2 right-2 text-red-700 bg-red-200 p-1 rounded-xl">{blog.status}</p>}
                </div>):''}
            </div>

            {/* RECENT NEWSLETTER SUBSCRIBERS */}
            <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                <h1 className="font-bold text-xl p-2">Recent Newsletter Subscribers</h1>
                {data.newsletter?data.newsletter.map((subscriber, index) => <div key={index} 
                className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                <p className="text-sm font-bold ">{subscriber.email}</p>
                <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true })}</p>
                </div>):''}
            </div>
            </section>
        </>:"Loading..."}
        </section>):<PageNotFound/>}
    </div>}/>)
}