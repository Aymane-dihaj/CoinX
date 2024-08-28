import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LabTabs from '../components/ui/tabs'
import SearchBar from '../components/SearchBar'
import PaginationControlled from '../components/ui/pagination'
import Loader from '../components/ui/Loader'
import { notify } from '../components/ui/toast'
import { Toaster } from 'react-hot-toast'
import { getAllCoins } from '../utils/getAllCoins'


const NoResult = ({searchValue, setSearchValue} : {searchValue: string, setSearchValue: any}) => {
  return (
    <div className='border  min-h-[300px] flex flex-col gap-4 items-center justify-center'>
      <h1 className='flex-wrap capitalize text-3xl font-medium'>cant't find &apos;{searchValue}&apos;</h1>
      <button className='bg-themeColor p-2 rounded-lg text-black px-3 text-sm font-medium' onClick={() => {setSearchValue('')}}>Clear Search</button>
    </div>
  )
}

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [PaginationCoins, setPaginationCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [noResults, setNoResults] = useState(false); // New state for no results message

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log(value);
    let previousIndex = (value - 1) * 10;
    setPaginationCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getCoinsFromApi();
  }, []);
  
  const getCoinsFromApi = async () => {
    const response = await getAllCoins();
    if (response)
    {
      setCoins(response);
      setPaginationCoins(response.slice(0, 10));
      setLoading(false);
    }
  };


  // Filter coins based on search input
  let Filtredcoins = coins.filter(
    (item: any) => item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Check if no results found
  useEffect(() => {
    if (search) {
      setNoResults(Filtredcoins.length === 0);
    } else {
      setNoResults(false);
    }
  }, [search, Filtredcoins]);

  return (
    <>
      <Navbar />
      {loading ? <Loader /> :
        <div className='mt-16 pt-16'>
          <div>
            <SearchBar search={search} onSearchChange={onSearchChange} />
          </div>
          {noResults && search ? (
            <NoResult searchValue={search} setSearchValue={setSearch}/>
          ) : (
            <div>
              <LabTabs coins={search ? Filtredcoins : PaginationCoins} />
              {!search && <PaginationControlled page={page} handlePageChange={handlePageChange} />}
            </div>
          )}
          <Toaster/>
        </div>
      }
    </>
  );
};

export default Dashboard;
