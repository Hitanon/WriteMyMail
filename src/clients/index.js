import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const authHostConfig = (config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

const getToken = () => {
    return localStorage.getItem("accessToken") || "";
};

const getRefreshToken = () => {
    return localStorage.getItem("refreshToken") || "";
};

const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

const refreshAccessToken = async () => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/auth/refresh`, null, {
            params: { refreshToken: getRefreshToken() }
        });
        const { accessToken, refreshToken } = response.data;
        setTokens(accessToken, refreshToken);
        return accessToken;
    } catch (error) {
        console.error("Unable to refresh access token", error);
        throw error;
    }
};

$authHost.interceptors.request.use(authHostConfig);

$authHost.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newAccessToken = await refreshAccessToken();
                axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return $authHost(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token", refreshError);
                // Handle refresh token expiration or other errors
            }
        }
        return Promise.reject(error);
    }
);

export { $host, $authHost};
