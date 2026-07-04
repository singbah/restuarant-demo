
import { useParams } from "react-router-dom"
import { AdminContext } from "./adminContext"
import NavigationBar from "./adminNavBar"
import { useContext, useEffect } from "react"

export default function Dashboard({component}) {
  const {admin, refreshAdmin} = useContext(AdminContext)
  const { postSlug } = useParams()

  useEffect(() =>{
    refreshAdmin()
  },[])

  if (!admin) {
    return (<div>
          <a href="/admin/login">You Must Login</a>
        </div>) }
      
  return (<div className="h-dvh flex bg-gray-100">
    <NavigationBar/>
    {component?component:""}
  </div>)
}