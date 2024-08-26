import { convertDate } from "./convertDate"

export const setChartData = (setCoinChart: any, prices: any) => {

    setCoinChart({
        labels: prices.map((price: Array<number>) => convertDate(price[0])),
        datasets: [
        {
          data: prices.map((price: Array<number>) => (price[1])),
          fill: true,
          borderColor: 'gold',
          backgroundColor: 'gold',
          tension: 0.25,
          borderWidth: 2,
          pointRadius: 0,
        },
        ]
    })

}