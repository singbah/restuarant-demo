
export default function PostLists({container, action}){
    
    return(<div className="p-2 overflow-y-auto">
        <h1>see also</h1>
        {container?container.map((blog, index) =><div 
        onClick={() => action(blog)}
        className="p-2 border-white m-2 my-6 border-2 rounded-xl shadow shadow-black"
        key={index}>
            <p className="text-right">{blog.status}</p>
            <h1 className="text-xl font-bold">{blog.title}</h1>
            <p>{blog.excert}</p>
            <p>{blog.id}</p>
            <p>see more</p>
        </div>):''}
        <button>view more</button>
    </div>)
};