import axios from "axios";

const axiosPublic = axios.create({
    // baseURL: 'https://online-camera-shop-server.vercel.app/',
    baseURL: 'https://ocs-server.vercel.app/',
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;