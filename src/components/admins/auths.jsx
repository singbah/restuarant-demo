import { useContext, useState } from "react";
import { AdminContext } from "./adminContext";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import AlertCard from "../layouts/AlertCard";
import { api } from "../../../libs/api";
import LoadingEffect from "../layouts/LoadingEffect";

function AdminLogin() {
  const { setAdmin } = useContext(AdminContext);
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    message: "",
    open: false,
    title: "",
    status: "info",
  });

  const navigate = useNavigate();

  async function signIn(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await api.post("/auths/signin", loginData);
      const user = resp.data;

      // Ensure user has admin privileges
      if (!user?.role || user.role !== "admin") {
        setMsg({
          title: "Access Denied",
          message:
            "You do not have administrative privileges to access this area.",
          open: true,
          status: "error",
        });
        setLoading(false);
        return;
      }

      setAdmin(user);
      navigate("/admin/dashboard");
    } catch (error) {
      const errData =
        error.response?.data?.detail ||
        "Invalid admin credentials. Please try again.";
      setMsg({
        message: errData,
        open: true,
        title: "Authentication Failed",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {loading && (
        <LoadingEffect
          title="Verifying Admin Access..."
          message="Checking credentials and security roles."
        />
      )}

      <AlertCard
        message={msg.message}
        title={msg.title}
        open={msg.open}
        status={msg.status}
        onClose={() => setMsg((prev) => ({ ...prev, open: false }))}
      />

      <div className="w-full max-w-sm bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 space-y-6">
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-slate-900 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-slate-800 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-xs text-gray-500">
            Sign in with administrative privileges
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={signIn} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">
              User ID / Phone Number
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                required
                type="text"
                name="phone"
                value={loginData.phone}
                onChange={handleFormChange}
                placeholder="Enter admin ID or phone"
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
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
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={handleFormChange}
                placeholder="••••••••"
                className="w-full text-xs text-gray-800 bg-transparent outline-none placeholder:text-gray-400"
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
            className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Authenticate Admin</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-400">
          Authorized personnel only. All access attempts are logged.
        </p>
      </div>
    </div>
  );
}

export { AdminLogin };
