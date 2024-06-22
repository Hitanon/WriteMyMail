import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._id = "";
        this._login = "";
        this._name = "";
        this._info = "";
        this._emails = [];
        makeAutoObservable(this);
    }

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    }

    get isAuth() {
        return this._isAuth;
    }

    setId(id) {
        this._id = id;
    }

    get id() {
        return this._id;
    }

    setLogin(login) {
        this._login = login;
    }

    get login() {
        return this._login;
    }

    setName(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    setInfo(info) {
        this._info = info;
    }

    get info() {
        return this._info;
    }

    addEmail (email) {
        this._emails.push(email);
    }

    setEmails(emails) {
        this._emails = emails;
    }

    get emails() {
        return this._emails;
    }
}
