import { useContext, useState } from "react"
import { AdminContext } from "./adminContext"
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const { login, rrorMsg, setErrorMsg } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({phone:'', password:""})

  const navigate = useNavigate()
  
  async function signIn(e) {
    console.log(loginData)
    e.preventDefault();
    // navigate("/admin/dashboard")
    login(loginData)
    
  }

  const handelForm = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({...prev, [name]:value}))
  }
  return (<div className="h-screen flex flex-col justify-center items-center bg-green-50 relative">
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
  const { login, adminSignUp, errorMsg, setErrorMsg } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({username:'', password:""})
  
  async function signUp(e) {
    console.log(loginData)
    e.preventDefault();
    adminSignUp(loginData)
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