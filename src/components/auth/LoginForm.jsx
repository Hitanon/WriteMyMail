import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { validateEmail } from "../../utils/Validators";

import { HOME_ROUTE, REGISTRATION_ROUTE } from "../../utils/Consts";

import useAuthenticate from "../../hooks/useAuthenticate";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import MainModal from "../general/MainModal";

import "./auth.css";

const LoginForm = () => {
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuthenticate();


    const onLoginClick = async () => {
        setEmailError("");
        setPasswordError("");

        let hasError = false;

        if (!email) {
            setEmailError("Почта не может быть пустой");
            hasError = true;
        } else if (!validateEmail(email)) {
            setEmailError("Неверный формат почты");
            hasError = true;
        }

        if (!password) {
            setPasswordError("Пароль не может быть пустым");
            hasError = true;
        }

        if (password.length < 8) {
            setPasswordError("Длина пароля меньше 8 символов");
            hasError = true;
        }

        if (!hasError) {
            try {
                await login({ email, password });
                navigate(HOME_ROUTE);
            } catch (e) {
                setErrorMessage("Ошибка при входе: " + (e.response?.data?.detail || e.response?.data?.violations[0]?.message || e.message));
                setHasError(true);
            }
        }
    };

    const onRegistrationClick = () => {
        navigate(REGISTRATION_ROUTE);
    };

    const handleCLickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-container">
            <div className="login-form">
                <div className="title">
                    <h1>Вход в</h1>
                    <img src="/icons/main-logo.svg" alt="Write My Mail" />
                </div>
                <div className="login-email">
                    <h3 className="hint">Ваша почта</h3>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        error={!!emailError}
                        helperText={emailError}
                        InputProps={{
                            className: "custom-input",
                        }}
                    />
                </div>
                <div className="login-password">
                    <h3 className="hint">Пароль</h3>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        error={!!passwordError}
                        helperText={passwordError}
                        InputProps={{
                            className: "custom-input",
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCLickShowPassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="buttons">
                    <PrimaryButton text="Войти" callback={onLoginClick} className="full-line" />
                    <div className="sep">
                        <div className="line"></div>
                        <p>Нет аккаунта?</p>
                        <div className="line"></div>
                    </div>
                    <SecondaryButton text="Создать аккаунт" callback={onRegistrationClick} className="full-line margin-top" />
                </div>
            </div>
            <MainModal open={hasError} handleClose={() => setHasError(false)} message={errorMessage} iconSrc="/icons/exclamation.svg" iconAlt="Error" />
        </div>
    );
};

export default LoginForm;
