import { useState } from "react";
import { Loader2, X } from "lucide-react";

export default function LoadingEffect({ title, message, onCancel }) {
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) return null;

  const handleCancel = () => {
    setCancelled(true);
    if (onCancel) onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
        {/* Optional Cancel Button */}
        {onCancel && (
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Spinner Icon */}
        <div className="relative flex items-center justify-center w-14 h-14 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin stroke-[2.5]" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          {title || "Loading..."}
        </h2>

        {/* Message */}
        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed max-w-xs">
          {message || "Please wait while we process your request."}
        </p>

        {/* Progress Bar Highlight */}
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-5 overflow-hidden">
          <div className="bg-emerald-600 h-full rounded-full w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
