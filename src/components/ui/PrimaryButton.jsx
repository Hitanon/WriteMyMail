import './ui.css';

const PrimaryButton = ({ className, text, callback, iconSrc, iconAlt }) => {
  return (
    <button className={`primary-button ${className}`} onClick={callback}>
      {text}
      {iconSrc && <img className='icon' src={iconSrc} alt={iconAlt} />}
    </button>
  );
};

export default PrimaryButton;