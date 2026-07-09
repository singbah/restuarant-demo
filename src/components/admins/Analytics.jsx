import KyiCard from "../layouts/KYICard"
import { api } from "../../../libs/api"
import PostEditors from "./PostEditor"
import { viewFormater, Fdate } from "../../../libs/utilities"

import {formatDistanceToNow} from "date-fns"
import { MessageCircle, PhoneOutgoingIcon, PlusIcon, PodcastIcon, ViewIcon } from "lucide-react"
import { BsPeople } from "react-icons/bs"
import { FcNews } from "react-icons/fc"
import { useContext, useState, useEffect } from "react"
import { AdminContext } from "./adminContext"
import PageNotFound from "../pages/NotFound"
import Dashboard from "./dashboard"
import useFetch from "../hooks/UseFetch"
import { useNavigate, useParams } from "react-router-dom"
import { GiPhotoCamera } from "react-icons/gi"
import LoadingEffect from "../layouts/LoadingEffect"
import AlertCard from "../layouts/AlertCard"



export default function Analytics(){
    const {admin, refreshAdmin} = useContext(AdminContext)
    const [blogs, setBlogs] = useState([])
    const [subscribers, setSubscribers] = useState([])
    const [activeTap, setActiveTap] = useState(null)
    const [msg, setMsg] = useState({msg:"", open:false, status:"", title:'', action:null})

    const {data, loading, error, refetch} = useFetch(`/admin/analytics`)
    const navigate = useNavigate()
    
    useEffect(() =>{
        refreshAdmin()
        refetch()
    },[])

    async function deleteContact(contactId, type){
        let url = ''

        type==="contact"?url=`/admin/contact?contact_id=${contactId.id}`:url=`/admin/unsubscribe?subscriber_id=${contactId.id}`
        try{
            const response = await api.delete(url)
            const data = response.data;
            console.log(data)
            setMsg({open:true, title:"success", status:"success", msg:data.detail || "user deleted"})
            refetch()
        }catch(error){
            console.log(error)
            setMsg({open:true, title:"error", status:"success", msg:error.response?.data.detail || "An error Occur while  deleting"})
        }
    };

    async function publishPost(post_id){
        try{
            const resp = await api.patch(`/admin/publish_post?post_id=${post_id}`)
            const result = resp.data;
            refetch()
        }catch(error){
            console.log(error)
        }
    }

    return(<Dashboard component={<div className="w-full overflow-y-auto">
        {admin?(<section className="p-2 w-full overflow-x-hidden">
        {/* HEADER HERE */}
        {!loading?<>
            <AlertCard message={msg.msg} title={msg.title} open={msg.open} onClose={() => setMsg({open:false})} action={msg.action}/>
            <section className="flex gap-4 justify-center items-center">
                <KyiCard title={"Visitors"} color={'blue'} value={viewFormater(10)} percentage={10} icon={<BsPeople 
                className="text-blue-700 bg-blue-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Posts Views"} color={'green'} value={viewFormater(data && data.views)} percentage={+10} icon={<ViewIcon 
                className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Total Posts"} color={'green'} value={data?data.posts_count:0} percentage={-5} icon={<GiPhotoCamera 
                className="text-purple-700 bg-purple-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Contact Messages"} color={'green'} value={data?data.contacts_count:0} percentage={5} icon={<MessageCircle 
                className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Subscribers"} color={'green'} value={data?data.newsletters_count:0} percentage={5} icon={<FcNews 
                className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>
            </section>

            <section className="p-4 flex justify-center items-center">
                <div>
                    most view posts
                </div>
            </section>
        
            <section className="grid grid-cols-3 items-start">
                
                {/* RECENT POSTS */}
                <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/post/editor")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Posts</h1>
                    {data && data.posts.length>0?data.posts.map((blog, index) => <div key={index} 
                    onClick={() => {
                        <PostEditors postToEdit={blog}/>
                        // setActiveTap('edit-post')
                    }}
                    className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                    <p className="text-sm font-bold ">{blog.title}</p>
                    <p className="text-sm">{blog.excert}</p>
                    <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(blog.created_at), { addSuffix: true })}</p>
                    {blog.status === "true"?
                    <p 
                        onClick={() => publishPost(blog.id)}
                        className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{blog.status}</p>:
                    <p 
                        onClick={() => publishPost(blog.id)}
                        className="text-sm absolute top-2 right-2 text-red-700 bg-red-200 p-1 rounded-xl">{blog.status}</p>}
                    </div>):<button 
                        onClick={() => navigate("/admin/post/editor")}  
                        className="m-4 p-4 bg-green-600 rounded-2xl font-black text-white text-2xl cursor-pointer hover:bg-green-800 active:scale-110 transition"> Add New Post <PlusIcon className="inline" size={35}/></button>}
                </div>

                {/* RECENT CONTACTS */}
                <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/messages")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Contacts</h1>
                    {data && data.contacts.map((contact, index) => <div key={index} 
                    className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative hover:scale-102 transition cursor-pointer">
                    <p className="text-sm font-bold ">{contact.name}</p>
                    <p className="text-sm">{contact.email}</p>
                    <p className="text-sm absolute top-2 right-2 text-green-700 bg-green-200 p-1 rounded-xl">{contact.status}</p>
                    <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}</p>
                    <button 
                        onClick={() => setMsg({title:"Delete contact", msg:"You will delete this contact", open:true, status:"error", action:() => deleteContact(contact, "contact")})}
                        className="px-4 bg-red-600 rounded-lg font-bold text-white absolute right-2 bottom-2 shadow shadow-black active:scale-105 active:bg-red-800 transition"> Delete </button>
                    </div>)}
                </div>

                {/* RECENT NEWSLETTER SUBSCRIBERS */}
                <div className="overflow-y-auto border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/messages")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Newsletter Subscribers</h1>
                    {data && data.newsletter.map((subscriber, index) => <div key={index} 
                    className="p-2 m-2 border-2 rounded-xl shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                    <p className="text-sm font-bold ">{subscriber.email}</p>
                    <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(subscriber.created_at), { addSuffix: true })}</p>
                    <button 
                        onClick={() => setMsg({title:"Delete contact", msg:"You will delete this contact", open:true, status:"error", action:() => deleteContact(subscriber)})}
                        className="px-4 bg-red-600 rounded-lg font-bold text-white absolute right-2 bottom-2 shadow shadow-black active:scale-105 active:bg-red-800 transition"> Delete </button>
                    </div>)}
                
                </div>
            </section>
        </>:<LoadingEffect/>}
        </section>):<PageNotFound/>}
    </div>}/>)
}