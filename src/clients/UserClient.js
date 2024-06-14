// import { $host, $authHost } from ".";
// import {
//     API_USER,
//     API_USER_TOKEN,
//     API_USER_LOGOUT,
//     API_USER_REGISTRATION,
//     API_USER_ADD_EMAIL,
//     API_USER_UPDATE_NAME,
//     API_USER_UPDATE_INFO,
// } from "../utils/Consts";

export const getUserInfo = async () => {
    try {
        // const response = await $authHost.get(API_USER);
        // return response.data;

        const mockUserData = {
            isAuth: true,
            login: 'user_mail@mail.com',
            name: 'UserName',
            info: 'Here will be info about user',
            emails: [
                {
                    type: 'gmail',
                    email: 'mockuser@gmail.com',
                    password: 'password',
                },
                {
                    type: 'yandex',
                    email: 'mockuser@yandex.ru',
                    password: 'password',
                },
            ],
        };
        return mockUserData;
    } catch (e) {
        return null;
    }
}

export const authenticateUser = async (credential) => {
    // const respons = await $host.post(API_USER_TOKEN, credentials);
    // return respons.data.token;
    const mockJWT = "jwt_token";
    return mockJWT;
}

export const logoutUser = async () => {
    // await $authHost.post(API_USER_LOGOUT);
};

export const registerUser = async (credentials) => {
    // await $host.post(API_USER_REGISTRATION, credentials);
}

export const addEmailToUser = async (emailData) => {
    // Implement the real request to the server to add the email
    // const response = await $authHost.post(API_USER_ADD_EMAIL, emailData);
    // return response.data;

    // Mocked response
    return {
        email: emailData.email,
        password: emailData.password,
    };
}

export const updateUserEmail = async (emailData) => {
    // Implement the real request to the server to update the email
    // const response = await $authHost.put(API_USER_UPDATE_EMAIL, emailData);
    // return response.data;

    // Mocked response
    return {
        email: emailData.email,
        password: emailData.password,
    };
}

export const deleteUserEmail = async (email) => {
    // Implement the real request to the server to delete the email
    // const response = await $authHost.delete(`${API_USER_DELETE_EMAIL}/${email}`);
    // return response.data;

    // Mocked response
    return {
        email: email,
    };
}

export const deleteAllUserEmails = async () => {
    // Implement the real request to the server to delete all emails
    // const response = await $authHost.delete(API_USER_DELETE_ALL_EMAILS);
    // return response.data;

    // Mocked response
    return {
        message: 'All emails deleted',
    };
}

export const updateUserName = async (name) => {
    // Implement the real request to the server to update the name
    // const response = await $authHost.put(API_USER_UPDATE_NAME, { name });
    // return response.data;

    // Mocked response
    return name;
}

export const updateUserInfo = async (info) => {
    // Implement the real request to the server to update the info
    // const response = await $authHost.put(API_USER_UPDATE_INFO, { info });
    // return response.data;

    // Mocked response
    return info;
}
