/*import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { CandlestickSeries, createChart } from 'lightweight-charts';
import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.REACT_APP_API_KEY

const ChartData = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: 800,
            height: 400,
            layout: {
                background: { color: '#1e1e1e' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#444' },
                horzLines: { color: '#444' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        const candleSeries = chart.addSeries(CandlestickSeries,{
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        const tokenAddress = 'hYhLZuJA23zz9yfTNiMJ1Ya2EG73XiUHdGiWGhK9oji';
        const interval = '1d';

        axios.get('https://public-api.birdeye.so/defi/token/ohlcv', {
            params: {
                address: tokenAddress,
                interval: '1d',
                chain: 'solana'
            },
            headers: {
                'X-API-KEY': API_KEY
            }
        })
            .then(res => {
                const rawData = res.data?.data || [];

                const formattedData = rawData.map(item => ({
                    time: Math.floor(item.timestamp / 1000), // da ms a s
                    open: item.open,
                    high: item.high,
                    low: item.low,
                    close: item.close,
                }));

                candleSeries.setData(formattedData);
            })
            .catch(err => {
                console.error('Errore fetch OHLC:', err);
            });


        // Cleanup al dismount
        return () => chart.remove();
    }, []);

    return (
        <div
            ref={chartContainerRef}
            style={{ margin: '0 auto', maxWidth: '100%' }}
        />
    );
};

export default ChartData;
*/