import React from "react";
import InputForm from "../components/InputForm";
import BtnForms from "../components/BtnForms";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../Utils/constants";

const NewArtitle = () => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="w-[90%] md:w-[40%] mx-auto">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center">
            Create Post
          </h2>
          <form className="space-y-4 md:space-y-6 flex flex-col">
            <InputForm
              label="Title Artitle"
              type="text"
              name="title"
              placeholder="How to learn JavaScript"
            />
            <InputForm
              label="Summary"
              type="text"
              name="summary"
              placeholder="JavaScript is a programming language..."
            />
            <div>
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-700 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                accept="image/*"
                type="file"
              />
            </div>
            <ReactQuill
              theme="snow"
              style={{ color: "white" }}
              modules={modules}
              formats={formats}
            />

            <BtnForms title="Create Post" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewArtitle;
