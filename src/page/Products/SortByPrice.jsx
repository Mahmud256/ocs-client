import React from 'react';

const SortByPrice = ({ handleSortChange }) => {
    return (
        <div>
            <select onChange={handleSortChange} className="p-2 border-2 rounded-md">
                <option value="none">Sort by Price</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>
        </div>
    );
};

export default SortByPrice;
