import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function Header() {
  const { dataUser, confirmUser, setShowMenu, showMenu } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    confirmUser(token);
  }, []);

  const toYourArtitles = () => {
    setShowMenu(false);
    navigate("/home");
  };

  const toNewArtitle = () => {
    setShowMenu(false);
    navigate("/newartitle");
  };

  const toProfile = () => {
    setShowMenu(false);
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between  px-5  dark:bg-gray-900 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link to="/" onClick={() => setShowMenu(false)}>
          <span className="text-3xl lg:text-4xl text-white font-extrabold">
            My Blog
          </span>
        </Link>
      </div>

      {token ? (
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            {dataUser?.username}
            <svg
              className="w-4 h-4 ml-1"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              showMenu ? "block" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700 mt-1`}
            style={{
              position: "absolute",
              inset: " 0px auto auto 0px",
              margin: "0px",
              transform: "translate(0px, 41px)",
            }}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <button
                  onClick={toProfile}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={toYourArtitles}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                >
                  Your Artitles
                </button>
              </li>
              <li>
                <button
                  onClick={toNewArtitle}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full"
                >
                  Add New Artitle
                </button>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-red-800 dark:hover:text-white w-full"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
          <Link
            to="/signin"
            className="px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap text-base font-medium text-gray-500 hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-blue-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-900"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
