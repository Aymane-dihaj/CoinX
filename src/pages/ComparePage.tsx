import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SelectCoins from '../components/ui/SelectCoins'
import { notify } from '../components/ui/toast';
import SelectDays from '../components/ui/SelectButton';
import { getAllCoins } from '../utils/getAllCoins';
import { getCoinData } from '../utils/getCoinData';
import { CoinDataSetter } from '../utils/CoinDataSetter';
import { getCoinPrices } from '../utils/getCoinPrices';
import Loader from '../components/ui/Loader';
import { Toaster } from 'react-hot-toast';
import List from '../components/List';
import { setChartData } from '../utils/setChartData';
import { filterUniqueDates } from './CoinPage/CoinPage';
import CoinChart from './CoinPage/CoinChart';

const ComparePage = () => {

  const [coin1, setCoin1] = useState('bitcoin');
  const [coin2, setCoin2] = useState('ethereum');
  const [coin1Data, setCoin1Data] = useState();
  const [coin2Data, setCoin2Data] = useState();
  const [days, setDays] = useState<number>(7);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState('prices')
  const [chartPriceData, setChartPriceData] = useState();
  const [allCoins, setAllCoins] = useState([]);


  const handleDaysChange = async (e: number) => {
    const newDays = e;
    setLoading(true);
    setDays(newDays);
    let prices1 = await getCoinPrices(coin1, newDays, priceType);
    let prices2 = await getCoinPrices(coin2, newDays, priceType);
    prices1 = filterUniqueDates(prices1);
    prices2 = filterUniqueDates(prices2);
    setChartData(setChartPriceData, prices1, coin1Data.name, 'green', prices2, coin2Data.name);
    setLoading(false);
  };
  
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    setLoading(true);
    const coins = await getAllCoins();
    if (coins){
      setAllCoins(coins);
      const data1 = await getCoinData(coin1);
      const data2 = await getCoinData(coin2);
      CoinDataSetter(setCoin1Data, data1);
      CoinDataSetter(setCoin2Data, data2);
      if (data1 && data2){
        //Getting prices
        let prices1 = await getCoinPrices(coin1, days, priceType)
        let prices2 = await getCoinPrices(coin2, days, priceType);
        prices1 = filterUniqueDates(prices1);
        prices2 = filterUniqueDates(prices2);
        setChartData(setChartPriceData, prices1, data1.name, 'green', prices2, data2.name);
        setLoading(false); 
      }
    }
  }
  
  const handleCoinChange = async (e: any, whichCoin: boolean) => {
    setLoading(true);
    if (whichCoin){
      const newCoin2 = e.target.value;
      setCoin2(newCoin2);
      const data2 = await getCoinData(newCoin2);
      CoinDataSetter(setCoin2Data, data2);
      //Fetching prices again
      let coin1Prices = await getCoinPrices(coin1, days, priceType);
      let coin2Prices = await getCoinPrices(newCoin2, days, priceType);
      if (coin1Prices.length > 0 && coin2Prices.length > 0)
      {
        coin1Prices = filterUniqueDates(coin1Prices);
        coin2Prices = filterUniqueDates(coin2Prices);
        setChartData(setChartPriceData, coin1Prices, coin1Data.name, 'green', coin2Prices, data2.name);
      }
    }else {
      const newCoin1 = e.target.value;
      setCoin1(newCoin1);
      // crypto1 is being changed
      setCoin1Data(newCoin1);
      // fetch coin1 data
      const data1 = await getCoinData(newCoin1);
      CoinDataSetter(setCoin1Data, data1);
      // fetch coin prices
      let coin1Prices = await getCoinPrices(newCoin1, days, priceType);
      let coin2Prices = await getCoinPrices(coin2, days, priceType);
      if (coin1Prices.length > 0 && coin2Prices.length > 0)
      {
        coin1Prices = filterUniqueDates(coin1Prices);
        coin2Prices = filterUniqueDates(coin2Prices);
        setChartData(setChartPriceData, coin1Prices, coin1Data.name, 'green', coin2Prices, data1.name);
      }
    }
    setLoading(false)
  }


  return (
    <div className='pt-32'>
        <Navbar/>
        {loading ? <Loader/>
         : <>
            <div className='block md:flex w-[80%] mt-10 mr-auto ml-auto justify-between items-center'>
              <div>
                <SelectDays handleChange={handleDaysChange}/>
                {/* <SelectType handleChange={handleTypeChange}/> */}
              </div>
              <SelectCoins coin1={coin1} coin2={coin2} handleCoinChange={handleCoinChange}/>
            </div>
            <div className='flex flex-col mt-8 gap-4'>
              <table className="w-full flex items-center justify-center  ">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                    <List coin={coin1Data}/>
                </tbody>
              </table>
              <table className="w-full flex items-center justify-center  ">
                <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                    <List coin={coin2Data}/>
                </tbody>
              </table>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-[80%] ml-auto mr-auto mt-8">
              <div className="w-full flex flex-col lg:h-[600px]">
                  <CoinChart chartData={chartPriceData} multiAxis={true} name={coin1Data.name} name1={coin2Data.name}/>
              </div>
            </div>
            <Toaster/>
          </>
        }
    </div>
  )
}

export default ComparePage;
