import './ui.css';

const MainIconButton = ({ className, callback, iconSrc, iconAlt }) => {
    return (
        <button className={`icon-button ${className}`} onClick={callback}>
            {iconSrc && <img className='icon' src={iconSrc} alt={iconAlt} />}
        </button>
    )
};

export default MainIconButton;