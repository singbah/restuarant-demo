
function Button({name, action, icon}){
    return(<button
        className="bg-blue-700 px-4 rounded-xl shadow shadow-black
        transition cursor-pointer text-2xl
        font-bold text-white hover:bg-blue-900 active:scale-105"
        onClick={action}
        >
        {name?name:"click me"} {icon}
    </button>)
}

function FormButton({type, action, name}){
    <button
        className="bg-blue-500 px-4 rounded-xl 
        transition cursor-pointer text-2xl
        font-bold text-white hover:bg-blue-700 active:scale-110"
        onClick={action}
        type={type}
        >
        {name?name:"click me"}
    </button>
}

export {FormButton, Button}