import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { capitalize } from "@mui/material";

import useAuthenticate from "../../hooks/useAuthenticate";
import { validateEmail } from "../../utils/Validators";

import MainIconButton from "../ui/MainIconButton";
import CardMail from "../ui/CardMail";
import MainInput from "../ui/MainInput";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";
import MainModal from "../general/MainModal";
import { MAIN_ROUTE, EMAIL_COUNT_LIMIT } from "../../utils/Consts";

import "./auth.css";

const AccountContent = observer(() => {
  const { user } = useContext(Context);
  const {
    logout,
    updateInfo,
    addEmail,
    updateEmail,
    deleteEmail,
    deleteAllEmails,
  } = useAuthenticate();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user?.name || "");
  const [userInfo, setUserInfo] = useState(user?.info || "");
  const [editingEmailIndex, setEditingEmailIndex] = useState(null);
  const [newEmail, setNewEmail] = useState({ email: "", password: "" });
  const [editEmailError, setEditEmailError] = useState("");
  const [editPasswordError, setEditPasswordError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [editedEmails, setEditedEmails] = useState(user?.emails?.map(email => ({ ...email })) || []);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogoutClick = () => {
    logout();
    navigate(MAIN_ROUTE);
  };

  const onSaveUserInfoClick = async () => {
    try {
      if (user.name !== userName || user.info !== userInfo) {
        await updateInfo(userName, userInfo);
      }
    } catch (e) {
      setErrorMessage("Ошибка при обновлении информации пользователя: " + e.message);
      setHasError(true);
    }
  };

  const onCancelClick = () => {
    setUserName(user.name);
    setUserInfo(user.info);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleEmailChange = (index, field, value) => {
    const updatedEmails = [...editedEmails];
    updatedEmails[index][field] = value;
    setEditedEmails(updatedEmails);
  };

  const handleNewEmailChange = (field, value) => {
    setNewEmail((prev) => ({ ...prev, [field]: value }));
  };

  const onEditEmailClick = (index) => {
    setEditingEmailIndex(index);
  };

  const onCancelEmailEditClick = (index) => {
    const updatedEmails = [...editedEmails];
    updatedEmails[index] = { ...user.emails[index] };
    setEditedEmails(updatedEmails);
    setEditingEmailIndex(null);
    setEditEmailError("");
    setEditPasswordError("");
  };

  const onSaveEmailClick = async (index) => {
    const email = editedEmails[index];
    if (!email.name || !validateEmail(email.name)) {
      setEditEmailError("(введите корректный email)");
      return;
    }
    if (!email.password) {
      setEditPasswordError("(не может быть пустым)");
      return;
    }

    try {
      await updateEmail(email);
      setEditingEmailIndex(null);
      setEditEmailError("");
      setEditPasswordError("");
    } catch (e) {
      const errorMessage = (e?.response?.data?.violations?.length > 0 && e.response.data.violations[0]?.message) ||
        e?.response?.data?.detail ||
        e.message;
      setErrorMessage("Ошибка при обновлении почты: " + errorMessage);
      setHasError(true);
    } finally {
      setEditedEmails(user.emails.map(email => ({ ...email })));
    }
  };

  const onDeleteEmailClick = async (index) => {
    try {
      const email = editedEmails[index];
      await deleteEmail(email);
    } catch (e) {
      setErrorMessage("Ошибка при удалении почты: " + e?.message);
      setHasError(true);
    }
  };

  const onAddEmailClick = async () => {
    if (!newEmail.email || !validateEmail(newEmail.email)) {
      setNewEmailError("(введите корректный email)");
      return;
    }
    if (!newEmail.password) {
      setNewPasswordError("(не может быть пустым)");
      return;
    }

    try {
      await addEmail(newEmail);
      setNewEmail({ email: "", password: "" });
      setNewEmailError("");
      setNewPasswordError("");
    } catch (e) {
      const errorMessage = (e?.response?.data?.violations?.length > 0 && e.response.data.violations[0]?.message) ||
      e?.response?.data?.detail ||
      e.message;
      setErrorMessage("Невозможно добавить почту: " + errorMessage);
      setHasError(true);
    } finally {
      setEditedEmails(user.emails.map(email => ({ ...email })));
    }
  };

  const onDeleteAllEmailsClick = async () => {
    try {
      await deleteAllEmails();
    } catch (e) {
      setErrorMessage("Ошибка при удалении всех почт: " + e.message);
      setHasError(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <h1>Аккаунт</h1>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 col-lg-6 login-section">
            <h2>{user.login}</h2>
            <SecondaryButton
              className="main-button exit-button"
              text="Выход"
              iconSrc="/icons/logout.svg"
              iconAlt="Logout"
              callback={onLogoutClick}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-9 dashboard-title">
            <h3>Основная информация</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="dashboard-card">
              <p>
                Имя <span className="add-requierements">(используется как имя отправителя)</span>:
              </p>
              <MainInput
                placeholder="Ваше имя..."
                value={userName}
                onChange={handleInputChange(setUserName)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-1">
          <div className="col-md-12">
            <div className="dashboard-card">
              <p>
                О вас <span className="add-requierements">(используется для генерации писем)</span>:
              </p>
              <MainInput
                placeholder="Расскажите о себе..."
                value={userInfo}
                onChange={handleInputChange(setUserInfo)}
              />
            </div>
          </div>
        </div>
        {(user.name !== userName || user.info !== userInfo) && (
          <div className="row mt-1">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <PrimaryButton
                className="main-button full-width m-bottom"
                text="Сохранить"
                callback={onSaveUserInfoClick}
              />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <SecondaryButton
                className="main-button full-width m-bottom"
                text="Отменить изменения"
                callback={onCancelClick}
              />
            </div>
          </div>
        )}
        <div className="row mt-2">
          <div className="col-md-9 dashboard-title">
            <h3>Ваши почты</h3>
          </div>
        </div>

        {editedEmails && editedEmails.length > 0 &&
          user.emails.map((email, index) => (
            <div className="row mt-4" key={index}>
              <div className="col-md-12">
                <div className="email-card">
                  <div className="info-row">
                    <div className="cards-list">
                      <CardMail
                        text={capitalize(email.type)}
                        iconSrc={`/icons/${email.type.toLowerCase()}.svg`}
                        iconAlt={capitalize(email.type)}
                      />
                    </div>
                    <MainIconButton
                      iconSrc="/icons/edit.svg"
                      iconAlt="Edit"
                      callback={() => onEditEmailClick(index)}
                    />
                    <MainIconButton
                      iconSrc="/icons/delete.svg"
                      iconAlt="Delete"
                      callback={() => onDeleteEmailClick(index)}
                    />
                  </div>
                  <div className="mail-row">
                    <div className="dashboard-card email-input">
                      <p>E-mail: {editingEmailIndex === index && editEmailError && <span className="error-message">{editEmailError}</span>}</p>
                      <MainInput
                        placeholder="Ваша почта..."
                        value={editedEmails[index]?.name || ""}
                        onChange={(e) => handleEmailChange(index, 'name', e.target.value)}
                        disabled={editingEmailIndex !== index}
                      />
                    </div>
                    <div className="dashboard-card email-input">
                      <p>Пароль <span className="add-requierements">(ключ разработчика)</span>: {editingEmailIndex === index && editPasswordError && <span className="error-message">{editPasswordError}</span>}</p>
                      <MainInput
                        placeholder="Пароль от почты..."
                        value={editedEmails[index]?.password || ""}
                        onChange={(e) => handleEmailChange(index, 'password', e.target.value)}
                        type={editingEmailIndex === index ? "text" : "password"}
                        disabled={editingEmailIndex !== index}
                      />
                    </div>
                  </div>
                  {editingEmailIndex === index && (
                    <div className="buttons-row">
                      <PrimaryButton
                        className="main-button edit-email-btn m-bottom"
                        text="Сохранить"
                        callback={() => onSaveEmailClick(index)}
                      />
                      <SecondaryButton
                        className="main-button edit-email-btn m-bottom"
                        text="Отменить изменения"
                        callback={() => onCancelEmailEditClick(index)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {user.emails.length < EMAIL_COUNT_LIMIT && (
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="email-card">
                <div className="mail-row">
                  <div className="dashboard-card email-input">
                    <p>E-mail: {newEmailError && <span className="error-message">{newEmailError}</span>}</p>
                    <MainInput
                      placeholder="Ваша почта..."
                      value={newEmail.email}
                      onChange={(e) => handleNewEmailChange('email', e.target.value)}
                    />
                  </div>
                  <div className="dashboard-card email-input">
                    <p>Пароль <span className="add-requierements">(ключ разработчика)</span>: {newPasswordError && <span className="error-message">{newPasswordError}</span>}</p>
                    <MainInput
                      placeholder="Пароль от почты..."
                      value={newEmail.password}
                      onChange={(e) => handleNewEmailChange('password', e.target.value)}
                    />
                  </div>
                </div>
                <div className="buttons-row">
                  <PrimaryButton
                    className="main-button edit-email-btn m-bottom"
                    text="Добавить почту"
                    callback={onAddEmailClick}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-4">
          <div className="col-lg-4 col-md-6 col-sm-12">
            <PrimaryButton
              className="main-button full-width m-bottom"
              text="Удалить все"
              callback={onDeleteAllEmailsClick}
            />
          </div>
        </div>
      </div>
      <MainModal open={hasError} message={errorMessage} handleClose={() => setHasError(false)} errorMessage={errorMessage} iconSrc="/icons/exclamation.svg" iconAlt="Error" />
    </div>
  );
});

export default AccountContent;
