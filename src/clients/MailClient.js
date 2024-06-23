import { $authHost } from ".";
import { API_MAIL_SEND } from "../utils/Consts";


export const postMail = async (letterData) => {
    const response = await $authHost.post(API_MAIL_SEND, letterData);
    return response;
}