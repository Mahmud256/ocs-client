import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export const usePersonalProduct = () => {
    const { user } = useAuth();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            if (user?.email) {
                const url = `https://ocs-server.vercel.app/product?email=${user.email}`;
                try {
                    const response = await fetch(url);
                    const data = await response.json();

                    if (Array.isArray(data)) {
                        const creatorProducts = data.filter(item => item.creator === user.email);
                        setProduct(creatorProducts);
                    }
                } catch (error) {
                    console.error("Failed to fetch products:", error);
                }
            }
        };

        fetchProducts();
    }, [user?.email]); // Dependency fixed

    return [product];
};

export default usePersonalProduct;