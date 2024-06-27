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

const GenerateLetterContent = observer(() => {
    const { user, letter } = useContext(Context);

    const { generateLetter } = useGenerate();
    const { sendMail } = useSendMail();

    const [userMail, setUserMail] = useState(user.emails[0] || "");
    const [userName, setUserName] = useState(user.name);
    const [userInfo, setUserInfo] = useState(user.info);
    const [recipientInfo, setRecipientInfo] = useState("");
    const [purposeLetter, setPurposeLetter] = useState("");
    const [addRequirements, setAddRequirements] = useState("");

    const [subjectLetter, setSubjectLetter] = useState(letter.subject);
    const [textLetter, setTextLetter] = useState(letter.text);
    const [recipientMail, setRecipientMail] = useState("");
    const [recipientMailError, setRecipientMailError] = useState("");
    const [userMailError, setUserMailError] = useState("");

    const [userNameError, setUserNameError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [textError, setTextError] = useState("");
    const [userInfoError, setUserInfoError] = useState("");
    const [recipientInfoError, setrecipientInfoError] = useState("");
    const [purposeLetterError, setPurposeLetterError] = useState("");

    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isMailSuccess, setIsMailSuccess] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isMailSending, setIsMailSending] = useState(false);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const validateGenerateFields = () => {
        setUserNameError("");
        setSubjectError("");
        setTextError("");

        let hasError = false;

        if (!userName) {
            setUserNameError("(не может быть пустым)");
            hasError = true;
        }

        if (!userInfo) {
            setUserInfoError("(не может быть пустым)");
            hasError = true;
        }

        if (!recipientInfo) {
            setrecipientInfoError("(не может быть пустым)");
            hasError = true;
        }

        if (!purposeLetter) {
            setPurposeLetterError("(не может быть пустой)");
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

        if (!userName) {
            setUserNameError("(не может быть пустым)");
            hasError = true;
        }

        if (!userMail) {
            setUserMailError("(добавьте почту в аккаунте)");
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

    const onGenerateClick = async () => {
        if (validateGenerateFields()) {
            setIsLoading(true);
            try {
                await generateLetter({
                    userName,
                    aboutSender: userInfo,
                    aboutRecipient: recipientInfo,
                    purpose: purposeLetter,
                    addRequirements,
                });
                setSubjectLetter(letter.subject);
                setTextLetter(letter.text);

                setUserNameError("");
                setUserInfoError("");
                setrecipientInfoError("");
                setPurposeLetterError("");
            } catch (e) {
                setErrorMessage("Ошибка при генерации письма: " + e.message);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onSendClick = async () => {
        if (validateSendFields()) {
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
        setUserInfo(user.info);
        setSubjectLetter(letter.subject);
        setTextLetter(letter.text);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-8">
                    <h1>Генерация с нуля</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-9 dashboard-title">
                    <h3>Информация о письме</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Имя отправителя: {userNameError && <span className="error-message">{userNameError}</span>}</p>
                        <MainInput placeholder="Ваше имя..." value={userName} onChange={handleInputChange(setUserName)} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Об отправителе: {userInfoError && <span className="error-message">{userInfoError}</span>}</p>
                        <MainInput placeholder="Расскажите о себе..." value={userInfo} onChange={handleInputChange(setUserInfo)} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>О получателе: {recipientInfoError && <span className="error-message">{recipientInfoError}</span>}</p>
                        <MainInput placeholder="Расскажите о том, кому отправляете письмо..." value={recipientInfo} onChange={handleInputChange(setRecipientInfo)} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Цель письма: {purposeLetterError && <span className="error-message">{purposeLetterError}</span>}</p>
                        <MainInput placeholder="Напишите, для чего вы отправляете письмо..." value={purposeLetter} onChange={handleInputChange(setPurposeLetter)} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Требования к письму <span className="add-requierements">(не обязательно)</span>:</p>
                        <MainTextArea placeholder="Опишите любые дополнительные требования к письму" value={addRequirements} onChange={handleInputChange(setAddRequirements)} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-xl-4 col-lg-6 col-md-12">
                    <PrimaryButton
                        className='main-button full-width m-bottom'
                        text="Cгенеририовать письмо"
                        callback={onGenerateClick}
                    />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                    {letter.text &&
                        <SecondaryButton
                            className='main-button full-width m-bottom'
                            text="Отменить изменения"
                            callback={onCancelClick}
                        />
                    }
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-9 dashboard-title">
                    <h3>Результат генерации</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Тема письма: {subjectError && <span className="error-message">{subjectError}</span>}</p>
                        <MainInput placeholder="Здесь будет тема письма" value={subjectLetter} onChange={handleInputChange(setSubjectLetter)} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-12">
                    <div className="dashboard-card">
                        <p>Текст письма: {textError && <span className="error-message">{textError}</span>}</p>
                        <MainTextArea placeholder="Здесь будет текст письма" value={textLetter} onChange={handleInputChange(setTextLetter)} isLoading={isLoading} />
                    </div>
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

export default GenerateLetterContent;
