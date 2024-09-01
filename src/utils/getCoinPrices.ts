import axios from "axios";
import toast from "react-hot-toast";

// export const getCoinPrices = async (id: string | undefined, days: number, type: string) => {

//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
//         },
//     };

//     try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`, options);
        
//         if (!response.ok) {
//             // If response is not ok, trigger the toast notification with an error message
//             toast.error('Cannot Fetch Coins Data');
//             return null; // Or handle the error case accordingly
//         }
        
//         const data = await response.json();
//         return data[type];
        
//     } catch (err) {
//         // This will catch any network errors
//         toast.error('Cannot Fetch Coins Data'); 
//         return null;
//     }
// }


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