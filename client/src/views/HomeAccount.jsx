import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../Utils/clientAxios";
import useUser from "../hooks/useUser";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { initialAler } from "../Utils/constants";
import { red, redText } from "../Utils/colorsAlert";

const HomeAccount = () => {
  const { confirmUser, dataUser, loading, setLoading } = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [dataAlert, setDataAlert] = useState(initialAler);
  const [dataArticles, setDataArticles] = useState([]);

  useEffect(() => {
    const loadingData = async () => {
      await confirmUser(token);
      while (Object.keys(dataUser).length === 0) {
        setLoading(true);
      }
      await getArticlesByUser(dataUser._id);
    };
    loadingData();
  }, []);

  const getArticlesByUser = async (id) => {
    try {
      const { data } = await clientAxios.get(`/api/v1/artitle/user/${id}`);

      if (data.success) {
        setDataArticles(data.articles);
      }
      console.log(dataArticles);
    } catch (error) {
      setLoading(false);
      setDataAlert({
        colorText: redText,
        color: red,
        type: "Danger",
        text: error.response.data.message,
      });
      setTimeout(() => {
        setDataAlert(initialAler);
        navigate("/");
      }, 4000);
      return;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="w-[90%] md:w-[90%] mx-auto">
          <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-center ">
            Your Posts
          </h2>
          {dataAlert.type && <Alert {...dataAlert} />}
          {dataArticles?.length === 0 ? (
            <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-blue-900 text-center">
              You don´t have posts yet!!
            </h2>
          ) : (
            <div className="w-full flex justify-center flex-wrap gap-6 mt-12  md:flex-1">
              {dataArticles.map((article) => (
                <Card key={article._id} {...article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeAccount;
