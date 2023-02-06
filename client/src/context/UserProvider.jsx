import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../Utils/clientAxios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({});
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <UserContext.Provider
      value={{ dataUser, showMenu, setDataUser, setShowMenu, confirmUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;