import axios from "axios";
import Cookies from "js-cookie";

const axiosFetching=axios.create({
    baseURL:"http://localhost:5000/api/v1"
});

axiosFetching.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        // console.log(token);
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
    (error)=>{
        console.log(error);
        return Promise.reject(error);
    }
);

export default axiosFetching;