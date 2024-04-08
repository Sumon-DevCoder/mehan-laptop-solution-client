import { Link, NavLink } from "react-router-dom";
import brandLogo from "../../../assets/logo.jpg";
import useAuthContext from "./../../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useCarts from "../../../hooks/useCarts";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useAuthContext();
  const [carts, refetch] = useCarts();
  const [isAdmin] = useAdmin();

  const signOut = () => {
    return logOut()
      .then(() => {
        // alert
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "logOut Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => console.log(error.message));
  };

  refetch();

  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/laptop"}>Laptop</NavLink>
      </li>

      {user && isAdmin && (
        <li>
          <NavLink to={"/dashboard/adminHome"}>Dashboard</NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink to={"/dashboard/userHome"}>Dashboard</NavLink>
        </li>
      )}

      {user ? (
        <>
          <li>
            <Link to={"/dashboard/myCarts"}>
              <button className="btn">
                Inbox
                <div className="badge badge-secondary">+{carts.length}</div>
              </button>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div>
      <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-1 rtl:space-x-reverse"
          >
            <img src={brandLogo} className="h-6" alt="Flowbite Logo" />
            <span className="self-center text-2xl text-green-900  font-bold whitespace-nowrap dark:text-white">
              MEHAN LAPTOP SOLUTION
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium text-md uppercase flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navLinks}
            </ul>
          </div>
          {user ? (
            <details className="dropdown">
              <summary className="m-1 btn">open or close</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <li>{user?.displayName}</li>
                <li>
                  <button onClick={signOut}>LogOut</button>
                </li>
              </ul>
            </details>
          ) : (
            <Link to={"/login"}>
              {" "}
              <button className="btn btn-primary btn-sm">Login</button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
