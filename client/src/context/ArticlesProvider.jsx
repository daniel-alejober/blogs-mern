import { createContext, useState } from "react";
import clienteAxios from "../Utils/clientAxios";

const ArticlesContext = createContext();

const ArticleProvider = ({ children }) => {
  const [dataArticles, setDataArticles] = useState([]);

  const getAllArticles = async () => {
    try {
      const { data } = await clienteAxios.get("/api/v1/artitle/all-articles");

      if (data.success) {
        setDataArticles(data.articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ArticlesContext.Provider value={{ getAllArticles, dataArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export { ArticleProvider };
export default ArticlesContext;
