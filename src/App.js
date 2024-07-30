import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TradesList from './components/TradesList';
import PredictForm from './components/PredictForm';
import AggregatedTrades from './components/AggregatedTrades';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <header className="app-header">
                    <h1>Информационно-аналитический сервис биржевых торгов</h1>
                    <nav>
                        <Link to="/">Главная</Link>
                        <Link to="/predict">Прогнозирование цены</Link>
                        <Link to="/aggregated-trades">Агрегированные сделки</Link>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<TradesList />} />
                        <Route path="/predict" element={<PredictForm />} />
                        <Route path="/aggregated-trades" element={<AggregatedTrades />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
