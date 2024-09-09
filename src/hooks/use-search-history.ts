import { useEffect, useState } from "react";

type SearchInput = {
    value: string;
    type: string;
}

type UseSearchHistory = {
    searchHistory: SearchInput[];
    addSearchHistory: (newTerm: string, type: string) => void;
    clearSearchHistory: () => void;
}

const useSearchHistory = (maxItems: number = 5): UseSearchHistory => {
    const [ searchHistory, setSearchHistory ] = useState<SearchInput[]>([]);

    useEffect(() => {
        const history = localStorage.getItem('searchHistory');
        if ( history ) setSearchHistory(JSON.parse(history));
    }, []);

    const addSearchHistory = (newTerm: string, newType: string) => {
        if ( !newTerm && !newType ) return;

        let updatdeSearchHistory = [...searchHistory];
        updatdeSearchHistory = updatdeSearchHistory.filter(search => search.value !== newTerm);

        updatdeSearchHistory.unshift({ value: newTerm, type: newType });

        if ( updatdeSearchHistory.length > maxItems ) updatdeSearchHistory.pop();

        setSearchHistory(updatdeSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatdeSearchHistory));
    }

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    }

    return { searchHistory, addSearchHistory, clearSearchHistory }
}

export default useSearchHistory;