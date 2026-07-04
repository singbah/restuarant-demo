
import { useParams } from "react-router-dom"
import { AdminContext } from "./adminContext"
import NavigationBar from "./adminNavBar"
import { useContext, useEffect } from "react"
import { AdminLogin } from "./auths"

export default function Dashboard({component}) {
  const {admin, refreshAdmin} = useContext(AdminContext)
  const { postSlug } = useParams()

  useEffect(() =>{
    refreshAdmin()
  },[])

  if (!admin) return <AdminLogin/>
      
  return (<div className="h-dvh flex bg-gray-100">
    <NavigationBar/>
    {component?component:""}
  </div>)
}