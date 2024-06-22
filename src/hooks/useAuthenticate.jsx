import { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

import { Context } from "../";
import {
    getUserInfo,
    authenticateUser,
    registerUser,
    addEmailToUser,
    updateUserInfo,
    updateUserEmail,
    deleteUserEmail,
    refreshToken as refreshAuthToken
} from '../clients/UserClient';


const useAuthenticate = () => {
    const { user } = useContext(Context);

    const getUserIdFromToken = (token) => {
        const decoded = jwtDecode(token);
        return decoded.id;
    };

    const getInfo = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        const userId = getUserIdFromToken(token);
        const userInfo = await getUserInfo(userId);
        if (userInfo === null) {
            return;
        }
        user.setId(userId);
        user.setLogin(userInfo.username);
        user.setName(userInfo.name);
        user.setInfo(userInfo.info);
        user.setEmails(userInfo.emails);
        user.setIsAuth(true);
    };

    const login = async ({ email, password }) => {
        const response = await authenticateUser({ username: email, password });
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", getUserIdFromToken(accessToken))
        await getInfo();
    };

    const register = async ({ email, password }) => {
        await registerUser({ username: email, password });
        await login({ email, password });
    };

    const logout = async () => {
        user.setId("");
        user.setLogin("");
        user.setName("");
        user.setInfo("");
        user.setEmails([]);
        user.setIsAuth(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
    };

    const addEmail = async ({ email, password }) => {
        const emailData = {
            id: user.id,
            name: email,
            password: password,
            user: {
                id: user.id,
                username: user.login,
                name: user.name,
                info: user.info,
            },
        };
        await addEmailToUser(emailData);
        await getInfo();
    };

    const updateEmail = async (emailData) => {
        await updateUserEmail(emailData);
        await getInfo();
    };

    const deleteEmail = async (emailData) => {
        await deleteUserEmail(emailData);
        await getInfo();
    };

    const deleteAllEmails = async () => {
        const emails = user.emails;
        console.log(emails);
        if (emails.length === 0) return;
        for (const email of emails) {
            await deleteEmail(email);
        }
        await getInfo();
    };


    const updateInfo = async (name, info) => {
        await updateUserInfo({ id: user.id, username: user.login, name, info });
        await getInfo();
    };

    const refreshToken = async () => {
        const newToken = await refreshAuthToken();
        localStorage.setItem("accessToken", newToken.accessToken);
        localStorage.setItem("refreshToken", newToken.refreshToken);
        return newToken;
    };

    return {
        login,
        register,
        logout,
        getInfo,
        addEmail,
        updateEmail,
        deleteEmail,
        deleteAllEmails,
        updateInfo,
        refreshToken,
    };
};

export default useAuthenticate;
