import { FC, useEffect, useState } from 'react';
import { fetchCdpData } from '../utils/functions/fetch-cdp-data';
import { useDebounce } from '../hooks/use-debounce';
import { DefaultLayout } from '../layout/default-layout';
import { useAppDispatch } from '../store';
import { slice } from "../slices/cdp-data";
import { serializeData } from '../utils/functions/serialize-data';
import VaultTable from '../components/table';
import SearchOptions from '../components/search/options';
import useSearchHistory from '../hooks/use-search-history';
import { useErrorFactory } from '../hooks/use-error-factory';
import { ERROR_MESSAGES } from '../constants/error-messages';

const SearchPage: FC = () => {
  const [ searchTermInput, setSearchTermInput ] = useState<number | null>(null);
  const [ collateralType, setCollateralType ] = useState<string | null>(null);
  const searchTerm = useDebounce<number | null>(searchTermInput);
  const dispatch = useAppDispatch();
  const [ loader, setLoader ] = useState<boolean>(false);
  const [ progress, setProgress ] = useState<number>(0);
  const { addSearchHistory } = useSearchHistory();
  const { createError } = useErrorFactory();

  const searchProgress = (progress: number): void => {
    setProgress(progress);
  }

  const handleSearchTermChange = (value: number | null): void => {
    if ( !value ) {
      setSearchTermInput(null);
      setLoader(false);
      setProgress(0); 
      dispatch(slice.actions.setCdpData({data: [], notFound: false}));
    }
    setSearchTermInput(value);
  }

  const handleCollateralTypeChange = (value: string | null): void => {
    setCollateralType(value);
  }

  useEffect(() => {
  
      if ( searchTerm && collateralType ) {
        setLoader(true);
        addSearchHistory(searchTerm.toString(), collateralType);
        
        fetchCdpData(Number(searchTerm), collateralType, searchProgress)
          .then(res => {
            dispatch(slice.actions.setCdpData(serializeData(res)));
            setLoader(false);
        }).catch((error) => {
            setSearchTermInput(null);
            setLoader(false);
            setProgress(0); 
            createError(error.message || ERROR_MESSAGES.CONTRACTS.FETCH_FAILED);
        });

      }

  }, [searchTerm, collateralType]);

  return (
    <DefaultLayout>
      <div className='container sm:my-32 my-12 mx-auto px-4'>
        <h1 className='font-bold sm:text-4xl text-3xl text-center mb-4 text-gray-200'>Explore CDPs and Discover Opportunities</h1>
        <p className='sm:text-xl text-lg text-center text-gray-600'>Enter a CDP ID to find the closest positions and explore potential opportunities.</p>
      </div>
      <div className='grid grid-cols-12 gap-4 px-4'>
        <SearchOptions
          searchTerm={searchTermInput}
          collateralType={collateralType}
          onTermSearchChange={handleSearchTermChange}
          onCollateralTypeChange={handleCollateralTypeChange}
        />
        <VaultTable loader={loader} progress={progress} />
      </div>
    </DefaultLayout>
  )
}

export default SearchPage;

