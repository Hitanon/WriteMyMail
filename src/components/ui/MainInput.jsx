import React, { useEffect, useState } from 'react';
import './ui.css';

const MainInput = ({ placeholder, value, onChange, isLoading }) => {
    const [loadingText, setLoadingText] = useState('Генерируем');

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingText((prev) => prev === 'Генерируем...' ? 'Генерируем' : prev + '.');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    return (
        <div className="input-container">
            <input
                className="custom-input"
                type="text"
                placeholder={isLoading ? loadingText : placeholder}
                value={isLoading ? '' : value}
                onChange={onChange}
                disabled={isLoading}
            />
        </div>
    );
};

export default MainInput;
