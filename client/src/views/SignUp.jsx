import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";
import Alert from "../components/Alert";
import { red, redText } from "../Utils/colorsAlert";
import clientAxios from "../Utils/clientAxios";

const initialAler = { colorText: "", color: "", type: "", text: "" };
const initialAccount = {
  email: "",
  password: "",
  username: "",
  passwordConfirm: "",
};

const SignUp = () => {
  const [dataAccount, setDataAccount] = useState(initialAccount);

  const [dataAlert, setDataAlert] = useState(initialAler);

  const handleChange = (e) => {
    setDataAccount({
      ...dataAccount,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        dataAccount.email,
        dataAccount.confirmPassword,
        dataAccount.username,
        dataAccount.confirmPassword,
      ].includes("")
    ) {
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
    if (dataAccount.password !== dataAccount.passwordConfirm) {
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: "Both passwords must be the same",
      });
      setTimeout(() => {
        setDataAlert(initialAler);
      }, 4000);
      return;
    }

    try {
      const data = await clientAxios.post(`/api/v1/account/register`, {
        email: dataAccount.email,
        password: dataAccount.password,
        username: dataAccount.username,
      });
      console.log(data);
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
              Sign up
            </h1>

            {dataAlert.type && <Alert {...dataAlert} />}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <InputForm
                label="Your email"
                type="email"
                name="email"
                placeholder="name@company.com"
                value={dataAccount.email}
                handleChange={handleChange}
              />
              <InputForm
                label="User Name"
                type="text"
                name="username"
                placeholder="Daniel Alejo"
                value={dataAccount.username}
                handleChange={handleChange}
              />
              <InputForm
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={dataAccount.password}
                handleChange={handleChange}
              />
              <InputForm
                label="Confirm Password"
                type="password"
                name="passwordConfirm"
                placeholder="••••••••"
                value={dataAccount.confirmPassword}
                handleChange={handleChange}
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
