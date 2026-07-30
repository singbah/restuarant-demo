import { ShoppingBag, User } from "lucide-react";

export default function ItemCard({
  name,
  price,
  photo,
  onPress,
  label,
  lable, // Backwards compatibility for lable typo
  type = "item",
  type_, // Backwards compatibility for type_
}) {
  const actionLabel = label || lable || "Action";
  const itemType = type_ || type;

  // Determine button color style based on the action label
  const getButtonStyles = (lbl) => {
    const text = String(lbl).toLowerCase();
    if (text.includes("delete") || text.includes("decline")) {
      return "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20";
    }
    if (text.includes("modify") || text.includes("edit")) {
      return "bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20";
    }
    return "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-2xs hover:shadow-md transition-all duration-200 mb-2.5 flex items-center justify-between gap-3">
      {/* Left Column: Image/Avatar + Text Info */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {photo && photo !== "photo" ? (
          <img
            src={photo}
            alt={name || "item photo"}
            className={`object-cover border border-gray-100 flex-shrink-0 bg-gray-50 ${
              itemType === "people"
                ? "w-11 h-11 rounded-full"
                : "w-14 h-14 rounded-xl"
            }`}
          />
        ) : (
          <div
            className={`flex items-center justify-center bg-gray-50 text-gray-400 border border-gray-100 flex-shrink-0 ${
              itemType === "people"
                ? "w-11 h-11 rounded-full"
                : "w-14 h-14 rounded-xl"
            }`}
          >
            {itemType === "people" ? (
              <User className="w-5 h-5" />
            ) : (
              <ShoppingBag className="w-6 h-6" />
            )}
          </div>
        )}

        {/* Text Container */}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-gray-900 truncate">
            {name || "Unnamed Item"}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-0.5 truncate">
            {price}
          </p>
        </div>
      </div>

      {/* Right Column: Action Button */}
      {onPress && (
        <button
          type="button"
          onClick={onPress}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all duration-150 active:scale-95 flex-shrink-0 cursor-pointer ${getButtonStyles(
            actionLabel,
          )}`}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
