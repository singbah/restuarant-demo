import { useContext, useState } from "react"
import { AdminContext } from "./adminContext"
import { useNavigate } from "react-router-dom";
import AlertCard from "../layouts/AlertCard";
import { api } from "../../../libs/api"

function AdminLogin() {
  const { loginRoute, setAdmin } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({phone:'', password:""})
  const [msg, setMsg] = useState({message:'', open:false, title:'', status:null})

  const navigate = useNavigate()
  
  async function signIn(e) {
    e.preventDefault()
    try{
      const resp = await api.post("/auths/login", loginData);
      setAdmin(resp.data)
      navigate("/admin/analytics")
    }catch(error){
      const errData = error.response?.data.detail || "An Error Occur";
      setMsg({message:errData, open:true, title:"Login", status:"error"})
    }
    
  }

  const handelForm = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({...prev, [name]:value}))
  }
  return (<div className="h-screen flex flex-col justify-center items-center bg-green-50 relative">
    <AlertCard message={msg.message} title={msg.title} open={msg.open} onClose={() => setMsg((prev) =>({...prev, open:false}))}/>
    <form
      onSubmit={signIn}
      className="border-white p-4 flex flex-col lg:w-1/2 justify-center text-2xl rounded-2xl shadow shadow-green-500">
      <h1 className="text-center text-3xl font-bold text-green-600">Admin Login</h1>
      <label className="m-8">
        User ID
        <input
          className="border-white border-2 inline p-1 rounded-xl shadow shadow-green-400 mx-4"
          onChange={handelForm}
          placeholder="User ID"
          type="text"
          name="phone" />
      </label>

      <label className="mx-8">
        password 
        <input
          className="border-white border-2 inline p-1 rounded-xl shadow shadow-green-400 mx-4"
          onChange={handelForm}
          placeholder="password"
          type="text"
          name="password"/>
      </label>
      <button
        className="bg-blue-500 m-8 rounded-2xl p-2 font-bold text-white cursor-pointer hover:bg-blue-800 transition-colors active:scale-101"
        type="submit">Login</button>
    </form>
    <a
      className="text-red-500 text-center text-xl m-4 font-semibold cursor-pointer hover:text-red-700 active:scale-105 transition-all"
    >forgot password</a>
  </div>)
};


function AdminSignUp() {
  const { login, } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({username:'', password:""});
  
  
  async function signUp(e) {
    console.log(loginData)
    e.preventDefault();
    adminSignUp(loginData)
    .then(res => console.log(res))
    .catch(() => setMsg({message:"An error occur!!", title:"Login Error", open:true}))
  }

  const handelForm = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({...prev, [name]:value}))
  }
  return (<div className="h-screen flex flex-col justify-center items-center bg-green-50 relative">
    <form
      onSubmit={signUp}
      className="border-white p-4 flex flex-col lg:w-1/2 justify-center text-2xl rounded-2xl shadow shadow-green-500">
      <h1 className="text-center text-3xl font-bold text-green-600">Admin Sign up</h1>
      
      <label className="m-8">
        full name
        <input
          className="border-white border-2 inline p-1 rounded-xl shadow shadow-green-400 mx-4"
          onChange={handelForm}
          placeholder="full name"
          type="text"
          name="username" />
      </label>

      <label className="mx-8">
        password 
        <input
          className="border-white border-2 inline p-1 rounded-xl shadow shadow-green-400 mx-4"
          onChange={handelForm}
          placeholder="password"
          type="text"
          name="password"/>
      </label>
      <button
        className="bg-blue-500 m-8 rounded-2xl p-2 font-bold text-white cursor-pointer hover:bg-blue-800 transition-colors active:scale-101"
        type="submit">Login</button>
    </form>
    <a
      className="text-red-500 text-center text-xl m-4 font-semibold cursor-pointer hover:text-red-700 active:scale-105 transition-all"
    >Sign In</a>
  </div>)
};




export {AdminLogin, AdminSignUp}