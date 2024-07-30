import React, { useState } from 'react';
import axios from 'axios';

const PredictForm = () => {
    const [prices, setPrices] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const priceArray = prices.split(',').map(price => parseFloat(price.trim()));
        try {
            const response = await axios.post('http://localhost:8081/api/predict', priceArray, {
                headers: {
                    'Content-Type': 'application/json'
                },
                auth: {
                    username: 'maslov',
                    password: '1234'
                }
            });
            setPrediction(response.data);
        } catch (error) {
            console.error('There was an error predicting the price!', error);
        }
    };

    return (
        <div>
            <h1>Predict Future Price</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter prices (comma separated):
                    <input
                        type="text"
                        value={prices}
                        onChange={(e) => setPrices(e.target.value)}
                    />
                </label>
                <button type="submit">Predict</button>
            </form>
            {prediction !== null && <div>Predicted Price: {prediction}</div>}
        </div>
    );
};

export default PredictForm;
