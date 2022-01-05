import { apiURL, get, post, del, clientURL } from "./generic";

const classInviteUserApi = {
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
    getInviteUserByInvieLinkText(classId: any, inviteLinkText: any) {
        const url = `${apiURL}/${classId}/invite-link/${inviteLinkText}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    confirmInviteUserLink(inviteLink: any) {
        const url = `${apiURL}/approve/${inviteLink}`;
        return post(url, {}, localStorage.getItem("token") ?? "");
    },
    deleteInviteUser(classId: any, inviteUserClassId: any) {
        const url = `${apiURL}/${classId}/invite-link/${classId}/invite/${inviteUserClassId}`;
        return del(url, localStorage.getItem("token") ?? "");
    },
    inviteLinkPrefix: `${clientURL}/confirm`
};

export default classInviteUserApi;
