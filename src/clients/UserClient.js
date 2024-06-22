import { $host, $authHost } from ".";
import {
    API_USER_UPDATE,
    API_AUTH_LOGIN,
    API_AUTH_REGISTER,
    API_AUTH_REFRESH,
    API_EMAIL_CREATE,
    API_EMAIL_UPDATE,
    API_EMAIL_DELETE,
    API_USER_EMAILS,
    API_USER_INFO
} from "../utils/Consts";

// Получение информации о пользователе и его почт
export const getUserInfo = async (userId) => {
    try {
        const userInfoResponse = await $authHost.get(API_USER_INFO.replace("{userId}", userId));
        const emailsResponse = await $authHost.get(API_USER_EMAILS.replace("{userId}", userId));
        return {
            ...userInfoResponse.data,
            emails: emailsResponse.data,
        };
    } catch (e) {
        return null;
    }
};

// Аутентификация пользователя
export const authenticateUser = async (credentials) => {
    try {
        const response = await $host.post(API_AUTH_LOGIN, credentials);
        return response;
    } catch (e) {
        console.error("Authentication failed", e);
        throw e;
    }
};


// Регистрация пользователя
export const registerUser = async (credentials) => {
    try {
        await $host.post(API_AUTH_REGISTER, credentials);
    } catch (e) {
        console.error("Ошибка регистрации:", e);
        throw e;
    }
};

// Обновление токена
export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const response = await $host.post(`${API_AUTH_REFRESH}?refreshToken=${refreshToken}`);
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return accessToken;
    } catch (e) {
        console.error("Failed to refresh token", e);
        throw e;
    }
};


export const addEmailToUser = async (emailData) => {
    try {
        const response = await $authHost.post(API_EMAIL_CREATE, emailData);
        return response.data;
    } catch (e) {
        console.error("Ошибка добавления почты: ", e);
        throw e;
    }
};

// Обновление почты пользователя
export const updateUserEmail = async (emailData) => {
    try {
        const response = await $authHost.post(API_EMAIL_UPDATE, emailData);
        return response.data;
    } catch (e) {
        console.error("Ошибка сохранения почты: ", e);
        throw e;
    }
};

// Удаление почты пользователя
export const deleteUserEmail = async (emailData) => {
    try {
        const response = await $authHost.delete(API_EMAIL_DELETE, { data: emailData });
        return response.data;
    } catch (e) {
        console.error("Ошибка удаления почты: ", e);
        throw e;
    }
};

// Обновление информации пользователя
export const updateUserInfo = async (data) => {
    try {
        const response = await $authHost.post(API_USER_UPDATE, data);
        return response.data;
    } catch (e) {
        console.error("Failed to update user info", e);
        throw e;
    }
};
