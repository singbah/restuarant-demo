
import { useState } from 'react'
import { API_URL, deleteStuff } from '../../../libs/api'
import dateFormator from '../../../libs/DateFormating'

export default function PostLists({container, action}){
    const [display, setDisplay] = useState(true)

    return(<div className="p-2 overflow-y-auto">
        <button>See All</button>
        {container?container.map((blog, index) =><div 
        onClick={() => action(blog)}
        className="p-2 border-white m-2 my-6 border-2 rounded-xl shadow shadow-black"
        key={index}>
            <p className="text-right">{blog.status}</p>
            <h1 className="text-xl font-bold">{blog.title}</h1>
            <p className="text-sm">{blog.excert}</p>
            <p className='text-gray-400 text-[10px] italic p-1'>{dateFormator(blog.created_at)}</p>
            {action?<article className='flex gap-20 justify-center items-center'>
                <button 
                
                className='px-6 py-1 bg-red-700 font-bold text-white rounded-xl'
                >Delete</button>
            </article>:"See More"}
        </div>):''}
    </div>)
};