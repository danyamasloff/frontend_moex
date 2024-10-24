import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AggregatedTrades.css';

const AggregatedTrades = () => {
    const [aggregatedTrades, setAggregatedTrades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/aggregated-trades', {
            params: {
                startDate: '2023-07-01',  // Пример начальной даты
                endDate: '2023-08-01'     // Пример конечной даты
            },
            auth: {
                username: 'maslov',
                password: '1234'
            }
        })
            .then(response => {
                console.log('Response data:', response.data);  // Логируем данные для проверки
                setAggregatedTrades(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the aggregated trades!', error);
            });
    }, []);

    return (
        <div className="aggregated-trades">
            <h1>Aggregated Trades</h1>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>SECID</th>
                    <th>Total Value</th>
                </tr>
                </thead>
                <tbody>
                {aggregatedTrades.map((trade, index) => (
                    <tr key={`${trade[0]}-${index}`}>
                        <td>{new Date(trade[1]).toLocaleDateString()}</td>
                        <td>{trade[0]}</td>
                        <td>{trade[2].toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AggregatedTrades;
