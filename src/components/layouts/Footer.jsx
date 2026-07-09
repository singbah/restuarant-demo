import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import {
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            Easi Tech Lr.
          </h2>

          <p className="mt-4 text-sm leading-6">
            Stay informed with current market prices,
            exchange rates, fuel prices, and practical
            financial information for Liberia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/market" className="hover:text-white">
                Market Prices
              </Link>
            </li>

            <li>
              <Link to="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>

            <li>
              <Link to="/policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <a href="https://www.facebook.com/profile.php?id=61591098313601" className="hover:text-blue-500">
              <FaFacebook />
            </a>

            <a href="#" className="hover:text-red-500">
              <BsYoutube />
            </a>

            <a href="https://www.wa.me/+231777322000" className="hover:text-green-500">
              <FaWhatsapp />
            </a>

            <a href="#" className="hover:text-white">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Easi Tech Lr. All rights reserved.
      </div>
    </footer>
  );
}