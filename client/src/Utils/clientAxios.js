import axios from "axios";

const clientAxios = axios.create();
clientAxios.defaults.baseURL = import.meta.env.VITE_URL_BACKEND;

export default clientAxios;
