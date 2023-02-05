import React from "react";

const Alert = ({ color, colorText, type, text }) => {
  return (
    <div
      className={`flex p-4 mb-4 text-sm ${colorText} border ${color} rounded-lg bg-blue-50 dark:bg-gray-800 dark:${colorText} dark:${color}`}
      role="alert"
    >
      <div>
        <span className="font-medium">{type} alert!</span> {text}
      </div>
    </div>
  );
};

export default Alert;
