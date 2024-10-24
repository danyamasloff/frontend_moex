/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PredictForm.css';

const PredictForm = () => {
    const [secids, setSecids] = useState([]);
    const [selectedSecid, setSelectedSecid] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const fetchSecids = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/secids', {
                    auth: {
                        username: 'maslov',
                        password: '1234'
                    }
                });
                setSecids(response.data.sort());
            } catch (error) {
                console.error('Ошибка при загрузке SECID:', error);
            }
        };
        fetchSecids();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:8081/api/predict-price', {  // Измени predict на predict-price
                params: {
                    secid: selectedSecid,
                    startDate: startDate,
                    endDate: endDate
                },
                auth: {
                    username: 'maslov',
                    password: '1234'
                }
            });
            setPrediction(`Прогнозируемая цена: ${response.data}`);
        } catch (error) {
            console.error('Произошла ошибка при прогнозировании цены!', error);
            setPrediction('Ошибка при прогнозировании цены');
        }
    };

    return (
        <div className="predict-form">
            <h1>Прогнозирование цены</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Выберите SECID:
                    <select value={selectedSecid} onChange={(e) => setSelectedSecid(e.target.value)}>
                        <option value="">Выберите SECID</option>
                        {secids.map(secid => (
                            <option key={secid} value={secid}>{secid}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Дата начала:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Дата окончания:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button type="submit">Прогнозировать</button>
            </form>
            {prediction && <div className="prediction-result">{prediction}</div>}
        </div>
    );
};

export default PredictForm;
*/