import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex items-center justify-between  px-5  dark:bg-gray-900 border-gray-100 py-6 md:justify-start md:space-x-10">
      <div className="flex justify-start lg:w-0 lg:flex-1">
        <Link to="/">
          <span className="text-3xl lg:text-4xl text-white font-extrabold">
            My Blog
          </span>
        </Link>
      </div>

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
    </div>
  );
}
