// import { $host, $authHost } from ".";
// import { API_USER } from "../utils/Consts";

export const getUserInfo = async () => {
    try {
        // const response = await $authHost.get(API_USER);
        // return response.data;

        const mockUserData = {
            isAuth: true,
            login: 'user_mail@mail.com',
            name: 'UserName',
            info: 'Here will be info about user',
            emails: [{
                type: 'gmail',
                email: 'mockuser@gmail.com',
                password: 'password',
            },
            {
                type: 'yandex',
                email: 'mockuser@yandex.ru',
                password: 'password',
            },],
        };
        return mockUserData;
    } catch (e) {
        return null;
    }
}