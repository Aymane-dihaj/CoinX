import React from 'react'

interface CoinData {
    name: string;
    image: {
        large: string;
    };
    id: string;
    symbol: string;
    description: {
        en: string;
    };
    market_data: {
        price_change_percentage_24h: number;
        total_volume: {
            usd: number;
        };
        current_price: {
            usd: number;
        };
        market_cap: {
            usd: number;
        };
    };
}


export const CoinDataSetter = (setState: any, data: CoinData) => {

    // console.log(data);

    setState({
        name: data.name,
        image: data.image.large,
        id: data.id,
        symbol: data.symbol,
        desc: data.description.en,
        price_change_percentage_24h: data.market_data.price_change_percentage_24h,
        total_volume: data.market_data.total_volume.usd,
        current_price: data.market_data.current_price.usd,
        market_cap: data.market_data.market_cap.usd,
    })
}
