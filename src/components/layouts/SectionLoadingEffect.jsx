
export default function SectionLoading({
    open,
    title = "Notice",
    message,
    onClose,
    status='success'}){

        if(!open) return null
        return(<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-red-800 animate-[pulse_1.5s_ease-in-out_infinite]">
                {title?title:'Loading...'}</h1>
            <p className=" mt-6 text-gray-800 font-bold">
                    {message?message:"Please wait while we process your request."}
            </p>
            <button className="bg-red-500 mx-10 my-4 text-xl font-bold text-white rounded-2xl shadow active:scale-105 transition cursor-pointer"onClick={onClose}>Close</button>
            </div>
        </div>)
}