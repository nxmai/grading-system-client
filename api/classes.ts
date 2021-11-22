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
};

export default classApi;
