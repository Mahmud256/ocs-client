import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://online-camera-shop-server.vercel.app/',
    baseURL: `${import.meta.env.VITE_LOCALHOST_KEY}/`,

});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;