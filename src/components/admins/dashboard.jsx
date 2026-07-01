import { useContext, useEffect, useMemo, useState } from "react"
import { AdminContext } from "./adminContext"
import { BsCashStack, BsPeople } from "react-icons/bs"
import NavigationBar from "./adminNavBar"

import axios from "axios"
import PostEditors from "./PostEditor"
import KyiCard from "../layouts/KYICard"
import PostLists from "../blog/PostLists"
import { getBlogs } from "../../../libs/api"
import useFetch from '../hooks/UseFetch'

import { MessageCircle } from "lucide-react"
import { useFetcher } from "react-router-dom"


export default function Dashboard() {

  const navStyle = "font-bold cursor-pointer hover:scale-105 transition"
  const { admin, errorMsg, setErrorMsg, refreshAdmin  } = useContext(AdminContext)
  const [itemPhoto, setItemPhoto] = useState(null)
  const [activeTap, setActiveTap] = useState(null)

  const {data, loading, error} = useFetch("http://127.0.0.1:8000/posts/posts")


  useEffect(() =>{
    refreshAdmin()
  },[])

  if (!admin) {
    return (<div>
    <a href="/admin/login">You Must Login</a>
  </div>) }
  
  return (<div className="h-dvh flex bg-gray-100">
    <NavigationBar tapFunc={setActiveTap}/>
    
    {activeTap === null && (    <section className="p-2 w-full overflow-x-hidden">
      {/* HEADER HERE */}

      <section className="flex overflow-x-auto p-2 justify-center gap-2 w-250">
        <KyiCard title={"Visitors"} color={'blue'} value={"1K"} percentage={10} icon={<BsPeople 
        className="text-blue-700 bg-blue-200 p-1 rounded-xl" size={50}/>}/>

        <KyiCard title={"Comments"} color={'green'} value={"50"} percentage={5} icon={<MessageCircle 
        className="text-green-700 bg-green-200 p-1 rounded-xl" size={50}/>}/>
        
      </section>

      <section className="grid grid-cols-3">
        <PostLists container={data?data:[]}/>
        <PostLists container={data?data:[]}/>
        <PostLists container={data?data:[]}/>
      </section>

    </section>)}

    
    {activeTap === 'edit-post' && (<PostEditors/>)}


  </div>)
}