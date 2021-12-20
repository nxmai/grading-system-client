import { apiURL, get, post, patch, put, del } from "./generic";

const classAssignmentApi = {
    getClassAssignmentsByClassId(classId: any) {
        const url = `${apiURL}/${classId}/assignment`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    createClassAssignment(classId: any, data: any) {
        const url = `${apiURL}/${classId}/assignment`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    orderClassAssignment(classId: any, from: string, to: string) {
        const url = `${apiURL}/${classId}/assignment/order`;
        const data = { from, to};
        return patch(url, data, localStorage.getItem("token") ?? "");
    },
    updateClassAssignmentById(classId: any, classAssignmentId: any, data: any) {
        const url = `${apiURL}/${classId}/assignment/${classAssignmentId}`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
    deleteClassAssignmentById(classId: any, classAssignmentId: any) {
        const url = `${apiURL}/${classId}/assignment/${classAssignmentId}`;
        return del(url, localStorage.getItem("token") ?? "");
    },
};

export default classAssignmentApi;
