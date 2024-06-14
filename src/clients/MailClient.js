// import { $host, $authHost } from ".";
// import { API_SEND_MAIL, } from "../utils/Consts";


export const postMail = async (letterData) => {
    // const response = await $authHost.get(API_SEND_MAIL, letterData);
    // return response.data;

    // Симуляция задержки в 2 секунды
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        text: "OK",
    };
}