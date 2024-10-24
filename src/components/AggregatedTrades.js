import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AggregatedTrades.css';

const AggregatedTrades = () => {
    const [aggregatedTrades, setAggregatedTrades] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'secid', direction: 'ascending' });

    useEffect(() => {
        axios.get('http://localhost:8081/api/aggregated-trades', {
            auth: {
                username: 'maslov',
                password: '1234'
            }
        })
            .then(response => {
                setAggregatedTrades(response.data);
                setLoaded(true);
            })
            .catch(error => {
                console.error('Ошибка при получении агрегированных сделок:', error);
            });
    }, []);

    const sortTrades = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedTrades = [...aggregatedTrades].sort((a, b) => {
        if (sortConfig.key === 'secid') {
            const secidA = a[0].toUpperCase();
            const secidB = b[0].toUpperCase();
            if (secidA < secidB) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (secidA > secidB) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        }
        if (sortConfig.key === 'totalValue') {
            return sortConfig.direction === 'ascending' ? a[2] - b[2] : b[2] - a[2];
        }
        return 0;
    });

    return (
        <div className={`aggregated-trades ${loaded ? 'fade-in' : ''}`}>
            <h1>Агрегированные сделки</h1>
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th onClick={() => sortTrades('secid')}
                        className={sortConfig.key === 'secid' ? `sort-${sortConfig.direction}` : ''}>
                        SECID
                        <span className="sort-icon">▲</span> {/* Иконка для сортировки */}
                    </th>
                    <th onClick={() => sortTrades('totalValue')}
                        className={sortConfig.key === 'totalValue' ? `sort-${sortConfig.direction}` : ''}>
                        Общая стоимость
                        <span className="sort-icon">▲</span> {/* Иконка для сортировки */}
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedTrades.length > 0 ? (
                    sortedTrades.map((trade, index) => (
                        <tr key={`${trade[0]}-${index}`}>
                            <td>{new Date(trade[1]).toLocaleDateString()}</td>
                            <td>{trade[0]}</td>
                            <td>{trade[2].toLocaleString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">Данные отсутствуют</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AggregatedTrades;
