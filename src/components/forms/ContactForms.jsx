import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../libs/api";
import AlertCard from "../layouts/AlertCard";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [msg, setMsg] = useState({open:false, title:'', message:''})

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {...form, source:window.location.href}
   try{
    const resp = await axios.post(`${API_URL}user/contact`, data)
    const result = resp.data;
    setMsg({open:true, title:'Success', message:result.detail})
    setForm({name:'', email:'', subject:'', source:'', newsletter:false, message:''})
    return;
   }catch(error){
    const errData = error.response.data.detail;
    console.error(errData)
    setMsg({open:true, title:'Error', message:errData||"Failed to send message"})
   }
  }

  return (
    <section className="mx-auto w-full max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
      <AlertCard
        open={msg.open}
        title={msg.title}
        message={msg.message}
        onClose={() => setMsg({open:false, title:'', message:''})}
      />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Get in Touch
        </h2>

        <p className="mt-3 text-gray-600">
          Questions, corrections, partnership opportunities, or
          general feedback? We'd love to hear from you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full rounded-xl border px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="w-full rounded-xl border px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Subject
          </label>

          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="What's this about?"
            required
            className="w-full rounded-xl border px-4 py-3 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Message
          </label>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="Write your message here..."
            required
            className="w-full rounded-xl border px-4 py-3 resize-none focus:border-blue-500 focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="newsletter"
            checked={form.newsletter}
            onChange={handleChange}
            className="h-6 w-6"
          />

          <span>
            Subscribe me to the Monrovia Money newsletter.
          </span>
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 active:scale-95"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}