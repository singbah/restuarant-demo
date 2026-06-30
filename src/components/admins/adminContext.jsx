import axios from "axios";
import { LogIn } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  axios.defaults.baseURL = 'http://127.0.0.1:8000/'
  axios.defaults.withCredentials = true
  const [admin, setAdmin] = useState();
  const [analytic, setAnalytic] = useState([])
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null)

  const navigate = useNavigate(null)

  async function login(params) {
    try {
      const resp = await axios.post("auths/login", params, {
        withCredentials:true
      })
      const data = resp.data;
      console.log(data)
      setAdmin(data)
      navigate("/admin/dashboard")
      return;
    } catch (error) {
      console.error(error)
      const errorData = error.response.data
      if (errorData.detail.toString().includes("401")) {
        console.log("Wrong Password")
        setErrorMsg(errorData.detail)
        return;
      } else if (errorData.detail.toString().includes("423")) {
        console.log("Account Lock")
        setErrorMsg(errorData.detail)
        return;
      } else {
        setErrorMsg("An error occur")
      }
    }
  };

  async function refreshAdmin() {
    axios.defaults.withCredentials = true;
    try {
      const resp = await axios.post("http://127.0.0.1:8000/auths/refresh")
      const data = resp.data;
      setAdmin(data)
      navigate("/admin/dashboard")
      console.log(data)
      return;
    } catch (error) {
      console.error(error)
    }
  };

  async function adminFetch(){
    axios.defaults.withCredentials = true;
    try{
      const resp = await axios.get("http://127.0.0.1:8000/admin/me")
      const data = resp.data;
      setAnalytic(data)
      return;
    }catch(error){
      console.log(data)
    }
  }

  async function Logout() {
    try {
      const resp = await axios.post("/auths/logout")  
      const data = resp.data;
      console.log(data)
      navigate("/admin/login")
      return;
    } catch (error) {
      const errorData = error.response.data;
      console.log(error)
      if (errorData) {
        setErrorMsg(data.detail)
        return;
      }
    }
  };

  return (<AdminContext.Provider value={{
    admin, login, analytic, adminFetch,
    refreshAdmin, errorMsg, setErrorMsg, Logout
  }}>
    {children}
  </AdminContext.Provider>)
}