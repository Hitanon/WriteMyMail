import { makeAutoObservable } from "mobx";

export default class SendMailStore {
    constructor(userStore) {
        this._userStore = userStore;
        this._senderMail = userStore.emails.length > 0 ? userStore.emails[0] : "";
        this._recipientMail = "";
        makeAutoObservable(this);
    }

    setSenderMail(senderMail) {
        this._senderMail = senderMail;
    }

    setRecipientMail(recipientMail) {
        this._recipientMail = recipientMail;
    }

    get senderMail() {
        return this._senderMail;
    }

    get recipientMail() {
        return this._recipientMail;
    }

    updateSenderMail() {
        this._senderMail = this._userStore.emails.length > 0 ? this._userStore.emails[0] : "";
    }
}
