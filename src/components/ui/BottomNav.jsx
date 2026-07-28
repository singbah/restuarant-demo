import { Home, ShoppingBag, User, Bell, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate(null);
  return (
    <div className="z-50 sticky bottom-0 flex justify-around items-center border-t-2 pt-2 border-gray-400 bg-white">
      <Home
        className="cursor-pointer hover:scale-103 transition hover:text-blue-500 "
        onClick={() => navigate("/market")}
      />
      <ShoppingBag className="cursor-pointer hover:scale-103 transition hover:text-blue-600" />
      <User
        onClick={() => navigate("/profile")}
        className="cursor-pointer hover:scale-103 transition hover:text-blue-600"
      />
      <Bell className="cursor-pointer hover:scale-103 transition hover:text-blue-600" />
      <Plus
        onClick={() => navigate("/addItem")}
        className="cursor-pointer hover:scale-103 transition hover:text-blue-600"
      />
    </div>
  );
}
