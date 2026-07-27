import Footer from "./Footer";

import NavBar from "./navbar";

export default function LayoutScreen({ compo }) {
  return (
    <div className="flex-1">
      <NavBar />
      <div className="flex flex-col gap-6 lg:flex-row lg:mx-20">
        <main className="flex-1">{compo}</main>

        <aside className="w-full lg:w-80 shrink-0 lg:mt-20">
          <div>Sponsors Banners</div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
