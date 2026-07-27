import { BookOpen, Phone, Lock, User, Mail, ArrowRight } from "lucide-react";
import { api, API_URL } from "../../../libs/api";
import AlertCard from "../layouts/AlertCard";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/UseFetch";
import { useState } from "react";

function VendorSignIn() {
  const navigate = useNavigate(null);
  const [form, setForm] = useState({ password: "", phone: "" });
  const { data } = useFetch(`${API_URL}user/me`);
  console.log(data);
  const [msg, setMsg] = useState({
    title: "",
    message: "",
    status: "",
    isOpen: false,
  });

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auths/signin", form);
      const request = response.data;
      localStorage.setItem("user", request.id);
      navigate("/market");
    } catch (error) {
      const errData = error.response?.data?.detail;
      console.error(errData);
      setMsg({
        title: "Login Failed",
        message: errData || "An error occur",
        status: "error",
        isOpen: true,
      });
    }
  };
  return (
    <div className="flex flex-col h-screen bg-black text-blue-600 justify-center items-center">
      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        onClose={() => setMsg({ isOpen: false })}
      />
      <div className="p-4 rounded-2xl border-2 flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6">
          <BookOpen className="inline mr-5 text-white" size={50} /> Vindor sign
          in
        </h1>
        <form className="space-y-3" onSubmit={handelSubmitForm}>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Phone />
            <input
              type="text"
              className="bg-transparent text-blue-50 outline-none"
              placeholder="enter email/phone"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>

          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Lock />
            <input
              type="password"
              value={form.password}
              className="bg-transparent text-blue-50 outline-none"
              placeholder="enter your password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>
          <button className="text-2xl py-1 rounded-lg w-full bg-blue-800 text-white font-bold">
            Login
          </button>
          <a
            className="underline font-bold italic m-2 text-red-600"
            href="/forgot-password"
          >
            Forgot Password
          </a>
        </form>
      </div>
      <div>
        <p className="m-4">
          Don't have account?{" "}
          <a className="underline font-bold italic" href="/vendor-signup">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

function VendorSignUp() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
  });
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    status: "",
    title: "",
    action: null,
    linkTo: "",
  });
  const navigate = useNavigate(null);
  const handelSubmit = async (e) => {
    e.preventDefault();
    // do some data eiter and clean up
    try {
      const response = await api.post("/auths/signup", form);
      const result = response.data;
      setMsg({
        isOpen: true,
        title: "Registration Success",
        message: result.detail,
        status: "success",
        action: () => {
          navigate("/vendor-signin");
        },
        linkTo: "Login",
      });
      setForm({ name: "", phone: "", password: "", email: "" });
    } catch (error) {
      const errData = error.response?.data?.detail;
      console.log(errData);
      setMsg({
        isOpen: true,
        title: "Registration Failed",
        message: errData || "An error occur",
        status: "error",
      });
    }
  };
  return (
    <div className="flex flex-col h-screen bg-black text-blue-600 justify-center items-center">
      <AlertCard
        open={msg.isOpen}
        onClose={() => setMsg({ isOpen: false })}
        message={msg.message}
        title={msg.title}
        linkTo={msg.linkTo}
        action={msg.action}
      />
      <div className="p-4 rounded-2xl border-2 flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6">
          <BookOpen className="inline mr-5 text-white" size={50} /> Vindor Sign
          Up
        </h1>
        <form className="space-y-3" onSubmit={handelSubmit}>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <User />
            <input
              type="text"
              className="bg-transparent text-blue-50 outline-none"
              placeholder="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Phone />
            <input
              type="tel"
              className="bg-transparent text-blue-50 outline-none"
              placeholder="enter phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </label>
          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Mail />
            <input
              type="email"
              className="bg-transparent text-blue-50 outline-none"
              placeholder="enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label className="border p-2 rounded-lg flex justify-between items-center gap-2 mb-4">
            <Lock />
            <input
              type="password"
              className="bg-transparent text-blue-50 outline-none"
              placeholder="create password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <button className="text-2xl py-1 rounded-lg w-full bg-blue-800 text-white font-bold">
            Sign Up
          </button>
        </form>
      </div>
      <div>
        <p className="mt-4">
          I already have an account?{" "}
          <a className="underline font-bold italic" href="/vendor-signin">
            Sing In
          </a>
        </p>
      </div>
    </div>
  );
}

function ForgotPassword() {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black text-blue-600">
      <form>
        <p className="mb-6 font-black text-red-500 text-2xl text-center">
          account recovery
        </p>
        <p className="mb-1 font-black text-sm">please enter your email</p>
        <label className="flex-1 justify-between w-full flex border gap-2 p-2 rounded-lg mb-2">
          <Mail />
          <input
            type="email"
            className="outline-none text-gray-200"
            placeholder="your@email.com"
          />
        </label>
        <button
          disabled={true}
          className="px-4  py-1 mt-2 rounded-lg text-white font-bold border-2 border-blue-600 active:scale-104"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

function OTPConfirmation() {
  return (
    <div className="flex justify-center items-center flex-col h-screen bg-black text-blue-600">
      <form>
        <p className="mb-6 font-black text-red-500 text-2xl">
          OTP Confirmation
        </p>
        <p className="mb-1 font-black text-sm text-white">
          Please enter the otp from your email
        </p>
        <label className="flex-1 justify-between  flex border border-white gap-2 p-2 rounded-lg mb-2">
          <p>ET-</p>
          <input
            type="text"
            className="outline-none text-gray-200"
            placeholder="ENTER CODE"
          />
          <button className="rounded-lg text-white font-bold active:scale-104 cursor-pointer">
            <ArrowRight />
          </button>
        </label>
      </form>
      <a
        href="#"
        className="text-left mt-4 active:scale-105 focus:text-red-600 transition"
      >
        Resend Code
      </a>
    </div>
  );
}

export { VendorSignIn, VendorSignUp, ForgotPassword, OTPConfirmation };
