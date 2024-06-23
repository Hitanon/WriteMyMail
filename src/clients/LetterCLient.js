import { $authHost } from ".";
import { API_AI_UPGRADE, API_AI_GENERATE } from "../utils/Consts";

export const getImprovedLetter = async (letterData) => {
    const response = await $authHost.post(API_AI_UPGRADE, letterData);
    return response;
}

export const getGeneratedLetter = async (letterData) => {
    const response = await $authHost.post(API_AI_GENERATE, letterData);
    return response;
}
