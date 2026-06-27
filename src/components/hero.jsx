
import { useNavigate } from "react-router-dom"

import NavBar from "./layouts/navbar"


export default function HeroSection() {
  const navigate = useNavigate()

  return (<div className="h-dvh relative">
    <NavBar/>
  </div>) 
}