import NavBar from "./navbar"

const h3Style = "text-xl font-bold text-center py-2 "
const pStyle = "p-2 text-l text-center"

export default function AboutUs() {
  
  return (
    <div className="h-screen relative">
      <NavBar/>
    <div className="p-4 lg:mx-40 lg:border overflow-y-auto">
    
    <h1 className="text-center p-4 font-extrabold text-2xl">About Monrovia Food Center</h1>
    <p className={pStyle}>At Monrovia Food Center, food is more than a meal, it’s an experience. We believe in bringing people together through flavors that celebrate tradition while embracing creativity.</p>

    <h3 className={h3Style}>🍴 Our Story</h3>
    <p className={pStyle}>  
      Founded with a passion for fresh ingredients and authentic recipes, our kitchen blends classic techniques with modern twists. Every dish is crafted with care, ensuring that each bite feels like home.</p>
    
    <h3 className={h3Style}>🌿 Our Philosophy  </h3>
    <p className={pStyle}>
      We source locally whenever possible, supporting farmers and producers who share our commitment to quality. From farm-fresh vegetables to sustainably raised meats, we aim to serve food that nourishes both body and soul.
    </p>

    <h3 className={h3Style}> 👨‍👩‍👧‍👦 Our Community  </h3>
    <p className={pStyle}>
      Hospitality is at the heart of everything we do. Whether you’re here for a quick lunch, a family dinner, or a special celebration, our team is dedicated to making your time with us memorable.
    </p>

    <h3 className={h3Style}>✨ Our Promise  </h3>
    <p className={pStyle}>
      Great food, warm service, and a welcoming atmosphere—that’s what you’ll always find at Monrovia Food Center.
        </p>
  </div>
  </div>)
}