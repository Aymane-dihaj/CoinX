import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LabTabs from '../components/ui/tabs'
import SearchBar from '../components/SearchBar'

const Dashboard = () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value);
  }

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 '
      }
    };
    
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc', options)
      .then(response => response.json())
      .then(response => setCoins(response))
      .catch(err => console.error(err));
  }, [])

  let Filtredcoins = coins.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Navbar/>
      <SearchBar search={search} onSearchChange={onSearchChange}/>
      <LabTabs coins={Filtredcoins} />
    </>
  )
}

export default Dashboard
