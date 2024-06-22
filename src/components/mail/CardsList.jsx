import CardMail from "../ui/CardMail";

import "./mail.css";

const CardsList = () => {
  return (
    <div className="cards-list">
      <p className="cards-list-title">
        Доступны:
      </p>
      <CardMail text="Mail.ru" iconSrc="/icons/mail.svg" iconAlt="Mail.ru" />
      <CardMail text="Yandex" iconSrc="/icons/yandex.svg" iconAlt="Yandex" />
    </div>
  )
}

export default CardsList