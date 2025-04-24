import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { STOCK_API_KEY } from "../../constant";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Stock = ({ id, widgetData, saveData }) => {
    const [stockData, setStockData] = useState(null);
    const [symbol, setSymbol] = useState(widgetData ?? 'IBM');

    const fetchStockData = async () => {
        // We can use websockets for realtime data
        const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${STOCK_API_KEY}`);
        const data = await response.json();
        const timeSeries = data['Time Series (Daily)'];

        if (timeSeries) {
            const dates = Object.keys(timeSeries).slice(0, 30).reverse(); // Get last 30 days and reverse for oldest to newest
            const prices = dates.map(date => ({
                date,
                close: parseFloat(timeSeries[date]['4. close']),
            }));
            setStockData(prices);
        } else {
            setStockData([]);
        }
    }

    useEffect(() => {
        fetchStockData();
        saveData(id, symbol);
    }, [symbol]);

    const chartData = {
        labels: stockData?.map(d => d.date),
        datasets: [
            {
                label: `Closing Price (${symbol})`,
                data: stockData?.map(d => d.close),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                tension: 0.3,
                fill: true,
            },
        ],
    };


    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: true },
        },
        scales: {
            x: { display: true },
            y: { display: true },
        },
    };

    const searchSymbol = () => {
        let searchSymbol = document.getElementById(`searchInput-${id}`)?.value;
        setSymbol(searchSymbol);
    }

    return (<div className="flex flex-col">
        <div className="flex flex-row">
            <input type="text" placeholder={symbol ?? ''} id={`searchInput-${id}`} />
            <button className="search-button" onClick={searchSymbol}>Search</button>
        </div>
        {stockData ? (<>
            <div className="flex flex-row justify-between">
                <p>Symbol: {symbol}</p>
                <p>Interval: 1D</p>
            </div>
            <div className="chart">
                {stockData.length ? (
                    <Line data={chartData} options={chartOptions} />
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        </>) : (<p>Loading...</p>)}
    </div>);
}

export default Stock;
