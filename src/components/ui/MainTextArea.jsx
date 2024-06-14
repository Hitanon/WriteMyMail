import React, { useEffect, useState } from 'react';
import './ui.css';

const MainTextArea = ({ placeholder, value, onChange, isLoading }) => {
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
        <div className="textarea-container">
            <textarea
                className="custom-textarea"
                placeholder={isLoading ? loadingText : placeholder}
                value={isLoading ? '' : value}
                onChange={onChange}
                rows={14}
                disabled={isLoading}
            />
        </div>
    );
};

export default MainTextArea;
