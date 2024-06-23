import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

import useGenerate from "../../hooks/useGenerate";
import useSendMail from "../../hooks/useSendMail";

import { validateEmail } from "../../utils/Validators";

import MainInput from "../ui/MainInput";
import MainTextArea from "../ui/MainTextArea";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import MainModal from "../general/MainModal";
import MailSending from "./MailSending";

import "./mail.css";

const ImproveLetterContent = observer(() => {
    const { user, letter } = useContext(Context);

    const { improveLetter } = useGenerate();
    const { sendMail } = useSendMail();

    const [userMail, setUserMail] = useState(user.emails[0] || "");
    const [userName, setUserName] = useState(user.name);
    const [subjectLetter, setSubjectLetter] = useState(letter.subject);
    const [textLetter, setTextLetter] = useState(letter.text);
    const [recipientMail, setRecipientMail] = useState("");
    const [recipientMailError, setRecipientMailError] = useState("");
    const [userMailError, setUserMailError] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [textError, setTextError] = useState("");

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isMailSuccess, setIsMailSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isMailSending, setIsMailSending] = useState(false);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const validateImproveFields = () => {
        setUserNameError("");
        setSubjectError("");
        setTextError("");

        let hasError = false;

        if (!userName) {
            setUserNameError("(не может быть пустым)");
            hasError = true;
        }

        if (!subjectLetter) {
            setSubjectError("(не может быть пустой)");
            hasError = true;
        }

        if (!textLetter) {
            setTextError("(не может быть пустым)");
            hasError = true;
        }

        return !hasError;
    };

    const validateSendFields = () => {
        setRecipientMailError("");
        setUserMailError("");

        let hasError = false;

        if (!recipientMail) {
            setRecipientMailError("(не может быть пустой)");
            hasError = true;
        } else if (!validateEmail(recipientMail)) {
            setRecipientMailError("(должна быть правильной)");
            hasError = true;
        }

        if (!userMail) {
            setUserMailError("(добавьте почту в аккаунте)");
            hasError = true;
        }

        return !hasError;
    };

    const onImproveClick = async () => {
        if (validateImproveFields()) {
            setIsLoading(true);
            try {
                await improveLetter({ userName, subject: subjectLetter, text: textLetter });
                // setSubjectLetter(letter.subject);
                setTextLetter(letter.text);
            } catch (e) {
                setErrorMessage("Ошибка при генерации письма: " + e.message);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onSendClick = async () => {
        if (validateImproveFields() && validateSendFields()) {
            setIsMailSending(true);
            try {
                const response = await sendMail(userMail.name, subjectLetter, textLetter, recipientMail);
                if (response.status === 200) {
                    setIsMailSuccess(true);
                    setSuccessMessage(`Письмо успешно отправлено с ${userMail.name} на ${recipientMail}`);
                } else {
                    setIsMailSuccess(false);
                    setHasError(true);
                    setErrorMessage("Ошибка при отправке письма. Попоробуйте отправить письмо позже");
                }
            } catch (e) {
                setIsMailSuccess(false);
                setHasError(true);
                setErrorMessage("Ошибка при отправке письма. Проверьте пароль и доступ к вашей почте");
            } finally {
                setIsMailSending(false);
            }
        }
    };

    const onCancelClick = () => {
        setUserName(user.name);
        setSubjectLetter(letter.subject);
        setTextLetter(letter.text);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <h1>Улучшение письма</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9 dashboard-title">
                    <h3>Информация о письме</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-5 col-md-12">
                    <div className="dashboard-card">
                        <p>Имя отправителя: {userNameError && <span className="error-message">{userNameError}</span>}</p>
                        <MainInput placeholder="Ваше имя..." value={userName} onChange={handleInputChange(setUserName)} />
                    </div>
                </div>
                <div className="col-lg-7 col-md-12">
                    <div className="dashboard-card">
                        <p>Тема письма: {subjectError && <span className="error-message">{subjectError}</span>}</p>
                        <MainInput placeholder="Тема вашего письма..." value={subjectLetter} onChange={handleInputChange(setSubjectLetter)} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Текст письма: {textError && <span className="error-message">{textError}</span>}</p>
                        <MainTextArea placeholder="Текст вашего письма..." value={textLetter} onChange={handleInputChange(setTextLetter)} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-xl-4 col-lg-6 col-md-12">
                    <PrimaryButton
                        className='main-button full-width m-bottom'
                        text="Улучшить письмо"
                        callback={onImproveClick}
                    />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-12">
                    <SecondaryButton
                        className='main-button full-width m-bottom'
                        text={letter.text ? "Отменить изменения" : "Очистить"}
                        callback={onCancelClick}
                    />
                </div>
            </div>
            <MailSending
                recipientMail={recipientMail}
                setRecipientMail={setRecipientMail}
                recipientMailError={recipientMailError}
                userMails={user.emails}
                userMail={userMail}
                setUserMail={setUserMail}
                userMailError={userMailError}
                onSendClick={onSendClick}
                isMailSending={isMailSending}
            />
            <MainModal open={hasError}
                handleClose={() => setHasError(false)}
                message={errorMessage}
                iconSrc="/icons/exclamation.svg"
                iconAlt="Error" />
            <MainModal open={isMailSuccess}
                handleClose={() => setIsMailSuccess(false)}
                message={successMessage}
                iconSrc="/icons/success.svg"
                iconAlt="Success" />
        </div>
    );
});

export default ImproveLetterContent;
