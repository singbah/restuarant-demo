import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ShoppingBag,
  Lock,
  Eye,
  MessageCircle,
  Database,
  ArrowLeft,
  ChevronRight,
  Mail,
  UserCheck,
  Server,
  Bell,
  Globe,
  Users,
} from "lucide-react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      label: "Overview",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: "collection",
      label: "1. Information We Collect",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "usage",
      label: "2. How We Use Information",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "whatsapp",
      label: "3. WhatsApp & Orders",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      id: "cookies",
      label: "4. Cookies & Analytics",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "thirdparty",
      label: "5. Third-Party Services",
      icon: <Server className="w-4 h-4" />,
    },
    {
      id: "email",
      label: "6. Email & Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: "security",
      label: "7. Data Security",
      icon: <Lock className="w-4 h-4" />,
    },
    {
      id: "external",
      label: "8. External Links",
      icon: <Globe className="w-4 h-4" />,
    },
    {
      id: "children",
      label: "9. Children's Privacy",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "rights",
      label: "10. Your Rights & Changes",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "contact",
      label: "11. Contact Us",
      icon: <Mail className="w-4 h-4" />,
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
      {/* Helmet Metadata */}
      <Helmet>
        <title>Privacy Policy | Easi Tech Lr Marketplace</title>
        <meta
          name="description"
          content="Read the Privacy Policy of Easi Tech Lr and learn how we collect, use, and protect your information across our marketplace and WhatsApp order routing."
        />
        <link rel="canonical" href="https://www.easitechlr.com/privacy" />
      </Helmet>

      {/* Top Navigation Header */}
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
              Easi Tech Lr
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
              <ShieldCheck className="w-3.5 h-3.5" />
              Effective Date: July 7, 2026
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Welcome to <strong>Easi Tech Lr</strong>. We respect your privacy
              and are committed to protecting your personal information. This
              Privacy Policy explains what information we collect, how we use
              it, and how WhatsApp order routing operates on our marketplace.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Navigation Sidebar */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-2xs sticky top-24 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-2 block">
                Navigation
              </span>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
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
          <div className="lg:col-span-3 space-y-6">
            {/* Overview Card */}
            <section
              id="overview"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-3"
            >
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Welcome to Easi Tech Lr
              </h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                We operate a vendor-direct marketplace venue. We connect buyers
                with sellers by forwarding product inquiries directly to the
                seller’s WhatsApp DM.{" "}
                <strong>
                  We do NOT collect, process, or hold payments on behalf of any
                  user.
                </strong>
              </p>
            </section>

            {/* Section 1 */}
            <section
              id="collection"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  1. Information We Collect
                </h2>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  Your name, phone number, and store details (when voluntarily
                  provided during vendor setup).
                </li>
                <li>
                  Your email address (for account verification and contact).
                </li>
                <li>
                  Messages and inquiries submitted through our contact form.
                </li>
                <li>Newsletter subscription details.</li>
                <li>
                  Product listing titles, prices, descriptions, and uploaded
                  images.
                </li>
                <li>
                  Browser type, operating system, IP address, pages visited, and
                  device information.
                </li>
                <li>Cookies and similar technical session technologies.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section
              id="usage"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  2. How We Use Your Information
                </h2>
              </div>
              <ul className="text-xs text-gray-600 space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  Facilitate marketplace listings and vendor profile management.
                </li>
                <li>Respond to your support inquiries and platform reports.</li>
                <li>Deliver newsletters and essential operational updates.</li>
                <li>Improve our website architecture and service stability.</li>
                <li>
                  Analyze aggregate website traffic and performance metrics.
                </li>
                <li>
                  Prevent fraud, abusive listings, and unauthorized
                  administrative access.
                </li>
                <li>Comply with applicable legal obligations.</li>
              </ul>
            </section>

            {/* Section 3 - Marketplace Specific */}
            <section
              id="whatsapp"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  3. WhatsApp Redirection & Payment Policy
                </h2>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-950">
                    Direct Order Forwarding
                  </h4>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    When you order an item on <strong>Easi Tech Lr</strong>,
                    your order details are forwarded directly to the seller's
                    WhatsApp DM. All payments and delivery terms are arranged
                    directly between you and the vendor.
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We do not intercept, store, or monitor your private chat history
                or money transfers conducted on WhatsApp.
              </p>
            </section>

            {/* Section 4 */}
            <section
              id="cookies"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  4. Cookies
                </h2>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our website uses cookies and HTTP-only session tokens to improve
                user experience, manage secure login sessions, and analyze
                platform performance. You may disable cookies through your
                browser settings, although some interactive features (like
                vendor dashboards) may not function properly.
              </p>
            </section>

            {/* Section 5 */}
            <section
              id="thirdparty"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <Server className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  5. Third-Party Services
                </h2>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                We use trusted third-party infrastructure and analytics
                providers, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {[
                  "Google Analytics",
                  "Google Search Console",
                  "Resend",
                  "Cloudflare R2",
                  "Railway",
                  "Vercel",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-gray-50 border border-gray-100 rounded-xl p-2.5 text-center text-xs font-semibold text-gray-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed pt-1">
                These services may collect technical information according to
                their respective privacy policies.
              </p>
            </section>

            {/* Section 6 & 7 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section
                id="email"
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-3"
              >
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  6. Email Communications
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If you subscribe to our newsletter or contact us, we may send
                  updates and responses related to Easi Tech Lr. You can
                  unsubscribe at any time using the link in our emails.
                </p>
              </section>

              <section
                id="security"
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-3"
              >
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  7. Data Security
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We implement reasonable administrative and technical
                  safeguards to protect your personal information. However, no
                  method of electronic storage or transmission is 100% secure.
                </p>
              </section>
            </div>

            {/* Section 8 & 9 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section
                id="external"
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-3"
              >
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  8. External Links
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our website contains links to third-party platforms (such as
                  WhatsApp). We are not responsible for the privacy practices or
                  content of external services.
                </p>
              </section>

              <section
                id="children"
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-2xs space-y-3"
              >
                <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  9. Children's Privacy
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Easi Tech Lr is not directed toward children under the age of
                  13. We do not knowingly collect personal information from
                  children.
                </p>
              </section>
            </div>

            {/* Section 10 */}
            <section
              id="rights"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  10. Your Rights & Policy Changes
                </h2>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Depending on your location, you may request access to,
                correction, or deletion of your personal data. We may update
                this Privacy Policy periodically, and changes will be posted on
                this page with an updated effective date.
              </p>
            </section>

            {/* Section 11 - Contact Box */}
            <section
              id="contact"
              className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-2xs space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  11. Contact Us
                </h2>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you have any questions regarding this Privacy Policy or how
                your information is handled, please reach out to us:
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 space-y-2 text-xs">
                <p className="font-bold text-gray-900">Easi Tech Lr</p>
                <p className="text-gray-600">
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.easitechlr.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 underline hover:text-emerald-700"
                  >
                    https://www.easitechlr.com/contact
                  </a>
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@easitechlr.com"
                    className="text-emerald-600 underline hover:text-emerald-700"
                  >
                    support@easitechlr.com
                  </a>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate("/market")}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-5 rounded-xl transition cursor-pointer"
                >
                  Return to Marketplace
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
