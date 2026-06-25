import { MenuIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Restuarants() {
  const navigate = useNavigate()
  const pStyle = 'px-2'
  const h2Style = "px-4 text-xl font-extrabold"
  const uListStyle = "flex flex-col justify-center px-10 list-disc"
  return (<div className="bg-white h-screen text-black text-sm flex  flex-col  items-center overflow-y-auto overflow-x-hidden font-serif text-[16px]">
    <section>
      
      <div className="m-1 my-6">
        <h1 className="p-4 text-2xl font-bold">How Much Does a Website Cost in Monrovia, Liberia in 2026?</h1>
        <div className="border m-2 rounded bg-blue-50 border-gray-300 text-sm">
          <p className={pStyle}>If you’re planning to build a website for your 
          business in Monrovia, one of the first questions you’ll ask is: 
          “How much will it cost?”</p>
        <p className={pStyle}>The answer depends on the type of website you need, 
          the features required, and who builds it. In this guide, 
          we’ll break down realistic website costs in Liberia in 2026.</p>
        </div>
      </div>

      <div className="bg-amber-50 mx-2 rounded p-2">
        <h2 className={h2Style}> 1. Basic Business Website</h2>
        <h3 className="px-5 text-xl "> basic business website is ideal for:</h3>
        <ul className={uListStyle}>
          <li>Small businesses</li>
          <li>NGOS</li>
          <li>Restaurants</li>
          <li>Personal brands</li>
          <li>churches</li>
        </ul>
        <h3 className="px-5 text-xl py-2">Typical features include:</h3>
        <ul className={uListStyle}>
          <li>Home page</li>
          <li>About page</li>
          <li>Services page</li>
          <li>Contact page</li>
          <li>Mobile-friendly design</li>
        </ul>
        <p className="pb-4 text-red-500 px-4">Estimated Cost: USD $200 - $600</p>
      </div>

      <div className="bg-amber-50 mx-2 rounded p-2">
        <h2 className={h2Style}> 2. Professional Business Website</h2>
        <h3 className="px-5 text-xl "> A professional website typically includes:</h3>
        <ul className={uListStyle}>
          <li>Custom design</li>
          <li>Multiple service pages</li>
          <li>Blog functionality</li>
          <li>SEO optimization</li>
          <li>Contact forms</li>
          <li>Analytics integration</li>
        </ul>
        <p className="p-4 text-red-500">Estimated Cost: USD $600 - $1,500</p>
      </div>

      <div className="bg-amber-50 mx-2 rounded p-2">
        <h2 className={h2Style}>3. E-Commerce Website</h2>
        <p className="px-4">If you want to sell products online, you’ll need an e-commerce website.</p>
        <h3 className="px-5 text-xl ">Features may include:</h3>

        <ul className={uListStyle}>
          <li>Product catalog</li>
          <li>Shopping cart</li>
          <li>Customer accounts</li>
          <li>Online payments</li>
          <li>Inventory management</li>
        </ul>
        <p className="p-4 text-red-500">Estimated Cost: USD $1,000 - $5,000+</p>
      </div>

      <div className="bg-amber-50 mx-2 rounded p-2">
        <h2 className={h2Style}>4. Custom Web Applications</h2>
        <h3 className="px-5 text-xl ">Custom systems such as:</h3>

        <ul className={uListStyle}>
          <li>School management portals</li>
          <li>Hospital systems</li>
          <li>Booking platforms</li>
          <li>CRM software</li>
          <li>Customer dashboards</li>
        </ul>
        <p className="p-4 text-red-500">Estimated Cost: USD $2,000 - $20,000+</p>
      </div>

      <div className="flex flex-col bg-white shadow-black shadow-2xl p-4 m-4 rounded-xl">
        <h1 className="font-bold text-2xl text-center">Additional Costs to Consider</h1>
        <h2 className="font-bold">Domain Name</h2>
        <p>A domain name is your website address</p>
        <h4 className="font-semibold">Examples</h4>
        <ul className="px-4 list-disc">
          <li>yourbusiness.com</li>
          <li>yourbusiness.lr</li>
        </ul>
        <p className="font-bold text-red-500 p-2">Estimate Cost: USD $10 - $50 per year</p>

        <h2 className="font-bold">Web Hosting</h2>
        <p>Hosting keeps your website online.</p>
        <h3 className="font-black p-2">Estimated Cost:</h3>
        <ul className="list-disc px-4 text-red-600">
          <li>Shared hosting: USD $50-150/year</li>
          <li>Shared hosting: USD $200-1,000/year</li>
        </ul>

        <h2 className="font-bold">Mantaince</h2>
        <p>Websites require updates, backups and security monitoring.</p>
        <p>Estimated Cost: USD $10 - $100/month</p>
      </div>
    </section>
  </div>)
}