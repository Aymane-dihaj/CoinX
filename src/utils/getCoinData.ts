import toast from "react-hot-toast";
import axios from 'axios'

// export const getCoinData = async (id: string | undefined) => {

//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             'x-cg-demo-api-key': ' CG-8ztwbCfJuNWJzMUDSQA8FJC9 ',
//         },
//     };

//     try {
//         const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);

//         if (!response.ok) {
//             // Trigger the toast notification if the response is not successful
//             toast.error('Cannot Fetch Coin Data');
//             return null; // Handle the error case accordingly
//         }

//         const data = await response.json();
//         return data;
        
//     } catch (err) {
//         // Handle network errors
//         toast.error('Cannot Fetch Coin Data');
//         return null;
//     }
// }

export const getCoinData = async (id: string | undefined) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const response = axios.get(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${API_KEY}`).then((response) => {
        if (response)
            return response.data;
    })
    .catch((e) => {
        console.log('errrror>>>>>>: ' + e.message);
        toast.error(e.message + ', Try again Later!')
    })
    return response;
}
