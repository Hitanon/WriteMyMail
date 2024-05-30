import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../..";
import PrimaryButton from "../ui/PrimaryButton";

import {
    MAIN_ROUTE,
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
} from "../../utils/Consts";

import "./general.css";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const onAccountClick = () => {
        navigate(HOME_ROUTE);
    };

    const onLoginClick = () => {
        navigate(LOGIN_ROUTE);
    };

    const onRegistrationClick = () => {
        navigate(REGISTRATION_ROUTE);
    };


    return (
        <nav className="nav-bar bg-blur">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col">
                        <Link className="main-logo" to={MAIN_ROUTE}>
                            <img src="/icons/main-logo.svg" alt="Send My Mail" />
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-end auth-bar">
                        {user.isAuth ? (
                            <PrimaryButton className="me-1"
                                text="Аккаунт"
                                callback={onAccountClick}
                                iconSrc="/icons/account.svg"
                                iconAlt="To home page" />
                        ) : (
                            <>
                                <PrimaryButton className="me-1" text="Войти в аккаунт" callback={onLoginClick} />
                                <PrimaryButton className="register-button" text="Регистрация" callback={onRegistrationClick} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
});

export default NavBar;
