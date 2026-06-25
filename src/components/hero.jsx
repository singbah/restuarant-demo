import NavBar from "./navbar"
import { useNavigate } from "react-router-dom"


export default function HeroSection() {
  const navigate = useNavigate()

  return (<div className="h-dvh relative">
    <NavBar/>
  </div>) 
}