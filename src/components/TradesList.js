import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TradesList.css';

const TradesList = () => {
    const [trades, setTrades] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [filterDate, setFilterDate] = useState('');
    const [filterId, setFilterId] = useState('');
    const [filterSecid, setFilterSecid] = useState('');
    const [noTradesFound, setNoTradesFound] = useState(false);

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
        const matchesId = filterId ? trade.id.toString().includes(filterId) : true;
        const matchesSecid = filterSecid ? trade.secid.toLowerCase().includes(filterSecid.toLowerCase()) : true;
        return matchesDate && matchesId && matchesSecid;
    });

    useEffect(() => {
        setNoTradesFound(filteredTrades.length === 0);
    }, [filteredTrades]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <h1>Список сделок</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Поиск по ID"
                    value={filterId}
                    onChange={(e) => setFilterId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Поиск по SECID"
                    value={filterSecid}
                    onChange={(e) => setFilterSecid(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="Фильтр по дате (гггг-мм-дд)"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>
            {noTradesFound ? (
                <div className="no-trades-message">Сделки на выбранную дату не найдены.</div>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('id')}>
                            ID
                            <button className="sort-button">↕</button>
                        </th>
                        <th onClick={() => requestSort('secid')}>
                            SECID
                            <button className="sort-button">↕</button>
                        </th>
                        <th onClick={() => requestSort('price')}>
                            Цена
                            <button className="sort-button">↕</button>
                        </th>
                        <th onClick={() => requestSort('quantity')}>
                            Количество
                            <button className="sort-button">↕</button>
                        </th>
                        <th onClick={() => requestSort('systime')}>
                            Дата сделки
                            <button className="sort-button">↕</button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredTrades.map(trade => (
                        <tr key={trade.id}>
                            <td>{trade.id}</td>
                            <td>{trade.secid}</td>
                            <td>{trade.price}</td>
                            <td>{trade.quantity}</td>
                            <td>{new Date(trade.systime).toLocaleString()}</td> {/* Assuming tradeDate corresponds to systime */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TradesList;
