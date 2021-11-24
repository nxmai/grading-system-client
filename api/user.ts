import { apiURL, get, put } from "./generic";

const userApi = {
    getMe () {
        const url = `${apiURL}/user/me`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    updateStudentID (data: any) {
        const url = `${apiURL}/user/update/card`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
    updateInfo (data: any) {
        const url = `${apiURL}/user/updateMe`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
    updatePW (data: any) {
        const url = `${apiURL}/user/updatePassword`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
};

export default userApi;
