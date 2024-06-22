import { useState } from 'react';
import './ui.css';

const MainSelect = ({ options, activeOption, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="select-container">
            <div className="select-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{activeOption || placeholder}</span>
                {options.length > 1 && (
                    <img src="/icons/arrow.svg" alt="Arrow" className={`arrow-icon ${isOpen ? 'open' : ''}`} />
                )}
            </div>
            {isOpen && options.length > 1 && (
                <ul className="select-options">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`select-option ${option === activeOption ? 'active' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MainSelect;
