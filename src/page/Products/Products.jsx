import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FaRegListAlt } from 'react-icons/fa';
import useFilteredProduct from '../../hooks/useFilterProduct';
import ProductsCard from './ProductsCard';
import Pagination from '../../Pagination/Pagination';
import ProductSearch from '../ProductSearch/ProductSearch';
import SortByPrice from './SortByPrice';

const Products = () => {
    const { selectedBrand, handleBrandChange, filteredProduct, availableBrands } = useFilteredProduct();
    const [isHoveredList, setIsHoveredList] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productPerPage, setProductPerPage] = useState(8); // Default value
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [sortOrder, setSortOrder] = useState('none'); // State for sorting order

    // Function to determine the product per page based on screen size
    const determineProductPerPage = () => {
        if (window.innerWidth <= 640) {
            setProductPerPage(20);
        } else {
            setProductPerPage(10);
        }
    };

    // useEffect hook to run the function when the component mounts and when the window size changes
    useEffect(() => {
        determineProductPerPage();
        window.addEventListener('resize', determineProductPerPage);
        return () => {
            window.removeEventListener('resize', determineProductPerPage);
        };
    }, []);

    const handleMouseEnterList = () => {
        setIsHoveredList(true);
    };

    const handleMouseLeaveList = () => {
        setIsHoveredList(false);
    };

    const handleSearch = (show) => {
        setShowResults(show);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        setCurrentPage(1); // Reset to the first page on sorting
    };

    // Apply filtering and sorting logic
    const filteredProducts = filteredProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...(showResults ? filteredProducts : filteredProduct)].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.price - b.price; // Sort low to high
        }
        if (sortOrder === 'desc') {
            return b.price - a.price; // Sort high to low
        }
        return 0; // No sorting
    });


    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const displayProduct = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (newPage) => {
        if (newPage <= Math.ceil(sortedProducts.length / productPerPage) && newPage >= 1) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <h1 className="text-3xl text-red-700 font-bold text-center pt-12" data-aos="fade-up">
                Our Products
            </h1>
            <div className="mt-4">
                <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
            </div>
            <ul className="flex text-lg justify-center space-x-4 my-4">
                <li>
                <div
                        className={`flex items-center w-52 p-2 border-4 border-red-700 rounded-md shadow-sm`}
                        onMouseEnter={handleMouseEnterList}
                        onMouseLeave={handleMouseLeaveList}
                    >
                        <span>
                            {isHoveredList ? (
                                <FontAwesomeIcon icon={faListAlt} size="lg" className="mr-2" />
                            ) : (
                                <FaRegListAlt className="mr-2" />
                            )}
                        </span>
                        <select
                            id="brandSelect"
                            value={selectedBrand}
                            onChange={handleBrandChange}
                            className="focus:outline-none text-gray-700 hover:font-bold"
                        >
                            <option value="all">Select Brand</option>
                            {availableBrands.map((brand) => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                </li>

                <li>
                    <SortByPrice handleSortChange={handleSortChange} />
                </li>
            </ul>
            {displayProduct.length > 0 ? (
                <div className="Allserv flex justify-around py-12 px-8">
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {displayProduct.map((product) => (
                            <ProductsCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center h-screen flex flex-col justify-center items-center">No Data found</p>
            )}

            <Pagination
                totalProduct={sortedProducts.length}
                productPerPage={productPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Products;
