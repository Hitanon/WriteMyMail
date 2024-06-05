import './ui.css';

const SecondaryButton = ({ className, text, callback, iconSrc, iconAlt }) => {
  return (
    <button className={`secondary-button ${className}`} onClick={callback}>
      {text}
      {iconSrc && <img className='icon' src={iconSrc} alt={iconAlt} />}
    </button>
  );
};

export default SecondaryButton;