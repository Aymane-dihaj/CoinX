import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/ui/Loader";
import { CoinDataSetter } from "../../utils/CoinDataSetter";
import List from "../../components/List";
import CoinInfo from "./CoinInfo";
import { getCoinData } from "../../utils/getCoinData";
import { getCoinPrices } from "../../utils/getCoinPrices";
import CoinChart from "./CoinChart";
import SelectDays from "../../components/ui/SelectButton";
import { setChartData } from "../../utils/setChartData";
import toast from "react-hot-toast";
import { SelectType } from "../../components/ui/SelectType";
import Footer from "../../components/Footer";

interface coindata{
    id: number,
    name: string,
    symbol: string,
    image: {
        large: string,
    },
    desc: string,
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
    },
    price_change_percentage_24h: string; // Add the missing property
}

export const filterUniqueDates = (prices: Array<[number, number]>) => {
    const seenDates = new Set();
    
    return prices.filter(([timestamp]) => {
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
        desc: '',
        price_change_percentage_24h: '',
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
            toast.error("Failed to fetch coin data. Please try again later.");
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
            toast.error("Failed to fetch coin Data. Please try again later.");
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
            toast.error("Failed to change price type. Please try again later.");
            setLoading(false);
        }
    };
    

    return (
        <>
            <Navbar/>
            {
                loading ? <Loader/> :
                <div className="flex flex-col  gap-4  pt-16 mt-28">
                    <h1 className="w-[80%] ml-auto mr-auto flex gap-1 text-xl md:text-3xl mb-4 font-medium">&#x2022;<span className="text-orange-500 mx-1">{coinData.name}</span> Details and Price Analysis</h1>
                    <table className="w-full flex items-center justify-center  ">
                        <tbody className="rounded-lg w-[80%] flex items-center justify-center  bg-softDark">
                            <List coin={coinData}/>
                        </tbody>
                    </table>
                    <div className="space-y-3 mt-6 lg:mt-10 w-[80%] ml-auto mr-auto">
                        <div className="bg-softDark rounded-lg p-5 items-start justify-center flex flex-col gap-10 w-full">
                            <div className="flex items-center gap-5">
                                <SelectDays handleChange={handleDaysChange}/>
                                <SelectType handleChange={handleTypeChange}/>
                                {/* <ToggleComponents/> */}
                            </div>
                            <div className="w-full flex flex-col lg:h-[600px]">
                                <CoinChart chartData={coinChart} multiAxis={false} priceType={type}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-[80%] ml-auto mr-auto">
                        {coinData && <CoinInfo title={coinData.name} description={coinData.desc || 'There\'s No Description'}/>}
                    </div>
                    <Footer/>
                </div>
            }
        </>
    )

}

export default CoinPage;