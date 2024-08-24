import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LabTabs from '../components/ui/tabs'
import SearchBar from '../components/SearchBar'
import PaginationControlled from '../components/ui/pagination'
import Loader from '../components/ui/Loader'

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [PaginationCoins, setPaginationCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
      },
    };

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', options)
      .then(response => response.json())
      .then((response) => {
          setCoins(response)
          setPaginationCoins(response.slice(0, 10));
          setLoading(false);
        })
      .catch(err => console.error(err));
  }, []);

  let Filtredcoins = coins.filter(
    (item: any) => item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      {loading ? <Loader/> :
        <div className='mt-16'>
        <SearchBar  search={search} onSearchChange={onSearchChange} />
        <LabTabs coins={search ? Filtredcoins : PaginationCoins} />
        {!search && <PaginationControlled page={page} handlePageChange={handlePageChange} />}
      </div>}
    </>
  );
};

export default Dashboard;
