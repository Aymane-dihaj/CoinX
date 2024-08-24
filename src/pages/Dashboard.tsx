import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LabTabs from '../components/ui/tabs'
import SearchBar from '../components/SearchBar'
import PaginationControlled from '../components/ui/pagination'
import Loader from '../components/ui/Loader'


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
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-8ztwbCfJuNWJzMUDSQA8FJC9',
      },
    };

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', options)
      .then(response => response.json())
      .then((response) => {
          setCoins(response);
          setPaginationCoins(response.slice(0, 10));
          setLoading(false);
        })
      .catch(err => console.error(err));
  }, []);

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
        <div className='mt-16'>
          <SearchBar search={search} onSearchChange={onSearchChange} />
          {noResults && search ? (
            <NoResult searchValue={search} setSearchValue={setSearch}/>
          ) : (
            <>
              <LabTabs coins={search ? Filtredcoins : PaginationCoins} />
              {!search && <PaginationControlled page={page} handlePageChange={handlePageChange} />}
            </>
          )}
        </div>
      }
    </>
  );
};

export default Dashboard;
