import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/ui/Loader";
import { CoinDataSetter } from "../../utils/CoinDataSetter";
import List from "../../components/List";
import CoinInfo from "./CoinInfo";
import { getCoinData } from "../../utils/getCoinData";
import { getCoinPrices } from "../../utils/getCoinPrices";
import CoinChart from "./CoinChart";
import { convertDate } from "../../utils/convertDate";
import SelectDays from "../../components/ui/SelectButton";
import { setChartData } from "../../utils/setChartData";
import { Toaster } from "react-hot-toast";
import { notify } from "../../components/ui/toast";
import ToggleButtons from "../../components/ui/toggleBar";
import ToggleComponents from "../../components/ui/toggleBar";
import { SelectType } from "../../components/ui/SelectType";

interface coindata{
    id: number,
    name: string,
    symbol: string,
    image: {
        large: string,
    },
    desc: {
        en: string,
    },
    market_data: {
        price_change_percentage_24h: string;
        total_volume: {
            usd: string;
        }
        current_price: {
            usd: string,
        }
        market_cap: {
            usd: string,
        }
    }
}

const filterUniqueDates = (prices: Array<[number, number]>) => {
    const seenDates = new Set();
    
    return prices.filter(([timestamp, price]) => {
      const date = new Date(timestamp).toLocaleDateString(); // Convert to date string
      
      if (seenDates.has(date)) {
        return false; // Skip this entry if the date is already in the set
      } else {
        seenDates.add(date); // Add the date to the set and keep the entry
        return true;
      }
    });
  };

const CoinPage = () => {

    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [coinChart, setCoinChart] = useState({})
    const [days, setDays] = useState<number>(7);
    const [type, setType] = useState<string>('prices')
    const [coinData, setCoinData] = useState<coindata>({
        id: 0,
        name: '',
        symbol: '',
        image: {
            large: '',
        },
        desc: {
            en: '',
        },
        market_data: {
            price_change_percentage_24h: '',
            total_volume: {
                usd: '',
            },
            current_price: {
                usd: '',
            },
            market_cap: {
                usd: '',
            }
        }
    });
    

    useEffect(() => {
        if (id){
            getData();
        }
    }, [id])
    
    const getData = async () => {
        try {
            const data = await getCoinData(id);
            if (data) {
                console.log(data);
                const priceChange24h = parseFloat(data.market_data.price_change_percentage_24h);
                CoinDataSetter(setCoinData, data);
                let coinPrices = await getCoinPrices(id, days, type);
                if (coinPrices && coinPrices.length > 0) {
                    coinPrices = filterUniqueDates(coinPrices);
                    setChartData(setCoinChart, coinPrices, data.name, priceChange24h > 0 ? 'green' : 'red');
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error("Failed to fetch coin data:", error);
            notify("Failed to fetch coin data. Please try again later.");
        }
    };
    
    const handleDaysChange = async (n: number) => {
        try {
            setDays(n);
            let prices = await getCoinPrices(id, n, type);
            if (prices && prices.length > 0) {
                prices = filterUniqueDates(prices);
                const priceChange24h = parseFloat(coinData.price_change_percentage_24h);
                setChartData(setCoinChart, prices, coinData.name, priceChange24h < 0 ? 'red' : 'green');
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to fetch coin prices:", error);
            notify("Failed to fetch coin Data. Please try again later.");
            setLoading(false);
        }
    };
    
    const handleTypeChange = async (priceType: string) => {
        try {
            setType(priceType);
            let newData = await getCoinPrices(id, days, priceType);
            if (newData && newData.length > 0) {
                newData = filterUniqueDates(newData);
                const priceChange24h = parseFloat(coinData.price_change_percentage_24h);
                setChartData(setCoinChart, newData, coinData.name, priceChange24h < 0 ? 'red' : 'green');
                setLoading(false);
            }
        } catch (error) {
            console.error("Failed to change price type:", error);
            notify("Failed to change price type. Please try again later.");
            setLoading(false);
        }
    };
    

    return (
        <>
            <Navbar/>
            {
                loading ? <Loader/> :
                <div className="flex flex-col  gap-4 mb-10 pt-16">
                    <table className="w-full flex items-center mt-16 md:mt-28 justify-center  ">
                        <tbody className=" rounded-lg w-[80%] flex items-center justify-center  bg-[#1a1a1a]">
                            <List coin={coinData}/>
                        </tbody>
                    </table>
                    <div className="space-y-3 mt-6 lg:mt-10 w-[80%] ml-auto mr-auto">
                        {/* <div className=" px-10 flex p-8 gap-8 justify-center ml-auto mr-auto w-[80%]   rounded-lg">
                            <BasicSelect/>
                        </div> */}
                        <div className="bg-[#1a1a1a] rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-full">
                            <div className="flex items-center gap-5">
                                <SelectDays handleChange={handleDaysChange}/>
                                <SelectType handleChange={handleTypeChange}/>
                                {/* <ToggleComponents/> */}
                            </div>
                            <div className="w-full flex flex-col lg:h-[600px]">
                                <CoinChart chartData={coinChart} priceType={type} multiAxis={false}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        {coinData && <CoinInfo title={coinData.name} description={coinData.desc || 'There\'s No Description'}/>}
                    </div>
                    <Toaster/>
                </div>
            }
        </>
    )

}

export default CoinPage;