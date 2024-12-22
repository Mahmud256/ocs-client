import Swal from "sweetalert2";
import MyProductsCard from "./MyProductsCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SortByPrice from "../../Products/SortByPrice";
import { useState } from "react";
import usePersonalProduct from "../../../hooks/usePersonalProduct";
import useAuth from "../../../hooks/useAuth";

const MyProducts = () => {
    const { user } = useAuth();
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [product] = usePersonalProduct();
    const axiosSecure = useAxiosSecure();

    const [sortOrder, setSortOrder] = useState("none"); // State for sorting order

    // Handle product removal
    const handleRemove = (_id) => {
        const productToDelete = product.find((p) => p._id === _id);
        if (productToDelete && productToDelete.creator === user?.email) {
            Swal.fire({
                title: "Are you sure?",
                text: "You will not be able to recover this product!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/product/${_id}`).then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your product has been deleted.", "success");
                            window.location.reload(); // Trigger a full refresh to update state
                        }
                    });
                }
            });
        }
    };

    // Filter products based on selected brand
    const filteredProduct = product.filter((product) => {
        if (selectedBrand === 'all') {
            return true;
        } else {
            return product.brand === selectedBrand;
        }
    });

    // Sort products based on price and selected sort order
    const sortedProducts = filteredProduct.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price; // Sort low to high
        } else if (sortOrder === 'desc') {
            return b.price - a.price; // Sort high to low
        }
        return 0; // Default case if no sorting is selected
    });

    // Handle sorting order change
    const handleSortChange = (event) => {
        setSortOrder(event.target.value); // Update the sortOrder
    };

    // Handle brand change
    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    // Get all unique brands
    const availableBrands = [...new Set(product.map((item) => item.brand))];

    return (
        <div>
            <h1 className="text-3xl text-red-700 font-bold text-center pt-12" data-aos="fade-up">
                My Products
            </h1>
            <div className="text-center mt-4 flex flex-col items-center">
                <label htmlFor="sortSelect" className="block text-gray-700 text-sm font-bold mb-2">
                    Total Products: {product.length}
                </label>
                <div className="flex gap-1">
                    {/* Brand selection dropdown */}
                    <select
                        id="brandSelect"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="focus:outline-none text-gray-700 hover:font-bold p-2 border-2 rounded-md"
                    >
                        <option value="all">Select Brand</option>
                        {availableBrands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    {/* Sorting dropdown */}
                    <SortByPrice handleSortChange={handleSortChange} />
                </div>
            </div>
            {filteredProduct.length > 0 ? (
                <div className="Allserv flex justify-around py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {sortedProducts.map((product) => (
                            <MyProductsCard
                                key={product._id}
                                product={product}
                                handleRemove={handleRemove}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center h-screen flex flex-col justify-center items-center">
                    No Data found
                </p>
            )}
        </div>
    );
};

export default MyProducts;
