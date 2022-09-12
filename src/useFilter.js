import { useState } from 'react';

export const useFilter = (items) => {

    const [filterValue, setFilterValue] = useState('')
    const filteredItems = items?.filter((item) => item.name?.toLowerCase().includes(filterValue.toLowerCase()))

    return {
        filteredItems,
        filterValue,
        setFilterValue
    };
};
