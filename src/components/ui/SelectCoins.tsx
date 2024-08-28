import React, { useEffect, useState } from 'react'
import { getAllCoins } from '../../utils/getAllCoins';

// interface coindata{
//     id: number,
//     name: string,
//     symbol: string,
//     image: {
//         large: string,
//     },
//     desc: {
//         en: string,
//     },
//     market_data: {
//         price_change_percentage_24h: string;
//         total_volume: {
//             usd: string;
//         }
//         current_price: {
//             usd: string,
//         }
//         market_cap: {
//             usd: string,
//         }
//     }
// }


const SelectCoins = ({coin1, coin2, setCoin1, setCoin2} : {coin1: string, coin2: string, setCoin1: React.SetStateAction<any>, setCoin2: React.SetStateAction<any>}) => {

 
    const [allCoins, setAllCoins] = useState([]);

    const handleCoinChange = (e: any, whichCoin: boolean) => {
        if (whichCoin)
            setCoin2(e.target.value);
        else{
            setCoin1(e.target.value);
        }
        // console.log(e.target.value)
    }
    
    useEffect(() => {
        getCoinsData();
    }, [])
    
    const getCoinsData = async () => {
        const response = await getAllCoins();
        if (response){
            setAllCoins(response);
        }
    }
    
    // console.log(coin1)
  return (
    <div>
        <div>
            <form className="max-w-sm mx-auto">
                <label htmlFor="coin1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">coin 1</label>
                <select
                id={coin1}
                value={coin1}
                className="drop-menu bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-white/[0.2] dark:border-white/[0.1] dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => handleCoinChange(e, false)}
                >
                    {allCoins.map((coin ) => (
                        <option key={coin.id} style={{ backgroundColor: '#1a1a1a' }} value={coin.id}>{coin.name}</option>
                    ))}
                </select>
            </form>
        </div>
        <div>
            <form className="max-w-sm mx-auto">
                <label htmlFor="coin2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">coin 2</label>
                <select
                id={coin2}
                value={coin2}
                className="drop-menu bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-white/[0.2] dark:border-white/[0.1] dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => handleCoinChange(e, true)}
                >
                      {allCoins.map((coin) => (
                        <option key={coin.id} style={{ backgroundColor: '#1a1a1a' }} value={coin.id}>{coin.name}</option>
                    ))}
                </select>
            </form>
        </div>
    </div>
  )
}

export default SelectCoins
