import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authHostConfig = (config) => {
    config.headers.Authorization = `Token ${getToken()}`;
    return config;
}

const getToken = () => {
    const token = localStorage.getItem("token");
    return token === null ? "" : token;
};

$authHost.interceptors.request.use(authHostConfig);

export {$host, $authHost};
