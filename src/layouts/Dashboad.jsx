import { NavLink, Outlet } from "react-router-dom";
import useCarts from "../hooks/useCarts";
import useAdmin from "../hooks/useAdmin";

const Dashboad = () => {
  const [carts] = useCarts();
  const [isAdmin] = useAdmin();

  console.log(isAdmin);

  return (
    <div className="flex">
      <div className="w-64 bg-orange-400 min-h-[100vh]">
        <ul className="p-2 text-lg space-y-2">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  className="bg-green-400 px-10 py-1 space-y-4"
                  to={"/dashboard/AdminHome"}
                >
                  Admin Home
                </NavLink>
              </li>
              <li className="bg-green-400 px-10 py-1 space-y-4">
                <NavLink to={"/dashboard/addItems"}>Add Items</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manageItems"}>Manage Items</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/bookingItems"}>Booking Items</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/allUsers"}>All Users</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/dashboard/userHome"}>User Home</NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/myCarts"}>
                  My Carts ({carts.length})
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/paymentHistory"}>
                  Payment History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboad;
