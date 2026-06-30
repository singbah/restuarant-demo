
import dateFormator from '../../../libs/DateFormating'

export default function PostLists({container}){
    
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
            <p>see more</p>
        </div>):''}
        <button>view more</button>
    </div>)
};