import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "../..";

import PrimaryButton from "../ui/PrimaryButton";

import {
    ACCOUNT_ROUTE,
    GENERATE_LETTER_ROUTE,
    IMPROVE_LETTER_ROUTE
} from "../../utils/Consts";

import "./general.css";


const HomeHeader = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const onToAccountClick = () => {
        navigate(ACCOUNT_ROUTE);
    };

    const onToImproveClick = () => {
        navigate(IMPROVE_LETTER_ROUTE);
    };

    const onToGenerateClick = () => {
        navigate(GENERATE_LETTER_ROUTE);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <h1>
                        Как пользоваться?
                    </h1>
                </div>
            </div>
            {(!user.name || !user.info) &&
                <>
                    <div className="row mt-5">
                        <div className="col-md-9 dashboard-title">
                            <h2>
                                1. Добавьте почту и инофрмацию о себе в аккаунт
                            </h2>
                            <img className="dashboard-logo" src="/icons/account.svg" alt="Account" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-9">
                            <div className="dashboard-card">
                                <p>
                                    Это нужно сделать, чтобы появилась возможность отправлять письма напрямую с сайта и определить значения по умолчанию для имени и информации об отправителе
                                </p>
                                <div className="dashboard-card-row">
                                    <PrimaryButton text="Перейти в аккаунт" iconSrc="/icons/arrow.svg" iconAlt="Arrow" callback={onToAccountClick} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>}

            <div className="row mt-5">
                <div className="col-md-9 dashboard-title">
                    <h2>
                        2. Выберите режим для генерации
                    </h2>
                    <img className="dashboard-logo" src="/icons/select.svg" alt="Select" />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12 col-xl-6">
                    <div className="dashboard-card min-height-card">
                        <div className="dashboard-card-row">
                            <div className="text-col">
                                <h3>Улучшение письма</h3>
                                <p>
                                    Используйте, если у вас уже написано письмо, чтобы улучшить стиль его написания  и понизить шансы попадания в спам
                                </p>
                            </div>
                            <img className="generate-logo" src="/icons/improve-gradient.svg" alt="Improve Letter Icon" />
                        </div>
                        <div className="dashboard-card-row">
                            <PrimaryButton text="Запустить режим" iconSrc="/icons/arrow.svg" iconAlt="Arrow" callback={onToImproveClick} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 col-xl-6">
                    <div className="dashboard-card min-height-card">
                        <div className="dashboard-card-row">
                            <div className="text-col">
                                <h3>Генерация с нуля</h3>
                                <p>
                                    Используйте, если вам необходимо написать персонализированное письмо по заданной теме (вы сможете указать информацию о получателе, цель отправки письма и другие параметры)
                                </p>
                            </div>
                            <img className="generate-logo" src="/icons/generate-gradient.svg" alt="Generate Letter Icon" />
                        </div>
                        <div className="dashboard-card-row">
                            <PrimaryButton text="Запустить режим" iconSrc="/icons/arrow.svg" iconAlt="Arrow" callback={onToGenerateClick} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default HomeHeader;