import axios from "axios";
import useAuthContext from "./useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const axiosSecure = axios.create({ baseURL: "http://localhost:4000" });

const useAxiosSecure = () => {
  const { logOut } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Add a request interceptor
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor 401 && 403 error code
  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const status = error.response.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login", { state: { from: location } });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
