import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { SiTrueup } from "react-icons/si";

import useFetch from "../hooks/UseFetch";
import { AdminContext } from "./adminContext";
import PostLists from "../blog/PostLists";
import { getBlogs } from "../../../libs/api";


export default function PostEditors({ menu_item }) {

  const [postData, setPostData] = useState({featured_image:null, title:'', excert:'', content:'', published_at:'',  });
  const {admin, adminFetch} = useContext(AdminContext)
  const [prevPic, setPrevPic] = useState(null);
  const [blogPost, setBlogPost] = useState([]);
  
  const reqKey = useRef()

  const {data, loading, error} = useFetch("http://127.0.0.1:8000/posts/posts")

  function handelForm(e) {
    const { name, value} = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }))
    return;
  };

  function submitMenuItem(e){
    e.preventDefault();
    console.log(postData)
  }

  return (<div className="flex flex-row m-2 w-full relative">
    
    <section className="overflow-y-auto m-2 w-2/3 flex flex-col items-center p-4">
      
      <form
        onSubmit={submitMenuItem}
        className="flex flex-col p-2 border w-4/5 rounded-2xl">
          <h1 className="text-3xl font-bold text-center m-8">Add New Posts</h1>
        <label className="border-2 border-green-400 
          m-4 rounded-2xl p-1 flex justify-center 
          items-center bg-green-100 relative cursor-pointer">
          <img
            className="rounded-2xl w-fit"
            src={menu_item?menu_item.photo:prevPic?prevPic:null} alt="photo" />
          <input
            style={{ display: "none" }}
            onChange={(e) => {
              setPostData((prev) => ({ ...prev, featured_image: e.target.files[0] }));
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
            value={menu_item?menu_item.title:postData.title}
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
            value={menu_item?menu_item.excert:postData.excert}
            name="excert">
          </textarea>

        <label className="text-2xl font-bold"> Content </label>
          <textarea 
            required
            onChange={handelForm}
            placeholder="main content of the post"
            className="border mx-8 p-2 rounded-2xl h-45 text-2xl mb-6"
            value={menu_item?menu_item.content:postData.content}
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

        <button
          className="bg-green-400 mx-30 my-4 p-2 text-xl font-bold text-white rounded-2xl shadow"
          type="submit">Publish Now</button>
      </form>
    </section>

    <section className="m-2 w-1/3 overflow-y-auto bg-white p-2 rounded-2xl shadow">

      <div className="w-full overflow-y-auto">
        <PostLists container={data}/>
      </div>
    </section>

  </div>)
}