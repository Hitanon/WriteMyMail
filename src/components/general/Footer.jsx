import { Link } from "react-router-dom";
import "./general.css";
import { MAIN_ROUTE, OUR_EMAIL } from "../../utils/Consts";

import "./general.css";

const Footer = () => {
    return (
        <footer className="main-footer bg-blur">
            <div className="container">
                <div className="align-container">
                    <div className="logo-container">
                        <Link className="main-logo" to={MAIN_ROUTE}>
                            <img src="/icons/main-logo.svg" alt="Send My Mail" />
                        </Link>
                        <p className="email">Email: {OUR_EMAIL}</p>
                    </div>
                    <div className="contacts-container">
                        <Link className="link" to={MAIN_ROUTE}>
                            Telegram
                        </Link>
                        <Link className="link" to={MAIN_ROUTE}>
                            Vk
                        </Link>
                        <Link className="link" to={MAIN_ROUTE}>
                            Youtube
                        </Link>
                    </div>
                    <div className="info-container">
                        <Link className="link" to={MAIN_ROUTE}>
                            О нас
                        </Link>
                        <Link className="link" to={MAIN_ROUTE}>
                            Связаться с нами
                        </Link>
                        <Link className="link" to={MAIN_ROUTE}>
                            Политика конфинденциальности
                        </Link>
                    </div>
                </div>

                <p className="copyright">
                    © 2024 Write My Mail. Все права защищены
                </p>
            </div>
        </footer>
    )
};

export default Footer;