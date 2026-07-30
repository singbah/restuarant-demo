import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../libs/api";

export const AdminContext = createContext(null);

export default function AdminProvider({ children }) {
  const [admin, setAdmin] = useState();
  const [analytic, setAnalytic] = useState([]);

  const navigate = useNavigate(null);

  async function refreshAdmin() {
    try {
      const resp = await api.post(`/auths/refresh`, { withCredentials: true });
      const data = resp.data;
      setAdmin(data);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async function Logout() {
    try {
      const resp = await api.post("/auths/logout");
      const data = resp.data;
      navigate("/vendor-signin");
      return;
    } catch (error) {
      const errorData = error.response.data;
      console.log(error);
      if (errorData) {
        setErrorMsg(data.detail);
        return;
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        refreshAdmin();
      },
      1000 * 60 * 5,
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        analytic,
        refreshAdmin,
        Logout,
        setAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
