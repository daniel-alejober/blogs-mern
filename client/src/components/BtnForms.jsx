import React from "react";

const BtnForms = ({ title }) => {
  return (
    <button
      type="submit"
      className="px-4 py-2 w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap text-base font-medium text-gray-500 hover:text-white"
    >
      {title}
    </button>
  );
};

export default BtnForms;
