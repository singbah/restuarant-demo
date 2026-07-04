import axios from "axios";
import { AlignRight, PencilIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SiTrueup } from "react-icons/si";

import useFetch from "../hooks/UseFetch";
import AlertCard from "../layouts/AlertCard";
import { AdminContext } from "./adminContext";
import PostLists from "../blog/PostLists";
import { api, postBlog, getBlogs } from "../../../libs/api";
import { postDataFunc } from "../hooks/UsePost";
import { formatDistanceToNow } from "date-fns";
import Dashboard from "./dashboard";
import LoadingEffect from "../layouts/LoadingEffect";



export default function PostEditors({ postToEdit }) {

  const [postData, setPostData] = useState({
    photo:null, title:'', excert:'', tags:'',
    content:'', published_at:'', published_time:'' });
  const {admin, adminFetch} = useContext(AdminContext)
  const [prevPic, setPrevPic] = useState(null);
  const [blogPost, setBlogPost] = useState([]);
  const [loading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [lastId, setLastId] = useState(null);

  const [msg, setMsg] = useState({open:false, title:'', message:''})


  async function fetchBlogs() {
    setIsLoading(true)
    try {
      const resp = await api.get(`/posts/posts?cursor=${Number(lastId) || 0}&limit=20`)
      const data = resp.data;
      setBlogPost((prev) => ([...prev, ...data.posts]))
      console.log(lastId)
      setLastId(data.last_id)
      setHasMore(data.has_more)
      setIsLoading(false)
      return;
    } catch (error) {
      console.log(error)
      setMsg({open:true, title:'Error', message:error.response.data.detail||"Failed to fetch posts"})
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])


  function handelForm(e) {
    const { name, value} = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }))
    return;
  };

  const deleteItem = async(data) =>{
    try{
      const resp = await api.delete(`posts/delete?post_id=${data}`)
      const result = resp.data;
      setMsg({open:true, title:'Success', message:'Post deleted successfully'})
      setBlogPost((prev) => prev.filter((post) => post.id !== data))
      return;
    }catch(error){
      console.log(error)
      setMsg({open:true, title:'Error', message:'Failed to delete post'})
    }
  }

  async function submitMenuItem(e){
    setIsLoading(true)
    e.preventDefault();
    const formData = new FormData()

    formData.append("title", postData.title);
    formData.append("excert", postData.excert);
    formData.append("content", postData.content);
    formData.append("published_at", postData.published_at);
    formData.append("published_time", postData.published_time);
    formData.append("tags", postData.tags);

    if (postData.photo instanceof File) {
      formData.append("photo", postData.photo);
    }


    try{
      const response = await api.post(`/posts/create_post`,formData)
      const result = response.data;
      setIsLoading(false)
      setMsg({open:true, title:'Success', message:'Post created successfully'})
      fetchBlogs()
      setPostData({
        photo: null,
        title: "",
        excert: "",
        tags: "",
        content: "",
        published_at: "",
        published_time: ""
      });
      setPrevPic(null);
      return;
    }catch(error){
      console.log(error)
      setIsLoading(false)
      setMsg({open:true, title:'Error', message:"Failed to create post"})
    }
  }

  if(loading) return(<LoadingEffect/>)

  return (<Dashboard component={<div className="flex flex-row m-2 w-full relative">
      <AlertCard
        open={msg.open}
        title={msg.title}
        message={msg.message}
        onClose={() => setMsg({open:false, title:'', message:''})}
      />
    <section className="overflow-y-auto my-2 w-2/3 flex flex-col items-center">
      
      <form
        onSubmit={submitMenuItem}
        className="flex flex-col p-2 border rounded-2xl">
          <h1 className="text-3xl font-bold text-center m-8">Add New Posts</h1>
        <label className="border-2 border-green-400 
          m-4 rounded-2xl p-1 flex justify-center 
          items-center bg-green-100 relative cursor-pointer">
         <img
            className="rounded-2xl w-fit"
            src={
              prevPic ||
              postToEdit?.featured_image ||
              null
            }
            alt="photo"
            />
          <input
            style={{ display: "none" }}
            onChange={(e) => {
              setPostData((prev) => ({ ...prev, photo: e.target.files[0]}));
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
          <select
            onChange={handelForm}
            required
            className="border m-2 rounded p-0.5 text-xl font-normal"
            name="published_time"
          >
            <option value="">Select Time</option>
            <option value="publish">Publish Now</option>
            <option value="draft">Schedule for Later</option>
          </select>
        </label>

        <h1 className="text-3xl font-bold text-center m-8">Add Post Tags</h1>
          <input
          className='border'
            onChange={handelForm}
            required
            placeholder="Add tags for the post separated by commas"
            className="border mx-20 p-2 rounded-2xl text-2xl mb-6"
            type="text"
            name="tags"
          />

        <button
          className="bg-green-400 mx-30 my-4 p-2 text-xl font-bold text-white rounded-2xl shadow"
          type="submit">Publish Now</button>
      </form>

    </section>

    <section className="m-2 w-1/3 overflow-y-auto bg-white p-2 rounded-2xl shadow">

      <div className="w-full overflow-y-auto">
        {blogPost && blogPost.map((blog, index) => 
        <li 
          className="p-2 m-4 list-none rounded-xl shadow shadow-black hover:scale-103 transition relative"
          onClick={() => setPostData({title:blog.title, excert:blog.excert, 
            published_at:blog.published_at,
            content:blog.content, photo:blog.featured_image})}
          key={index}>
          <h4>{blog.title}</h4>
            <button 
              onClick={() => deleteItem(blog.id)}
              className="px-2 m-2 rounded text-white font-bold hover:scale-105 transition active:bg-red-900 bg-red-600">Delete</button>
          <p className="text-[10px] text-right bottom-0 text-gray-600 ">{formatDistanceToNow(blog.created_at)}</p>
        </li>)}
        <button
          onClick={fetchBlogs}
          className="bg-green-400 mx-30 my-4 p-2 font-bold text-white rounded-2xl shadow">More</button>
      </div>
    </section>

  </div>}/>)
}