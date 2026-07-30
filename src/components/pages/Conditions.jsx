import { useState } from "react";
import {
  ShieldAlert,
  ShoppingBag,
  CreditCard,
  UserCheck,
  FileText,
  ChevronRight,
  ArrowLeft,
  Mail,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      label: "1. Overview & Service Role",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "payments",
      label: "2. Payments & WhatsApp Orders",
      icon: <CreditCard className="w-4 h-4" />,
    },
    {
      id: "responsibilities",
      label: "3. Buyer & Seller Responsibilities",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "liability",
      label: "4. Limitation of Liability",
      icon: <ShieldAlert className="w-4 h-4" />,
    },
    {
      id: "termination",
      label: "5. Termination & Dispute",
      icon: <HelpCircle className="w-4 h-4" />,
    },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">
              Marketplace Legal
            </span>
          </div>

          <div className="w-12"></div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 pt-8">
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              <FileText className="w-3.5 h-3.5" />
              Effective Date: July 30, 2026
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Please read these terms carefully before using our platform. By
              accessing or placing orders through our marketplace, you agree to
              these operating terms.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-2xs sticky top-24 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-2 block">
                On This Page
              </span>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeSection === s.id
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {s.icon}
                    <span className="truncate">{s.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </aside>

          {/* Document Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <section
              id="overview"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  1. Overview & Platform Role
                </h2>
              </div>
              <div className="text-xs text-gray-600 leading-relaxed space-y-3">
                <p>
                  <strong>1.1 Marketplace Venue Only:</strong> Our platform
                  operates strictly as an online catalog and venue connecting
                  independent buyers with verified Vendors.
                </p>
                <p>
                  <strong>1.2 No Direct Inventory:</strong> We do not inspect,
                  stock, manufacture, store, or ship any products listed on this
                  platform. All product details are published directly by
                  independent sellers.
                </p>
                <p>
                  <strong>1.3 Forwarding to WhatsApp:</strong> When you click to
                  order or inquire about an item, your request and item details
                  are forwarded directly to the seller’s WhatsApp Direct Message
                  (DM).
                </p>
              </div>
            </section>

            {/* Section 2 - Highlighted Warning */}
            <section
              id="payments"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  2. Payments & WhatsApp Orders
                </h2>
              </div>

              {/* Notice Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900">
                    Important Payment Disclaimer
                  </h4>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    We do <strong>NOT</strong> process, hold, collect, or escrow
                    money on behalf of buyers or vendors. All payment
                    transactions happen off-platform directly between you and
                    the seller.
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-600 leading-relaxed space-y-3">
                <p>
                  <strong>2.1 Direct Transactions:</strong> Prices, payment
                  methods (Mobile Money, Cash on Delivery, Bank Transfer), and
                  delivery options are negotiated directly in your WhatsApp
                  conversation with the Vendor.
                </p>
                <p>
                  <strong>2.2 Financial Non-Liability:</strong> We accept no
                  responsibility or liability for failed money transfers,
                  payment disputes, fraudulent claims, or lost funds resulting
                  from direct deals made via WhatsApp or outside our website.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="responsibilities"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  3. Buyer & Seller Responsibilities
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Buyer Responsibilities
                  </span>
                  <ul className="text-[11px] text-gray-600 space-y-1.5 list-disc list-inside">
                    <li>Verify Vendor details before sending payment.</li>
                    <li>
                      Inspect goods upon delivery before finalizing payment.
                    </li>
                    <li>
                      Conduct all off-platform deals at your own discretion.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-2">
                  <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Vendor Responsibilities
                  </span>
                  <ul className="text-[11px] text-gray-600 space-y-1.5 list-disc list-inside">
                    <li>
                      Provide truthful product details, photos, and prices.
                    </li>
                    <li>No posting of illegal, stolen, or hazardous goods.</li>
                    <li>Fulfill WhatsApp orders in good faith.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="liability"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  4. Limitation of Liability
                </h2>
              </div>
              <div className="text-xs text-gray-600 leading-relaxed space-y-3">
                <p>
                  To the maximum extent permitted by applicable law, the
                  platform operators, owners, and affiliates shall not be liable
                  for any indirect, incidental, or consequential damages arising
                  from:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 pl-2">
                  <li>
                    Inaccurate or misleading product listings posted by Vendors.
                  </li>
                  <li>
                    Undelivered, damaged, or counterfeit products received from
                    sellers.
                  </li>
                  <li>
                    Disputes, delays, or issues occurring within WhatsApp
                    conversations.
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="termination"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  5. Account Termination & Support
                </h2>
              </div>
              <div className="text-xs text-gray-600 leading-relaxed space-y-3">
                <p>
                  We reserve the right to remove non-compliant product listings
                  or ban Vendor accounts that engage in fraudulent behavior,
                  impersonation, or violations of these terms.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="mailto:support@yourdomain.com"
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Report Fraudulent Seller</span>
                  </a>
                  <button
                    onClick={() => navigate("/market")}
                    className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
                  >
                    Return to Marketplace
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
