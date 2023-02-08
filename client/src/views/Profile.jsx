import React, { useState, useEffect } from "react";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";
import Spinner from "../components/Spinner";
import useUser from "../hooks/useUser";
import clientAxios from "../Utils/clientAxios";
import Alert from "../components/Alert";
import { green, greenText, red, redText } from "../Utils/colorsAlert";
import { initialAler } from "../Utils/constants";

const Profile = () => {
  const { dataUser, loading, setLoading, setDataUser, readFileAsync } =
    useUser();
  const [profileData, setProfileData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [file, setFile] = useState("");
  const [dataAlert, setDataAlert] = useState(initialAler);
  let b64;

  useEffect(() => {
    const loadingData = () => {
      while (Object.keys(dataUser).length === 0) {
        setLoading(true);
      }
      setProfileData({
        username: dataUser.username,
        password: "",
        email: dataUser.email,
      });
      setLoading(false);
    };
    loadingData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (file.size > 2000000) {
      setLoading(false);
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: "File too large",
      });
      setTimeout(() => {
        setDataAlert(initialAler);
      }, 4000);
      return;
    }

    if (file) {
      b64 = await readFileAsync(file);
    }

    try {
      const { data } = await clientAxios.put(
        `/api/v1/account/userprofile/${dataUser._id}`,
        {
          username: profileData.username,
          password: profileData.password,
          photo: b64,
        }
      );
      if (data.success) {
        setDataUser(data.dataUser);
        setLoading(false);
        setDataAlert({
          colorText: greenText,
          color: green,
          type: "Success",
          text: "Information Updated",
        });
        setTimeout(() => {
          setDataAlert(initialAler);
        }, 2000);
        return;
      }
    } catch (error) {
      setLoading(false);
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: error.response.data.message,
      });
      setTimeout(() => {
        setDataAlert(initialAler);
      }, 4000);
      return;
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="w-[90%] md:w-[40%] mx-auto">
          {loading ? (
            <Spinner />
          ) : (
            <>
              {dataAlert.type && <Alert {...dataAlert} />}
              <form
                className="space-y-4 md:space-y-6 flex flex-col"
                onSubmit={handleSubmit}
              >
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-60 h-60 border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 mx-auto"
                  >
                    {dataUser?.photo || file ? (
                      <img
                        className="rounded-full w-60 h-60"
                        src={file ? URL.createObjectURL(file) : dataUser?.photo}
                        alt="image description"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 inline">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 inline">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}

                    <input
                      id="dropzone-file"
                      className="hidden"
                      accept="image/*"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>

                <InputForm
                  label="Your email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={dataUser?.email}
                  readonly
                />

                <InputForm
                  label="User Name"
                  type="text"
                  name="username"
                  value={profileData.username}
                  handleChange={handleChange}
                />

                <InputForm
                  label="Change Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={profileData.password}
                  handleChange={handleChange}
                />
                <BtnForms title="Save Information" />
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
