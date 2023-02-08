import { useContext } from "react";
import ArticlesContext from "../context/ArticlesProvider";

const useArtitle = () => {
  return useContext(ArticlesContext);
};

export default useArtitle;
