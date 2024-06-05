import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ADD_EMAIL_ROUTE, LOGIN_ROUTE } from "../../utils/Consts";

import useAuthenticate from "../../hooks/useAuthenticate";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

import "./auth.css";

const RegistrationForm = () => {
    const [hasError, setHasError] = useState(false);
    const [email, setEmail] = useState("test@email.com");
    const [password, setPassword] = useState("1234");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { register } = useAuthenticate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const onRegistrationClick = async () => {
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

        if (!hasError) {
            try {
                await register({ email, password });
                navigate(ADD_EMAIL_ROUTE);
            } catch (e) {
                setHasError(true);
            }
        }
    };

    const onLoginClick = () => {
        navigate(LOGIN_ROUTE);
    };

    const handleCLickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-container">
            <div className="login-form">
                <div className="title">
                    <h1>Регистрация в</h1>
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
                    <PrimaryButton text="Создать аккаунт" callback={onRegistrationClick} className="full-line" />
                    <div className="sep">
                        <div className="line"></div>
                        <p>Уже есть аккаунт?</p>
                        <div className="line"></div>
                    </div>
                    <SecondaryButton text="Войти" callback={onLoginClick} className="full-line margin-top" />
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
