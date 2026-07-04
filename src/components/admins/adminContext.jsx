import axios from "axios";
import { LogIn } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../libs/api";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  axios.defaults.baseURL = API_URL
  axios.defaults.withCredentials = true
  const [admin, setAdmin] = useState();
  const [analytic, setAnalytic] = useState([])
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null)

  const navigate = useNavigate(null)

  async function loginRoute(params){
    try{
      const resp = await axios.post(`${API_URL}auths/login`, params);
      const data = resp.data;
      console.log(data)
      navigate("/admin/analytics")
      setAdmin(data)
    }catch(err){
      console.log(err.response.data)
    }
  }

  async function refreshAdmin() {
    axios.defaults.withCredentials = true;
    try {
      const resp = await axios.post(`${API_URL}auths/refresh`)
      const data = resp.data;
      setAdmin(data)
      // navigate("/admin/analytics")
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
    admin, loginRoute, analytic, adminFetch,
    refreshAdmin, errorMsg, setErrorMsg, Logout
  }}>
    {children}
  </AdminContext.Provider>)
}