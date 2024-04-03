import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

const MainLayout = () => {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("/register") ||
    location.pathname.includes("/login");
  return (
    <div>
      {noHeaderFooter || <Navbar />}

      <Outlet />
    </div>
  );
};

export default MainLayout;
