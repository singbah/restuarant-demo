import { HomeIcon, MenuIcon } from "lucide-react";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa";
import NewsLetter from "../forms/NewsLetters";

function Footer1(){
    const footerP = "flex flex-col justify-center items-center px-4"
    return(<div 
    className="border-t-4 border-gray-600
    flex justify-center items-center pb-2 

    shadow-white">

        <footer className="flex justify-center items-center">
            <ul className="flex justify-start items-center font-bold gap-4">
                <p className={footerP}>
                    <a>Home</a>
                    <HomeIcon/>
                </p>
                
                <p className={footerP}>
                    <a>Menu</a>
                    <MenuIcon/>
                </p>

            </ul>
        </footer>
    </div>)
};

function Footer2(){
    return(<div className="m-0 lg:flex justify-center bottom-0 absolute w-full bg-white border-t-4 border-gray-300">
        {/* <NewsLetter/> */}
        <footer className="flex gap-6 p-2 justify-center items-center">
        <a 
        
        className="text-blue-500 text-2xl px-4 active:scale-110 hover:text-blue-800 cursor-pointer transition"
        ><FaFacebook/></a>
        <a 
        href="https://www.wa.me"
        className="text-red-500 text-2xl px-4 active:scale-110 hover:text-red-800 cursor-pointer transition"
        ><BsYoutube/></a>
        <a 
        href="https://www.wa.me"
        className="text-green-500 text-2xl px-4 active:scale-110 hover:text-green-800 cursor-pointer transition"
        ><FaWhatsapp/></a>
        <a className="text-black bg-white rounded-full p-1 text-xl 
            active:scale-110 hover:text-gray-800 cursor-pointer transition"
        href="https://www.wa.me"><FaTiktok/></a>
    </footer>
    </div>)
}

export {Footer1, Footer2}

