import { useState } from "react"

export default function NewsLetter(){
    const [userData, setUserData] = useState({name:'', email:''});

    function handelForm(e){
        const {value, name} = e.target;
        setUserData((prev) => ({...prev, [name]:value}))
    }

    async function submit(e) {
        e.preventDefault();
        const source = window.location.href;
        const data = {...userData, source:source}
        console.log(data)

    }
    return(<div className="flex flex-col p-2 text-sm justify-center items-center">
        <h1 className="text-xl font-bold">Newsletter</h1>
        <p>signup for our newsletter</p>
        <p></p>
        <form 
            onSubmit={submit}
            className="flex flex-col gap-4 m-2">
            <label className="">
                Email <input 
                    className="border rounded-xl px-2"
                    type="text" 
                    placeholder="your@email.com"
                    onChange={handelForm}
                    required
                    name="email"/>
            </label>

            <label className="">
                Name <input 
                    className="border px-4 rounded-xl"
                    type="text" 
                    onChange={handelForm}
                    name="name"/>
            </label>
            <button 
                type="submit"
                className="bg-blue-500 font-bold text-white active:scale-105 active:bg-blue-800 mx-10 shadow shadow-black rounded-xl transition">Submit</button>
        </form>
    </div>)
}