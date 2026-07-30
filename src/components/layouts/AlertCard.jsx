import { CheckCircle2, AlertTriangle, Info, XCircle, X } from "lucide-react";

export default function AlertCard({
  open,
  title,
  message,
  onClose,
  status = "info",
  action,
  linkTo,
}) {
  if (!open) return null;

  // Status configuration mappings
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      primaryBtn:
        "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
    },
    error: {
      icon: XCircle,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
      primaryBtn: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
    },
    warning: {
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      primaryBtn:
        "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20",
    },
    info: {
      icon: Info,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      primaryBtn:
        "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.info;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col items-center text-center">
        {/* Quick Close 'X' Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Status Icon */}
        <div
          className={`w-14 h-14 rounded-2xl ${currentStatus.bgColor} border ${currentStatus.borderColor} flex items-center justify-center mb-4 ${currentStatus.iconColor}`}
        >
          <StatusIcon className="w-8 h-8 stroke-[2.2]" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          {title || "Notice"}
        </h2>

        {/* Message Content */}
        <p className="mt-1.5 text-xs text-gray-500 leading-relaxed max-w-xs">
          {message}
        </p>

        {/* Action Buttons Container */}
        <div className="mt-6 flex items-center gap-2.5 w-full">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 transition active:scale-95 cursor-pointer ${
              !action ? "w-full" : ""
            }`}
          >
            {action ? "Cancel" : "Close"}
          </button>

          {action && (
            <button
              type="button"
              onClick={() => {
                action();
                if (onClose) onClose();
              }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold shadow-md transition active:scale-95 cursor-pointer ${currentStatus.primaryBtn}`}
            >
              {linkTo || "Confirm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
