import { useState } from 'react';
import useProduct from './useProduct';

const useFilteredProduct = () => {
    const [product] = useProduct();
    const [selectedBrand, setSelectedBrand] = useState('all');
    const [sort, setSort] = useState('asc');

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleSort = (event) => {
        setSort(event.target.value);
    };

    const availableBrands = [...new Set(product.map((item) => item.brand))];
    const availablePrice = [...new Set(product.map((item) => item.price))];

    // Filter products based on selected brand
    const filteredProduct = product.filter((product) => {
        if (selectedBrand === 'all') {
            return true;
        } else {
            return product.brand === selectedBrand;
        }
    });

    // Sort products based on price
    const filteredProductPrice = filteredProduct.sort((a, b) => {
        if (sort === 'asc') {
            return a.price - b.price;
        } else if (sort === 'desc') {
            return b.price - a.price;
        }
        return 0; // Default case if no sorting is selected
    });

    return { selectedBrand, sort, handleBrandChange, handleSort, filteredProduct: filteredProductPrice, availableBrands, availablePrice };
};

export default useFilteredProduct;
