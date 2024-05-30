import './ui.css';

const CardMail = ({ className, text, iconSrc, iconAlt }) => {
    return (
        <div className={`card-mail ${className}`}>
            {iconSrc && <img className='icon' src={iconSrc} alt={iconAlt} />}
            {text}
        </div>
    )
};

export default CardMail;