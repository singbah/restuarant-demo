import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBars(){
    const [display, setDisplay] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [results, setResults] = useState([])

    const navigate = useNavigate(null)

    const barDisappear = async(item) =>{
        try{
            const resp = await axios.get(`http://127.0.0.1:8000/posts/search/blog?q=${item}`);
            const data = resp.data;
            setResults(data);
            setDisplay(true)
            return;
        }catch(error){
            console.log(error)
        }finally{
            // setDisplay(false)
        }
    }

    return(<div className="relative">
        <section
            style={{display:display?"block":"none"}}
            className="h-100 shadow shadow-black p-2 absolute top-4 m-5 bg-white w-80 rounded-xl ">

            {results.map((tags, index) => <li 
                onClick={() => navigate(`/blog/${tags.slug}`, {state:item})}
                key={index}>{tags.title}</li>)}
        </section>
        <article
        className="flex m-2 relative"
        >
        <SearchIcon 
            onClick={() => barDisappear(inputValue)}
            className="absolute right-1 top-1 
            active:text-blue-900
            cursor-pointer active:scale-105 text-blue-700 transition"/>
        <input 
            onFocus={() => setDisplay(true)}
            onBlur={() => setDisplay(false)}
            onChange={(e) => setInputValue(e.target.value)}
            type="text" 
            name="search" 
            className="w-full p-1 rounded-xl shadow shadow-black"/>
    </article>
    </div>)
}