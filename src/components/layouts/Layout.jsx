
import NavBar from "./navbar"
import {Footer1, Footer2} from "./Footer"


export default function LayoutScreen({compo}){
    return(<div 
    className="h-dvh flex flex-col relative">
        <NavBar/>
        {compo?compo:
        <div 
            className="flex-1 border-white m-1 
            gap-2
            border-2 overflow-y-auto flex flex-col lg:grid lg:grid-cols-2 lg:mx-20 ">
            <div className="border"></div>
            <div className="border"></div>
        </div>}
        <Footer2/>
    </div>)
}