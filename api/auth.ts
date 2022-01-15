import { apiURL, get, post } from "./generic";

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
    sendConfirmation(userData: any) {
        const url = `${apiURL}/auth/confirmation`;
        return post(url, userData);
    },
    confirmEmail(token: any) {
        const url = `${apiURL}/auth/confirmation/${token}`;
        return get(url, "");
    },
};

export default authApi;
