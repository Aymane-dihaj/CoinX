import axios from "axios";
import toast from "react-hot-toast";


export const getCoinPrices = async (id: string | undefined, days: number, type: string) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const prices = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}?x_cg_demo_api_key=${API_KEY}`)
    .then((response) => {
        if (response.data){
            if (type === "market_caps")
                return response.data.market_caps;
            else if (type === "total_volumes")
                return response.data.total_volumes;
            else
                return response.data.prices;
        }
    }).catch((e) => {
        console.log('prices error: ' + e.message);
        toast.error(e.message);
    })
    return prices;
}