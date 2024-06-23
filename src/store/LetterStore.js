import { makeAutoObservable } from "mobx";

export default class LetterStore {
    constructor() {
        this._subject = "";
        this._text = "";
        makeAutoObservable(this);
    }

    setSubject(subject) {
        this._subject = subject;
    }

    setText(text) {
        this._text = text;
    }

    get subject() {
        return this._subject;
    }

    get text() {
        return this._text;
    }

    clear() {
        this._aboutRecipient = "";
        this._purpose = "";
        this._addRequirements = "";
    }
}
