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
                <KyiCard title={"Visitors"} color={'blue'} value={viewFormater(data && data.visitor_count)} percentage={10} icon={<BsPeople 
                className="text-blue-700 bg-blue-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Posts Views"} color={'green'} value={viewFormater(data && data.views)} percentage={+10} icon={<ViewIcon 
                className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Total Posts"} color={'green'} value={data?data.posts_count:0} percentage={-5} icon={<GiPhotoCamera 
                className="text-purple-700 bg-purple-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Contact Messages"} color={'yellow'} value={data?data.contacts_count:0} percentage={5} icon={<MessageCircle 
                className="text-yellow-700 bg-yellow-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Comments"} color={'green'} value={data?data.comments_count:0} percentage={5} icon={<MessageCircle 
                className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>

                <KyiCard title={"Subscribers"} color={'orange'} value={data?data.newsletters_count:0} percentage={5} icon={<FcNews 
                className="text-orange-700 bg-orange-200 p-1 rounded-xl" size={50}/>}/>
            </section>

            <section className="grid grid-cols-3 items-start">
                {/* RECENT COMMENTS */}
                <div className="overflow-y-auto border-2 bg-green-100 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/post/editor")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Comments</h1>
                    {data && data.comments.map((comment) => <div
                        className="p-2 m-2 border-2 rounded-xl shadow bg-white shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                        <p className="font-bold px-4 py-2">{comment.user_email}</p>
                        <p>{comment.comment}</p>
                    </div>)}
                </div>

                {/* RECENT VISITORS */}
                <div className="overflow-y-auto border-2 bg-blue-100 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/post/editor")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent visitors</h1>
                    {data && data.visitors.map((visitor) => <div
                        className="p-2 m-2 border-2 rounded-xl shadow bg-white shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
                        <p className="font-bold px-4 py-2">{visitor.ip_address}</p>
                        <p>{visitor.path}</p>
                    </div>)}
                </div>

            </section>
        
            <section className="grid grid-cols-3 items-start">
                
                {/* RECENT POSTS */}
                <div className="overflow-y-auto border-2 bg-purple-100 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/post/editor")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Posts</h1>
                    {data && data.posts.length>0?data.posts.map((blog, index) => <div key={index} 
                    onClick={() => {
                        <PostEditors postToEdit={blog}/>
                        // setActiveTap('edit-post')
                    }}
                    className="p-2 m-2 border-2 rounded-xl bg-white shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
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
                <div className="overflow-y-auto bg-yellow-100 border-2 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/messages")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Contacts</h1>
                    {data && data.contacts.map((contact, index) => <div key={index} 
                    className="p-2 m-2 border-2 rounded-xl bg-white shadow shadow-black relative hover:scale-102 transition cursor-pointer">
                    <p className="text-sm font-bold ">{contact.name}</p>
                    <p className="text-sm">{contact.email}</p>
                    <p className="text-sm absolute top-2 right-2 text-yellow-700 bg-yellow-200 p-1 rounded-xl">{contact.status}</p>
                    <p className='text-gray-400 text-[10px] italic p-1'>{formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}</p>
                    <button 
                        onClick={() => setMsg({title:"Delete contact", msg:"You will delete this contact", open:true, status:"error", action:() => deleteContact(contact, "contact")})}
                        className="px-4 bg-red-600 rounded-lg font-bold text-white absolute right-2 bottom-2 shadow shadow-black active:scale-105 active:bg-red-800 transition"> Delete </button>
                    </div>)}
                </div>

                {/* RECENT NEWSLETTER SUBSCRIBERS */}
                <div className="overflow-y-auto border-2 bg-orange-100 border-gray-200 rounded-xl shadow shadow-black p-2 m-2 h-96">
                    <h1 
                        onClick={() => navigate("/admin/messages")}
                        className="font-bold text-xl p-2 cursor-pointer">Recent Newsletter Subscribers</h1>
                    {data && data.newsletter.map((subscriber, index) => <div key={index} 
                    className="p-2 m-2 border-2 rounded-xl bg-white shadow shadow-black relative overflow-y-auto hover:scale-102 transition cursor-pointer">
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