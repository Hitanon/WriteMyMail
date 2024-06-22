import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { ADD_INFO_ROUTE } from "../../utils/Consts";

import useAuthenticate from "../../hooks/useAuthenticate";

import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import CardsList from "../mail/CardsList";
import MainModal from "../general/MainModal";

import "./auth.css";

const AddEmailForm = () => {
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("test@email.com");
    const [password, setPassword] = useState("1234");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const { addEmail } = useAuthenticate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const onAddClick = async () => {
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
                await addEmail({ email, password });
                navigate(ADD_INFO_ROUTE);
            } catch (e) {
                setErrorMessage("Ошибка при добавлении почты: " + (e.response?.data?.detail || e.message));
                setHasError(true);
            }
        }
    };

    const onSkipClick = () => {
        navigate(ADD_INFO_ROUTE);
    };

    const handleCLickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="auth-container">
            <div className="login-form">
                <div className="add-email-title">
                    <h1>Добавьте почту</h1>
                    <CardsList />
                </div>
                <div className="login-email">
                    <h3 className="hint">Почта <span className="auth-hint">(с нее будут отправляться письма)</span></h3>
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
                    <h3 className="hint">Пароль от почты <span className="auth-hint">(или ключ разарботчика)</span></h3>
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
                    <PrimaryButton text="Добавить" callback={onAddClick} className="full-line" />
                    <SecondaryButton text="Пропустить" callback={onSkipClick} className="full-line margin-top" />
                </div>
            </div>
            <MainModal open={hasError} handleClose={() => setHasError(false)} message={errorMessage} iconSrc="/icons/exclamation.svg" iconAlt="Error" />
        </div>
    );
};

export default AddEmailForm;
