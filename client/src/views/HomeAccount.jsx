import React, { useEffect } from "react";
import useUser from "../hooks/useUser";

const HomeAccount = () => {
  const { confirmUser } = useUser();
  const token = localStorage.getItem("token");

  useEffect(() => {
    confirmUser(token);
  }, []);

  return <div>HomeAccount</div>;
};

export default HomeAccount;
