import axios from "axios";
import { AlignRight, PencilIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SiTrueup } from "react-icons/si";

import useFetch from "../hooks/UseFetch";
import AlertCard from "../layouts/AlertCard";
import { AdminContext } from "./adminContext";
import PostLists from "../blog/PostLists";
import { API_URL, postBlog, getBlogs } from "../../../libs/api";
import { postDataFunc } from "../hooks/UsePost";
import dateFormator from "../../../libs/DateFormating";



export default function PostEditors({ postToEdit }) {

  const [postData, setPostData] = useState({photo:null, title:'', excert:'', content:'', published_at:'', published_time:'' });
  const {admin, adminFetch} = useContext(AdminContext)
  const [prevPic, setPrevPic] = useState(null);
  const [blogPost, setBlogPost] = useState([]);
  const [isloading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState('')


  const {data, loading, error, refetch} = useFetch(`${API_URL}posts/posts`)


  function handelForm(e) {
    const { name, value} = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }))
    return;
  };

  const deleteItem = async(data) =>{
    try{
      const resp = await axios.delete(`${API_URL}posts/delete?post_id=${data}`)
      const result = resp.data;
      refetch()
      return;
    }catch(error){
      console.log(error)
    }
  }

  async function submitMenuItem(e){
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData()

    for(let da in postData){
      formData.append(da, postData[da])
    }
    try{
      const response = await axios.post(`${API_URL}posts/create_post`,formData)
      const result = response.data;
      refetch()
      setIsLoading(false)
      setMsg(data.detail)
      console.log(data)
      return;
    }catch(error){
      console.log(error.response.data.detail)
      setIsLoading(false)
      setMsg(error.response.data.detail)
    }
  }

  if(isloading || loading) return(<div>Loading...</div>)

  return (<div className="flex flex-row m-2 w-full relative">
    
    <section className="overflow-y-auto m-2 w-2/3 flex flex-col items-center p-4">
      {msg&& (<AlertCard props={{message:msg}}/>)}

      <form
        onSubmit={submitMenuItem}
        className="flex flex-col p-2 border w-4/5 rounded-2xl">
          <h1 className="text-3xl font-bold text-center m-8">Add New Posts</h1>
        <label className="border-2 border-green-400 
          m-4 rounded-2xl p-1 flex justify-center 
          items-center bg-green-100 relative cursor-pointer">
          <img
            className="rounded-2xl w-fit"
            src={postToEdit?postToEdit.photo:prevPic?prevPic:null} alt="photo" />
          <input
            style={{ display: "none" }}
            onChange={(e) => {
              setPostData((prev) => ({ ...prev, photo: e.target.files[0] }));
              setPrevPic(URL.createObjectURL(e.target.files[0]))
            }}
            type="file"
            name="photo"
            className="" />
          <PencilIcon className="absolute bottom-0 right-0"/>
        </label>

        <label
          className="text-2xl font-bold"
        >Post Headline
        </label>
        <textarea 
            onChange={handelForm}
            required
            placeholder="headline of the post"
            value={postToEdit?postToEdit.title:postData.title}
            className="border mx-20 p-2 rounded-2xl text-2xl mb-6"
            type="text"
            name="title"
        ></textarea>

        <label className="text-2xl font-bold">Excert</label>
          <textarea 
            onChange={handelForm}
            required
            placeholder="short paragrah about the post"
            className="border mx-20 p-2 rounded-2xl h-35 text-2xl mb-6"
            value={postToEdit?postToEdit.excert:postData.excert}
            name="excert">
          </textarea>

        <label className="text-2xl font-bold"> Content </label>
          <textarea 
            required
            onChange={handelForm}
            placeholder="main content of the post"
            className="border mx-8 p-2 rounded-2xl h-45 text-2xl mb-6"
            value={postToEdit?postToEdit.content:postData.content}
            name="content">
          </textarea>

        <label
          className="text-2xl font-bold"
        >Post Date
          <input
            onChange={handelForm}
            required
            className="border m-2 rounded p-0.5 text-xl font-normal"
            type="date"
            name="published_at"
          />
        </label>

        <label
          className="text-2xl font-bold"
        >Post Time
          <input
            onChange={handelForm}
            className="border m-2 rounded p-0.5 text-xl font-normal"
            type="time"
            name="published_time"
          />
        </label>

        <button
          className="bg-green-400 mx-30 my-4 p-2 text-xl font-bold text-white rounded-2xl shadow"
          type="submit">Publish Now</button>
      </form>
    </section>

    <section className="m-2 w-1/3 overflow-y-auto bg-white p-2 rounded-2xl shadow">

      <div className="w-full overflow-y-auto">
        {data && data.map((blog, index) => 
        <li 
          className="p-2 m-4 list-none rounded-xl shadow shadow-black hover:scale-103 transition relative"
          onClick={() => setPostData({title:blog.title, excert:blog.excert, 
            published_at:blog.published_at,
            content:blog.content, photo:blog.featured_image})}
          key={blog.id}>
          <h4>{blog.title}</h4>
            <button 
              onClick={() => deleteItem(blog.id)}
              className="px-2 m-2 rounded text-white font-bold hover:scale-105 transition active:bg-red-900 bg-red-600">Delete</button>
          <p className="text-[10px] text-right bottom-0 text-gray-600 ">{dateFormator(blog.created_at)}</p>
        </li>)}
      </div>
    </section>

  </div>)
}