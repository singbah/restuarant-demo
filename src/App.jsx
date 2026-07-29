import { Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/Home";
import Blogs from "./components/pages/Blog";
import PostsDetails from "./components/blog/PostDetails";
import ContactPage from "./components/pages/Contact";
import Analytics from "./components/admins/Analytics";
import { AdminLogin } from "./components/admins/auths";
import PostEditors from "./components/admins/PostEditor";
import Settings from "./components/admins/Settings";
import ContactMessage from "./components/admins/ContactMessages";
import FullBudgetPlaner from "./components/utilities/FullBudgetPlaner";
import PrivacyPolicy from "./components/pages/Policy";
import ProductListing from "./components/layouts/ProductListing";
import MarketPlace from "./components/layouts/MarkPlace";
import {
  ForgotPassword,
  OTPConfirmation,
  PasswordReset,
  VendorSignIn,
  VendorSignUp,
} from "./components/vendors/VendorsAuths";
import Product from "./components/ui/SingleProduct";
import VendorProfile from "./components/vendors/Profile";
import TermsAndConditions from "./components/pages/Conditions";

export default function App() {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/post/:postSlug" element={<PostsDetails />} />
        <Route path="/product/:prodcutSlug" element={<Product />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/conditions" element={<TermsAndConditions />} />
        <Route path="/addItem" element={<ProductListing />} />
        <Route path="/market" element={<MarketPlace />} />
        <Route path="/budget/planer" element={<FullBudgetPlaner />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/post/editor" element={<PostEditors />} />
        <Route path="/admin/messages" element={<ContactMessage />} />

        <Route path="/vendor-signin" element={<VendorSignIn />} />
        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-confirm" element={<OTPConfirmation />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/profile" element={<VendorProfile />} />
      </Routes>
    </div>
  );
}
