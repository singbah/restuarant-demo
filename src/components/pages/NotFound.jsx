import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, RefreshCw, AlertTriangle } from "lucide-react";

export default function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center space-y-6">
        {/* Icon & Error Code */}
        <div className="relative w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto border border-rose-100">
          <AlertTriangle className="w-10 h-10" />
          <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            404
          </span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            We couldn't find any resource matching the address:
            <br />
            <code className="bg-gray-100 px-2 py-0.5 rounded text-emerald-600 font-mono text-[11px] mt-1 inline-block break-all">
              {location.pathname}
            </code>
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
          <button
            onClick={() => navigate("/market")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Go to Marketplace</span>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gray-100 hover:bg-gray-200 active:scale-[0.98] text-gray-700 text-xs font-semibold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>

        {/* Go Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition font-medium cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to previous page</span>
        </button>
      </div>
    </div>
  );
}
