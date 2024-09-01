import toast from "react-hot-toast";
import axios from 'axios'


export const getNews = async () => {
    const NEWS_kEY = import.meta.env.VITE_NEWS_KEY;
    const response = axios.get(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN`).then((response) => {
        if (response){
            // console.log(response.data.Data)
            return response.data.Data;
        }
    })
    .catch((e) => {
        console.log('errrror>>>>>>: ' + e.message);
        toast.error(e.message + ', Try again Later!')
    })
    return response;
}
