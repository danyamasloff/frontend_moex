import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AggregatedTrades.css';

const AggregatedTrades = () => {
    const [aggregatedTrades, setAggregatedTrades] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/api/aggregated-trades', {
            auth: {
                username: 'maslov',
                password: '1234'
            }
        })
            .then(response => {
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
                    <th>Total Quantity</th>
                    <th>Total Value</th>
                </tr>
                </thead>
                <tbody>
                {aggregatedTrades.map(trade => (
                    <tr key={`${trade.date}-${trade.secid}`}>
                        <td>{trade.date}</td>
                        <td>{trade.secid}</td>
                        <td>{trade.totalQuantity}</td>
                        <td>{trade.totalValue}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AggregatedTrades;
