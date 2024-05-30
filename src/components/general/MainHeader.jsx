import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../..";

import PrimaryButton from '../ui/PrimaryButton';
import CardsList from "../mail/CardsList";

import {
    HOME_ROUTE,
    LOGIN_ROUTE
} from "../../utils/Consts";

import "./general.css";

const MainHeader = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const onStartClick = () => {
        user.isAuth ? navigate(HOME_ROUTE) : navigate(LOGIN_ROUTE);
    };

    return (
        <div className='container main-header'>
            <div className="row mt-5">
                <div className='col-lg-4 col-md-6'>
                    <img className="main-tile" src="/icons/main-title.svg" alt="Почта с нейросетью" />
                </div>
            </div>
            <div className="row mt-3">
                <div className='col-md-7 col-lg-5'>
                    <h2>Улучшение и генерация электронных писем</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-md-7 col-lg-5'>
                    <p>Подключите свою почту и получайте за секунды эффективные и качественные тексты</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-10 col-md-6'>
                    <PrimaryButton
                        className='main-button'
                        text="Начать пользоваться"
                        iconSrc="/icons/arrow.svg"
                        iconAlt="Arrow"
                        callback={onStartClick}
                    />
                </div>
            </div>
            <div className="row mt-4">
                <div className='col-md-7 col-lg-5'>
                    <CardsList/>
                </div>
            </div>
        </div>
    );
});

export default MainHeader;
