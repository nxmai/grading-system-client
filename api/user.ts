import { apiURL, get, post, put } from "./generic";

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
    updateOne(id: any, data: any) {
        const url = `${apiURL}/user/all/update/${id}`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    getAll(filter: any) {
        const url = `${apiURL}/user/all?${filter}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getNotifications() {
        const url = `${apiURL}/user/notification`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    responseToStudentGradeReviewNotification(data: any) {
        const url = `${apiURL}/user/notification/response-to-student-grade-review`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    requestGradeReviewNotification(data: any) {
        const url = `${apiURL}/user/notification/request-a-grade-review`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    returnScoreNotification(data: any) {
        const url = `${apiURL}/user/notification/return-all-scores`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    updateNotificationRead(data: any) {
        const url = `${apiURL}/user/notification/read`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
};

export default userApi;