import { apiURL, post } from "./generic";

const authApi = {
    register(userData: any) {
        const url = `${apiURL}/auth/register`;
        return post(url, userData);
    },
    login(userData: any) {
        const url = `${apiURL}/auth/login`;
        return post(url, userData);
    },
    googleAuth(userData: any) {
        const url = `${apiURL}/auth/google`;
        return post(url, userData);
    },
};

export default authApi;
