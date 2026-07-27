import { AdminContext } from "./adminContext";
import NavigationBar from "./adminNavBar";
import { useContext, useEffect } from "react";
import PageNotFound from "../pages/NotFound";

export default function Dashboard({ component }) {
  const { admin, refreshAdmin } = useContext(AdminContext);

  useEffect(() => {
    refreshAdmin();
  }, []);

  if (!admin || admin.role !== "admin") return <PageNotFound />;

  return (
    <div className="h-dvh flex bg-gray-100">
      <NavigationBar />
      {component}
    </div>
  );
}
