import { createContext, useState } from "react";
import clienteAxios from "../Utils/clientAxios";

const ArticlesContext = createContext();

const ArticleProvider = ({ children }) => {
  const getAllArticles = async () => {
    try {
      const data = await clienteAxios.get("/api/v1/artitle/all-articles");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ArticlesContext.Provider value={{ getAllArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export { ArticleProvider };
export default ArticlesContext;
