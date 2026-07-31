import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle, // WhatsApp
  Send, // Telegram
} from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function ProductShareModal({
  isOpen = false,
  onClose,
  product = {
    id: "123",
    name: "Sample Product Title",
    price: "$25.00",
    photo: null,
  },
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate dynamic product link
  const productUrl = `${window.location.origin}/product/${product?.slug || ""}`;
  const shareText = `Check out "${product?.product_name}" on Easi Tech Lr. for ${product?.price || ""}!`;

  // Handle Copy to Clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  // Social Share Handlers
  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareText} ${productUrl}`,
      )}`,
    },
    {
      name: "Facebook",
      icon: <FaFacebook className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl,
      )}`,
    },
    {
      name: "X (Twitter)",
      icon: <X className="w-5 h-5 text-sky-500" />,
      bg: "bg-sky-50 hover:bg-sky-100 border-sky-200",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText,
      )}&url=${encodeURIComponent(productUrl)}`,
    },
    {
      name: "Telegram",
      icon: <Send className="w-5 h-5 text-cyan-600" />,
      bg: "bg-cyan-50 hover:bg-cyan-100 border-cyan-200",
      url: `https://t.me/share/url?url=${encodeURIComponent(
        productUrl,
      )}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 relative space-y-5 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
            <Share2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Product Published! 🎉
          </h2>
          <p className="text-xs text-gray-500">
            Share your item link with buyers across social media to boost sales.
          </p>
        </div>

        {/* Product Preview Snippet */}
        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100">
          {product?.featured_image ? (
            <img
              src={product.featured_image}
              alt={product.product_name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
              IMG
            </div>
          )}
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-gray-800 truncate">
              {product?.product_name || "Product Title"}
            </h4>
            <p className="text-xs font-semibold text-emerald-600">
              {product?.price || ""}
            </p>
          </div>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Product URL
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1.5 bg-gray-50/50 focus-within:border-emerald-500 transition">
            <input
              type="text"
              readOnly
              value={productUrl}
              className="w-full text-xs text-gray-700 bg-transparent px-2 outline-none font-mono truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            Share directly on
          </label>
          <div className="grid grid-cols-4 gap-2">
            {shareLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl border transition active:scale-95 ${item.bg}`}
                title={`Share on ${item.name}`}
              >
                {item.icon}
                <span className="text-[10px] font-medium text-gray-700 mt-1">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <button
          onClick={onClose}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 rounded-xl transition cursor-pointer"
        >
          Done / Close
        </button>
      </div>
    </div>
  );
}
