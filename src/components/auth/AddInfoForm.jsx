import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import { HOME_ROUTE } from "../../utils/Consts";

import useAuthenticate from "../../hooks/useAuthenticate";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

import "./auth.css";

const AddInfoForm = () => {
    const [hasError, setHasError] = useState(false);
    const [name, setName] = useState("UserName");
    const [info, setInfo] = useState("UserInfo");
    const [nameError, setNameError] = useState("");
    const [infoError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { updateName, updateInfo } = useAuthenticate();


    const onAddClick = async () => {
        setNameError("");
        setPasswordError("");

        let hasError = false;

        if (!name) {
            setNameError("Введите ваше имя");
            hasError = true;
        }

        if (!info) {
            setPasswordError("Введите информацию о себе");
            hasError = true;
        }

        if (!hasError) {
            try {
                await updateName(name);
                await updateInfo(info);
                navigate(HOME_ROUTE);
            } catch (e) {
                setHasError(true);
            }
        }
    };

    const onSkipClick = () => {
        navigate(HOME_ROUTE);
    };

    return (
        <div className="auth-container">
            <div className="login-form">
                <div className="title">
                    <h1>Расскажите о себе</h1>
                </div>
                <div className="login-email">
                    <h3 className="hint">Имя <span className="auth-hint">(будет именем отправителя по умолчанию)</span></h3>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        error={!!nameError}
                        helperText={nameError}
                        InputProps={{
                            className: "custom-input",
                        }}
                    />
                </div>
                <div className="login-password">
                    <h3 className="hint">О вас
                        <span className="auth-hint">
                            (будет использоваться как информация об отправителе по умолчанию при генерации писем)
                        </span>
                    </h3>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Расскажите о себе"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        type="text"
                        error={!!infoError}
                        helperText={infoError}
                        InputProps={{
                            className: "custom-input",
                        }}
                    />
                </div>
                <div className="buttons">
                    <PrimaryButton text="Завершить регистрацию" callback={onAddClick} className="full-line" />
                    <SecondaryButton text="Пропустить" callback={onSkipClick} className="full-line margin-top" />
                </div>
            </div>
        </div>
    );
};

export default AddInfoForm;
