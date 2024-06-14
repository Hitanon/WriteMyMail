import { observer } from "mobx-react-lite";
import MainInput from "../ui/MainInput";
import PrimaryButton from "../ui/PrimaryButton";
import MainSelect from "../ui/MainSelect";
import { CircularProgress } from "@mui/material";
import "./mail.css";

const MailSending = observer(({
    recipientMail,
    setRecipientMail,
    recipientMailError,
    userMails,
    userMail,
    setUserMail,
    userMailError,
    onSendClick,
    isMailSending
}) => {
    const handleRecipientMailChange = (e) => {
        setRecipientMail(e.target.value);
    };

    return (
        <>
            <div className="row mt-3">
                <div className="col-md-9 dashboard-title">
                    <h3>Отправка письма</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6 col-md-12">
                    <div className="dashboard-card">
                        <p>Ваша почта: {userMailError && <span className="error-message">{userMailError}</span>}</p>
                        <MainSelect
                            options={userMails.map(email => email.email)}
                            activeOption={userMail.email}
                            onChange={(email) => setUserMail(email)}
                            placeholder="Нет доступных почт"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="dashboard-card">
                        <p>Почта получателя: {recipientMailError && <span className="error-message">{recipientMailError}</span>}</p>
                        <MainInput placeholder="Введите почту получателя..." value={recipientMail} onChange={handleRecipientMailChange} />
                    </div>
                </div>
            </div>
            <div className="row mt-1">
                <div className="col-md-4 col-sm-12">
                    {isMailSending ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <PrimaryButton
                            className='main-button full-width m-bottom'
                            text="Отправить письмо"
                            callback={onSendClick}
                        />
                    )}
                </div>
            </div>
        </>
    );
});

export default MailSending;
