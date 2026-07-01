import { useState } from "react"


export default function AlertCard({props, action}){
    const [display, setDisplay] = useState(false)

    const changeState = () =>{
        if(props){
            setDisplay(props.state)
            action(false)
        }
    }

    return(<div 
            style={{display:props&&props.state?"block":"none"}}
            className="absolute justify-center 
            bg-white z-50 rounded-2xl p-4 flex w-100 h-60 
            items-center shadow shadow-green-500 right-1/2 bottom-1/2">
        {props?
        <div className="justify-center items-center flex flex-col">
            <h1 className="text-xl text-center font-bold my-4">{props.message}</h1>
            <button
                onClick={action?action:() => console.log("error occur")}
                className="bg-blue-600 px-6 py-2 rounded-lg text-2xl my-2 text-white font-black shadow-2xl active:scale-105"
            >Close</button>
        </div>:
            
        <div className="justify-center items-center flex flex-col">
            <h1 className="text-xl text-center font-bold my-4">This the first message of the card</h1>
            <button
                className="bg-blue-600 px-6 py-2 rounded-lg text-2xl my-2 text-white font-black shadow-2xl active:scale-105"
            >Close</button>
        </div>}
    </div>)
}