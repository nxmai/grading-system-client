import { apiURL, get, post } from "./generic";

const classApi = {
    getAllClasses() {
        const url = `${apiURL}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    createClass(classData: any) {
        const url = `${apiURL}`;
        return post(url, classData, localStorage.getItem("token") ?? "");
    },
    getTeachersInClass(classId: any) {
        const url = `${apiURL}/${classId}/people/teacher`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getStudentsInClass(classId: any) {
        const url = `${apiURL}/${classId}/people/student`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getClassById(classId: any) {
        const url = `${apiURL}/${classId}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getInviteUserLinkByClassId(classId: any) {
        const url = `${apiURL}/${classId}/invite-link`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    createInviteUserLink(classId: any) {
        const url = `${apiURL}/${classId}/invite-link`;
        return post(url, {}, localStorage.getItem("token") ?? "");
    },
    inviteUserWithInviteLink(classId: any, data: any) {
        const url = `${apiURL}/${classId}/invite-link/${classId}/invite`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    confirmInviteUserLink(inviteLink: any) {
        const url =`${apiURL}/approve/${inviteLink}`;
        return post(url, {}, localStorage.getItem("token") ?? "");
    }
};

export default classApi;
