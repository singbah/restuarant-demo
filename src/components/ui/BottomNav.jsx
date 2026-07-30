import { Home, ShoppingBag, User, Bell, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
      icon: Home,
      path: "/market",
    },
    {
      label: "Shop",
      icon: ShoppingBag,
      path: "#",
    },
    {
      label: "Add",
      icon: Plus,
      path: "/addItem",
      isAction: true, // Highlights the add button
    },
    {
      label: "Alerts",
      icon: Bell,
      path: "#",
    },
    {
      label: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200/80 shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center -mt-5 focus:outline-none group"
                aria-label={item.label}
              >
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 group-hover:bg-emerald-700 group-active:scale-95 transition-all">
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-medium text-gray-500 mt-1">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-150 focus:outline-none active:scale-95 ${
                isActive
                  ? "text-emerald-600 font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full" />
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
