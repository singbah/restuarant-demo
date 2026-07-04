import { useEffect } from "react";
import Dashboard from "./dashboard";
import { useContext } from "react";
import { AdminContext } from "./adminContext";
import useFetch from "../hooks/UseFetch";
import { api } from "../../../libs/api";

export default function Settings(){
    const {admin, refreshAdmin} = useContext(AdminContext)

    const {data, loading, error, refetch} = useFetch(`/admin/settings`)

    useEffect(() =>{
        refreshAdmin()
    },[])

    if (!admin) {
        return (<div>
              <a href="/admin/login">You Must Login</a>
            </div>) }
    return(<Dashboard component={<div className="p-2 w-full overflow-x-hidden">
        <h1 className="font-bold text-xl p-2">Settings</h1>
        <section className="grid grid-cols-3 items-start">
            {data && data.map((setting, index) => <div key={index} 
                >
                <p className="text-sm font-bold ">{setting.key}</p>
                <p className="text-sm">{setting.value}</p>

                </div>)}
        </section>
    </div>}/>)
}