import React from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";

const SignUp = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-8 px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <InputForm
                label="Your email"
                type="email"
                name="email"
                placeholder="name@company.com"
              />
              <InputForm
                label="User Name"
                type="text"
                name="username"
                placeholder="Daniel Alejo"
              />
              <InputForm
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
              />
              <InputForm
                label="Confirm Password"
                type="password"
                name="passwordConfirm"
                placeholder="••••••••"
              />
              <BtnForms title="Sign up" />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Do you have a account?
                <Link
                  to="/signin"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 mx-2"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
