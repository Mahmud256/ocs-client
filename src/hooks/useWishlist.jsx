import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: wishlist = [] } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data;
        }
    })

    return [wishlist, refetch]
};

export default useWishlist;