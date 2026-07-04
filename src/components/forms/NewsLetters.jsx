import axios from "axios";
import { useState } from "react";
import {API_URL} from "../../../libs/api.js"
import LoadingEffect from "../layouts/LoadingEffect.jsx";
import { set } from "date-fns";
import AlertCard from "../layouts/AlertCard.jsx";

export default function NewsLetter() {
  const [msg, setMsg] = useState({open:false, title:'', message:''});
  const [loading, setLoading] = useState(false)
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  function handleForm(e) {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit(e) {
    setLoading(true)
    e.preventDefault();

    const data = {
      ...userData,
      source: window.location.href,
    };

    console.log(data);

    try{
      const response = await axios.post(`${API_URL}user/create`, data);
      const result = response.data;
      console.log(result);
      setLoading(false)
      setMsg({title:"success", message:data.detail, open:true})
      setUserData({name:'', email:''})

      return;
    }catch(error){
      console.log(error.response.data.detail)
      setLoading(false)
      setMsg({title:"Error", message:error.response?.data.detail || "An error Occur", open:true})
    }
  }

  if(loading) return <LoadingEffect/>
  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl bg-gradient-to-r from-blue-600 to-green-600 p-8 text-white shadow-xl">
      <AlertCard
        open={msg.open}
        title={msg.title}
        message={msg.message}
        onClose={() => setMsg({open:false, title:'', message:''})}
      />
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          Stay Ahead of Market Prices
        </h2>

        <p className="mt-3 text-blue-100">
          Get weekly updates on fuel prices, exchange rates,
          rice prices, and market news delivered straight to
          your inbox.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mt-8 space-y-4"
      >
        <div>
          <label className="mb-2 block font-medium">
            Name (Optional)
          </label>

          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleForm}
            placeholder="John Doe"
            className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleForm}
            placeholder="you@example.com"
            required
            className="w-full rounded-xl border border-white/20 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-white py-3 font-bold text-blue-700 transition hover:bg-gray-100 active:scale-[0.98]"
        >
          Subscribe Now
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-blue-100">
        No spam. Unsubscribe anytime.
      </p>
    </section>
  );
}