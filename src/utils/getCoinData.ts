import toast from "react-hot-toast";
import axios from 'axios'


export const getCoinData = async (id: string | undefined) => {
    const API_KEY = 'CG-s11MMzhxkicsqsodRw1ZaHtZ';
    const response = axios.get(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${API_KEY}`).then((response) => {
        if (response)
            return response.data;
    })
    .catch((e) => {
        toast.error(e.message + ', Try again Later!')
    })
    return response;
}
