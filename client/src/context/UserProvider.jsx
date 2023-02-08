import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../Utils/clientAxios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmUser = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await clienteAxios.get("/api/v1/account/home", config);
      if (data.success) {
        setDataUser(data.dataUser);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
      console.log(error.response);
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  return (
    <UserContext.Provider
      value={{
        dataUser,
        showMenu,
        loading,
        setDataUser,
        setShowMenu,
        confirmUser,
        setLoading,
        readFileAsync,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
