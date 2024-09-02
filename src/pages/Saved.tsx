import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import LabTabs from '../components/ui/tabs';
import { getAllCoins } from '../utils/getAllCoins';
import toast from 'react-hot-toast';
import Loader from '../components/ui/Loader';

export const addItemToSaveList = (e: React.MouseEvent, coinID: string) => {
    e.preventDefault();
    let savedList = JSON.parse(localStorage.getItem('savedList') ?? '') || [];

    if (!savedList.includes(coinID)) {
        savedList.push(coinID);
        toast.success(`${coinID} - SUCCESSFULLY SAVED`);
    } else {
        toast.error(`${coinID} - ALREADY SAVED`);
    }
    
    localStorage.setItem('savedList', JSON.stringify(savedList));
};

export const removeItemFromSaveList = (
    e: React.MouseEvent, 
    coinID: string, 
    setAdd: React.Dispatch<React.SetStateAction<boolean>>
) => {
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to remove this coin?")) {
        let savedList = JSON.parse(localStorage.getItem("savedList") ?? "") || [];
        const newList = savedList.filter((coin: any) => coin !== coinID);
        setAdd(false);
        localStorage.setItem("savedList", JSON.stringify(newList));
        toast.success(`${coinID} - has been removed!`);
        window.location.reload();
    } else {
        toast.error(`${coinID} - could not be removed!`);
        setAdd(true);
    }
};

const Saved = () => {
    const savedList = JSON.parse(localStorage.getItem("savedList") ?? '') || [];
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (savedList.length > 0) {
            getData();
        } else {
            setLoading(false);
        }
    }, []);

    const getData = async () => {
        const response = await getAllCoins();
        if (response) {
            setCoins(response.filter((coin: any) => savedList.includes(coin.id)));
            setLoading(false);
        }
    };

    return (
            <div className='flex flex-col gap-4 mb-10 pt-16 mt-28'>
                <Navbar />
                {loading ? <Loader /> : <LabTabs coins={coins} />}
            </div>
    );
};

export default Saved;
