import { useState, useEffect, useRef } from 'react';
import './ui.css';

const MainSelect = ({ options, activeOption, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="select-container" ref={selectRef}>
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
