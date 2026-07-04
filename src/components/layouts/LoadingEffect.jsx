import { useState } from "react";

export default function LoadingEffect({title, message}){
    const [cancelled, setCancelled] = useState(false);
    
    return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-red-800 animate-[pulse_1.5s_ease-in-out_infinite]">
                    {title?title:'Loading...'}
                </h2>
                <p className="mt-4 text-gray-600">
                    {message?message:"Please wait while we process your request."}
                </p>
            </div>
        </div>
    </div>)
}