import React, { useState } from "react";
import clientAxios from "../Utils/clientAxios";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";
import Alert from "../components/Alert";
import { red, redText } from "../Utils/colorsAlert";

const initialAler = { colorText: "", color: "", type: "", text: "" };

const SignIn = () => {
  const navigate = useNavigate();
  const [dataAccount, setDataAccount] = useState({
    email: "",
    password: "",
  });

  const [dataAlert, setDataAlert] = useState(initialAler);

  const handleChange = (e) => {
    setDataAccount({
      ...dataAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([dataAccount.email, dataAccount.password].includes("")) {
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: "All inputs are required",
      });
      setTimeout(() => {
        setDataAlert(initialAler);
      }, 4000);
      return;
    }

    try {
      const data = await clientAxios.post(`/api/v1/account/login`, {
        email: dataAccount.email,
        password: dataAccount.password,
      });
      if (data.data.success) {
        navigate("/home");
      }
    } catch (error) {
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: error.response.data.msg,
      });
      setTimeout(() => {
        setDataAlert(initialAler);
      }, 4000);
      return;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center py-8 px-6 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {dataAlert.type && <Alert {...dataAlert} />}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputForm
                label="Your email"
                type="email"
                name="email"
                placeholder="name@company.com"
                handleChange={handleChange}
              />
              <InputForm
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                handleChange={handleChange}
              />
              <BtnForms title="Sign in" />

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 mx-2"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
