import axios from "axios";
import { LogIn } from "lucide-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../libs/api";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  axios.defaults.withCredentials = true
  const [admin, setAdmin] = useState();
  const [analytic, setAnalytic] = useState([])
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null)

  const navigate = useNavigate(null)

  async function refreshAdmin() {
    try {
      const resp = await api.post(`/auths/refresh`,{withCredentials:true})
      const data = resp.data;
      setAdmin(data)
      return;
    } catch (error) {
      console.error(error)
    }
  };

  async function Logout() {
    try {
      const resp = await api.post("/auths/logout")  
      const data = resp.data;
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
    admin, analytic,
    refreshAdmin, Logout, setAdmin
  }}>
    {children}
  </AdminContext.Provider>)
}