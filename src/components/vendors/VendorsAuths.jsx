import {
  BookOpen,
  Phone,
  Lock,
  User,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  ShoppingBag,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import { api } from "../../../libs/api";
import AlertCard from "../layouts/AlertCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingEffect from "../layouts/LoadingEffect";

/* -------------------------------------------------------------------------- */
/*                               VENDOR SIGN IN                               */
/* -------------------------------------------------------------------------- */
export function VendorSignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", phone: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState({
    title: "",
    message: "",
    status: "",
    isOpen: false,
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auths/signin", form);
      const request = response.data;
      if (request?.id) {
        localStorage.setItem("user", request.id);
      }
      navigate("/market");
    } catch (error) {
      const errData = error.response?.data?.detail;
      setMsg({
        title: "Login Failed",
        message: errData || "Invalid phone/email or password.",
        status: "error",
        isOpen: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Signing In..."
          message="Authenticating your vendor credentials."
        />
      )}
      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        status={msg.status}
        title={msg.title}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Vendor Sign In
          </h1>
          <p className="text-xs text-gray-500">
            Access your store, products, and sales dashboard
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmitForm}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Phone or Email
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="077000000 or email@domain.com"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-gray-700">
                Password
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-emerald-600 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="••••••••"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-gray-500">
          Don't have a vendor account?{" "}
          <a
            className="font-semibold text-emerald-600 hover:underline"
            href="/vendor-signup"
          >
            Register store
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               VENDOR SIGN UP                               */
/* -------------------------------------------------------------------------- */
export function VendorSignUp() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    status: "",
    title: "",
    action: null,
    linkTo: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auths/signup", form);
      const result = response.data;
      setMsg({
        isOpen: true,
        title: "Registration Success",
        message:
          result.detail || "Your vendor account was created successfully!",
        status: "success",
        action: () => navigate("/vendor-signin"),
        linkTo: "Proceed to Sign In",
      });
      setForm({ name: "", phone: "", password: "", email: "" });
    } catch (error) {
      const errData = error.response?.data?.detail;
      setMsg({
        isOpen: true,
        title: "Registration Failed",
        message:
          errData || "Could not register account. Please check your inputs.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Creating Account..."
          message="Setting up your store workspace."
        />
      )}
      <AlertCard
        open={msg.isOpen}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
        message={msg.message}
        title={msg.title}
        linkTo={msg.linkTo}
        action={msg.action}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-5">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Create Vendor Account
          </h1>
          <p className="text-xs text-gray-500">
            Start selling products across Liberia
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Full Name / Store Name
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="tel"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="077000000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="email"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="vendor@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              required
              id="terms"
              className="mt-0.5 accent-emerald-600 rounded"
            />
            <label
              htmlFor="terms"
              className="text-[11px] text-gray-500 leading-snug"
            >
              I agree to the{" "}
              <a
                href="/conditions"
                className="text-emerald-600 underline font-medium"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/policy"
                className="text-emerald-600 underline font-medium"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <a
            className="font-semibold text-emerald-600 hover:underline"
            href="/vendor-signin"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              FORGOT PASSWORD                               */
/* -------------------------------------------------------------------------- */
export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    title: "",
    message: "",
    isOpen: false,
    status: "",
  });
  const navigate = useNavigate();

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        `/auths/forgot_password?email=${encodeURIComponent(email)}`,
      );
      const request = response.data;
      navigate("/otp-confirm", { state: request || { email } });
    } catch (error) {
      const errMsg =
        error.response?.data?.detail ||
        "Account recovery failed. Please verify your email.";
      setMsg({
        title: "Recovery Failed",
        message: errMsg,
        status: "error",
        isOpen: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Sending OTP..."
          message="Generating password recovery code."
        />
      )}
      <AlertCard
        message={msg.message}
        open={msg.isOpen}
        title={msg.title}
        status={msg.status}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto border border-rose-100">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Account Recovery
          </h1>
          <p className="text-xs text-gray-500">
            Enter your account email address to receive a reset code.
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Email Address
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="email"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md transition active:scale-95 cursor-pointer"
          >
            Send Verification Code
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Remember password?{" "}
          <a
            className="font-semibold text-emerald-600 hover:underline"
            href="/vendor-signin"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              OTP CONFIRMATION                              */
/* -------------------------------------------------------------------------- */
export function OTPConfirmation() {
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    title: "",
    status: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.get(
        `auths/confirm_opt?otp=${encodeURIComponent(otp)}&email=${encodeURIComponent(email)}`,
      );
      const result = response.data;
      navigate("/password-reset", { state: { email } });
    } catch (error) {
      const errData =
        error.response?.data?.detail || "Invalid or expired OTP code.";
      setMsg({
        isOpen: true,
        message: errData,
        status: "error",
        title: "Verification Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Verifying Code..."
          message="Validating OTP credentials."
        />
      )}
      <AlertCard
        open={msg.isOpen}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
        title={msg.title}
        message={msg.message}
        status={msg.status}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Enter OTP Code
          </h1>
          <p className="text-xs text-gray-500">
            We sent a security code to{" "}
            <span className="font-semibold text-gray-700">
              {email || "your email"}
            </span>
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Security Code
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <span className="text-xs font-bold text-gray-400">ET-</span>
              <input
                type="text"
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none uppercase font-mono tracking-wider"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Verify & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Didn't receive code?{" "}
          <a
            href="/forgot-password"
            className="font-semibold text-emerald-600 hover:underline"
          >
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               PASSWORD RESET                               */
/* -------------------------------------------------------------------------- */
export function PasswordReset() {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [msg, setMsg] = useState({
    isOpen: false,
    message: "",
    status: "",
    title: "",
  });
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const submitFormData = async (e) => {
    e.preventDefault();

    if (newPassword.password !== newPassword.confirmPassword) {
      setMsg({
        isOpen: true,
        title: "Password Mismatch",
        message: "The confirmation password does not match the new password.",
        status: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await api.get(
        `/auths/password-reset?new_password=${encodeURIComponent(
          newPassword.password,
        )}&email=${encodeURIComponent(email)}`,
      );
      navigate("/market");
    } catch (error) {
      const errData =
        error.response?.data?.detail ||
        "Could not reset password. Please try again.";
      setMsg({
        isOpen: true,
        title: "Reset Failed",
        message: errData,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Updating Password..."
          message="Saving your new account credentials."
        />
      )}
      <AlertCard
        open={msg.isOpen}
        message={msg.message}
        title={msg.title}
        status={msg.status}
        onClose={() => setMsg((prev) => ({ ...prev, isOpen: false }))}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Set New Password
          </h1>
          <p className="text-xs text-gray-500">
            Choose a secure password for your vendor account
          </p>
        </div>

        <form onSubmit={submitFormData} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              New Password
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="••••••••"
                value={newPassword.password}
                onChange={(e) =>
                  setNewPassword({ ...newPassword, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 transition">
              <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
                placeholder="••••••••"
                value={newPassword.confirmPassword}
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md transition cursor-pointer"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          <a
            href="/market"
            className="font-semibold text-gray-400 hover:text-gray-600"
          >
            Skip for now
          </a>
        </p>
      </div>
    </div>
  );
}
