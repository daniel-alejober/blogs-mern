import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";
import { modules, formats } from "../Utils/constants";
import clientAxios from "../Utils/clientAxios";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { green, greenText, red, redText } from "../Utils/colorsAlert";
import { initialAler } from "../Utils/constants";
import useUser from "../hooks/useUser";

const NewArtitle = () => {
  const { readFileAsync } = useUser();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [artitle, setArtitle] = useState({
    title: "",
    summary: "",
  });
  const [photo, setPhoto] = useState("");
  const [content, setContent] = useState("");
  const [dataAlert, setDataAlert] = useState(initialAler);
  const [loading, setLoading] = useState(false);
  let newb64;

  const handleChange = (e) => {
    setArtitle({
      ...artitle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if ([artitle.summary, artitle.title, content].includes("")) {
      setLoading(false);
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

    if (photo.size > 2000000) {
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

    if (photo) {
      newb64 = await readFileAsync(photo);
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/api/v1/artitle/newartitle`,
        {
          title: artitle.title,
          summary: artitle.summary,
          content,
          photo: newb64,
        },
        config
      );

      if (data.success) {
        setLoading(false);
        setDataAlert({
          colorText: greenText,
          color: green,
          type: "Success",
          text: data.msg,
        });
        setTimeout(() => {
          setDataAlert(initialAler);
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: error.response?.data?.message,
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
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
            Create Post
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {dataAlert.type && <Alert {...dataAlert} />}
              <form
                className="space-y-4 md:space-y-6 flex flex-col"
                onSubmit={handleSubmit}
              >
                <InputForm
                  label="Title Artitle"
                  type="text"
                  name="title"
                  placeholder="How to learn JavaScript"
                  value={artitle.title}
                  handleChange={handleChange}
                />
                <InputForm
                  label="Summary"
                  type="text"
                  name="summary"
                  placeholder="JavaScript is a programming language..."
                  value={artitle.summary}
                  handleChange={handleChange}
                />
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="file_input"
                  >
                    Upload file
                  </label>
                  <input
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-700 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="file_input"
                    accept="image/*"
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                </div>
                <ReactQuill
                  theme="snow"
                  style={{ color: "white" }}
                  modules={modules}
                  formats={formats}
                  value={content}
                  onChange={(newValue) => setContent(newValue)}
                />

                <BtnForms title="Create Post" />
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArtitle;
