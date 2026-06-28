
export default function Inputs({onchange, placeholder}){
    return(<label className="relative">
        <input 
        onChange={onchange}
        className="border rounded-xl p-1 text-xl"
        placeholder={placeholder?placeholder:"Enter Text here"}
        type="text" />
    </label>)
}