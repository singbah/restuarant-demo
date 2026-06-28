

export default function ContactForm(){
    return(<div className=" p-4 m-2 rounded-2xl lg:w-1/2">
        <h1 className="text-2xl font-bold p-2">Get in touch!</h1>
        <p className="text-normal font-mono p-2 px-4">Questions, collaborations, or corrections? Use the form below and i'll be in touch</p>
        <form className="flex flex-col p-4 text-xl justify-center border rounded-xl">
            <label className="m-2 w-full">
                Name: <input 
                    className="border rounded-xl p-1"
                    type="text" 
                    required
                    placeholder="full name"
                    name="name"/>
            </label>

            <label className="m-2 w-full">
                Email: <input 
                    className="border rounded-xl p-1"
                    type="email" 
                    required
                    placeholder="e.g johndoe@gmail.com"
                    name="name"/>
            </label>
            <label className="m-2 w-full"> Subject </label>
            <textarea 
                required
                className="border rounded-2xl p-2"
                placeholder="What's on your mind"
                name="subject">
                
            </textarea>
            <label className="p-2">
                <input type="checkbox" name="newsletter" className="inline"/>
                <p className="text-sm inline px-2">Get More Update On our product and service
                </p>
            </label>
            <button className="bg-blue-600 mx-10 m-4 p-2 text-2xl rounded-2xl font-bold text-white shadow shadow-black hover:bg-blue-800 transition active:bg-scale-105">Submit</button>
        </form>
    </div>)
}