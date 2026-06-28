
export default function NewsLetter(){
    return(<div className="flex flex-col p-2 text-sm text-white bg-black">
        <h1 className="text-xl font-bold">Newsletter</h1>
        <p>signup for our newsletter</p>
        <p></p>
        <form className="flex flex-col gap-2 m-2">
            <label className="">
                Email <input 
                    className="border rounded-xl px-2"
                    type="text" 
                    placeholder="your@email.com"
                    required
                    name="email"/>
            </label>

            <label className="">
                Name <input 
                    className="border px-4 rounded-xl"
                    type="text" 
                    name="name"/>
            </label>
            <button className="bg-blue-500 font-bold text-white active:scale-105 active:bg-blue-800 mx-10 shadow shadow-black rounded-xl transition">Submit</button>
        </form>
    </div>)
}