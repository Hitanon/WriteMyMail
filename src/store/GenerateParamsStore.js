import { makeAutoObservable } from "mobx";

export default class GenerateParamsStore {
    constructor() {
        this._aboutRecipient = "";
        this._purpose = "";
        this._addRequirements = "";
        makeAutoObservable(this);
    }

    setAboutRecipient(aboutRecipient) {
        this._aboutRecipient = aboutRecipient;
    }

    setPurpose(purpose) {
        this._purpose = purpose;
    }

    setAddRequirements(addRequirements) {
        this._addRequirements = addRequirements;
    }

    get aboutRecipient() {
        return this._aboutRecipient;
    }

    get purpose() {
        return this._purpose;
    }

    get addRequirements() {
        return this._addRequirements;
    }
}
