import { useState } from 'react';
import useProduct from './useProduct';

const useFilteredProduct = () => {
    const [product] = useProduct();
    const [selectedBrand, setSelectedBrand] = useState('all');

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const availableBrands = [...new Set(product.map((item) => item.brand))];

    // Filter products based on selected brand
    const filteredProduct = product.filter((product) => {
        if (selectedBrand === 'all') {
            return true;
        } else {
            return product.brand === selectedBrand;
        }
    });

    return { selectedBrand, handleBrandChange, filteredProduct, availableBrands };
};

export default useFilteredProduct;
