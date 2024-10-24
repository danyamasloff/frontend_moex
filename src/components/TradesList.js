import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TradesList.css'; // Подключаем обновленный CSS

const TradesList = () => {
    const [trades, setTrades] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [filterDate, setFilterDate] = useState('');
    const [searchId, setSearchId] = useState('');
    const [searchSecid, setSearchSecid] = useState('');

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/trades', {
                    auth: {
                        username: 'maslov',
                        password: '1234'
                    }
                });
                console.log('Fetched trades data:', response.data);
                setTrades(response.data);
            } catch (error) {
                console.error('There was an error fetching the trades!', error);
            }
        };

        fetchTrades();
    }, []);

    const sortedTrades = [...trades].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredTrades = sortedTrades.filter(trade => {
        const matchesDate = filterDate ? trade.systime.startsWith(filterDate) : true;
        const matchesId = searchId ? trade.id === Number(searchId) : true; // Сравниваем ID как число
        const matchesSecid = searchSecid ? trade.secid.includes(searchSecid.toUpperCase()) : true;
        return matchesDate && matchesId && matchesSecid;
    });

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="trades-list fade-in-hacker">
            <h1 className="hacker-title">Список сделок</h1>
            <div className="filters">
                <label>
                    Поиск по ID:
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </label>
                <label>
                    Поиск по SECID:
                    <input
                        type="text"
                        value={searchSecid}
                        onChange={(e) => setSearchSecid(e.target.value)}
                    />
                </label>
                <label>
                    Дата сделки:
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </label>
            </div>
            <table className="hacker-table">
                <thead>
                <tr>
                    <th onClick={() => requestSort('id')}>ID</th>
                    <th onClick={() => requestSort('secid')}>SECID</th>
                    <th onClick={() => requestSort('price')}>Цена</th>
                    <th onClick={() => requestSort('quantity')}>Количество</th>
                    <th onClick={() => requestSort('systime')}>Дата сделки</th>
                </tr>
                </thead>
                <tbody>
                {filteredTrades.map(trade => (
                    <tr key={trade.id}>
                        <td>{trade.id}</td>
                        <td>{trade.secid}</td>
                        <td>{trade.price}</td>
                        <td>{trade.quantity}</td>
                        <td>{new Date(trade.systime).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {filteredTrades.length === 0 && (
                <div className="no-trades">Сделки на выбранную дату не найдены.</div>
            )}
        </div>
    );
};

export default TradesList;
