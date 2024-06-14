// import { $host, $authHost } from ".";
// import { API_IMPROVE_LETTER, } from "../utils/Consts";


export const getImprovedLetter = async (letterData) => {
    // const response = await $authHost.get(API_IMPROVE_LETTER, letterData);
    // return response.data;

    // Симуляция задержки в 2 секунды
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        subject: "Improved subject",
        text: "Improved text",
    };
}

export const getGeneratedLetter = async (letterData) => {
    // const response = await $authHost.get(API_IMPROVE_LETTER, letterData);
    // return response.data;

    // Симуляция задержки в 2 секунды
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
        subject: "Generated subject",
        text: "Generated text",
    };
}