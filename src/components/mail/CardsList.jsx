import CardMail from "../ui/CardMail";

import "./mail.css";

const CardsList = () => {
  return (
    <div className="cards-list">
      <p className="cards-list-title">
        Доступны:
      </p>
      <CardMail text="Gmail" iconSrc="/icons/gmail.svg" iconAlt="Gmail" />
      <CardMail text="Yandex" iconSrc="/icons/yandex.svg" iconAlt="Yandex" />
    </div>
  )
}

export default CardsList