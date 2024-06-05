import { useContext } from 'react';

import { Context } from "../";
import { logoutUser, getUserInfo, authenticateUser, registerUser, addEmailToUser, updateUserName, updateUserInfo } from '../clients/UserClient';

const useAuthenticate = () => {
    const { user } = useContext(Context);

    const getInfo = async () => {
        // change it
        const userInfo = await getUserInfo();
        if (userInfo === null) {
            return;
        }
        user.setLogin(userInfo.login);
        user.setName(userInfo.name);
        user.setInfo(userInfo.info);
        user.setEmails(userInfo.emails);
        user.setIsAuth(true);
    };

    const login = async ({ email, password }) => {
        const token = await authenticateUser({ email, password });
        localStorage.setItem("token", token);
        await getInfo();
    };

    const register = async ({ email, password }) => {
        await registerUser({ email, password });
        await login({ email, password });
    };

    const logout = async () => {
        await logoutUser();
        user.setLogin("");
        user.setName("");
        user.setInfo("");
        user.setEmails([]);
        user.setIsAuth(false);
        localStorage.removeItem("token");
    };

    const addEmail = async ({email, password}) => {
        const newEmail = await addEmailToUser({email, password});
        user.addEmail(newEmail);
    };

    const updateName = async (name) => {
        const updatedName = await updateUserName(name);
        user.setName(updatedName);
    };

    const updateInfo = async (info) => {
        const updatedInfo = await updateUserInfo(info);
        user.setInfo(updatedInfo);
    };

    return {
        login: login,
        register: register,
        logout: logout,
        getInfo: getInfo,
        addEmail: addEmail,
        updateName: updateName,
        updateInfo: updateInfo,
    };

};

export default useAuthenticate;