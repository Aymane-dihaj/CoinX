import { convertDate } from "./convertDate"

export const setChartData = (setCoinChart: any, prices: any, name: string, color: string) => {

  const Red = 'rgba(255, 0, 0, 0.03)'
  const Green = 'rgba(0, 255, 0, 0.03)'

  console.log(name)
    setCoinChart({
        labels: prices.map((price: Array<number>) => convertDate(price[0])),
        datasets: [
        {
          label: name,
          data: prices.map((price: Array<number>) => (price[1])),
          fill: true,
          borderColor: color === 'green' ? 'green' : 'red',
          backgroundColor: color === 'green' ? Green : Red,
          tension: 0.25,
          borderWidth: 2,
          pointRadius: 0,
        },
        ]
    })

}