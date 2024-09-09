import { FC } from "react";
import useSearchHistory from "../../hooks/use-search-history";
import { CryptoIcon } from "../crypto-icon/set-icon";

const SearchHistory: FC = () => {
    const { searchHistory } = useSearchHistory();
    return (
        <div className="md:mb-0 mb-40">
            <h6 className="mt-8 uppercase font-bold text-gray-600 mb-4 text-sm">Recent</h6>
            <ul>
                { searchHistory.length > 0 ?
                    searchHistory.map((searchItem, index) => (
                        <li key={index}>
                            <div className="flex justify-between text-sm px-6 bg-default-50 py-3 mb-2 rounded-md text-gray-400 hover:bg-default-100">
                                <span className="font-bold">#{searchItem.value}</span>
                                {CryptoIcon(searchItem.type)}
                            </div>

                        </li>
                    ))
                    :
                    <p className="text-gray-800 text-center font-bold">Search history is empty.</p>
                }
            </ul>
        </div>
    );
}

export default SearchHistory;

