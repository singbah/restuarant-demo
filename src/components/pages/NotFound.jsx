import { HiStatusOffline } from "react-icons/hi";
import { RiCloudOffLine } from "react-icons/ri";
import { useLocation, useParams } from "react-router-dom";


export default function PageNotFound({url}){
    const {stuff} = useParams();
    const currentPath = useLocation();

    console.log(currentPath)
    return(<div className="bg-red-100 flex m-10 shadow shadow-red-600 rounded-2xl h-100 items-center justify-center">
        <div>
            <RiCloudOffLine 
                className="text-6xl font-bold text-red-700 text-center"
                size={100}/>
        <h1 className="text-3xl font-bold text-center text-red-700">Page Not found</h1>
        <a 
            onClick={() => window.location.reload()}
        className="text-blue-700 text-xl cursor-pointer active:text-red-500 hover:scale-105 transition -underline-offset-1">try again</a>
        </div>
    </div>)
}