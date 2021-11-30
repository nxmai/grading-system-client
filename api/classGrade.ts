import { apiURL, get, post, patch, put, del } from "./generic";

const classGradeApi = {
    getClassGradesByClassId(classId: any) {
        const url = `${apiURL}/${classId}/grade`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    createClassGrade(classId: any, data: any) {
        const url = `${apiURL}/${classId}/grade`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    orderClassGrade(classId: any, from: string, to: string) {
        const url = `${apiURL}/${classId}/grade/order`;
        const data = { from, to};
        return patch(url, data, localStorage.getItem("token") ?? "");
    },
    updateClassGradeById(classId: any, classGradeId: any, data: any) {
        const url = `${apiURL}/${classId}/grade/${classGradeId}`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
    deleteClassGradeById(classId: any, classGradeId: any) {
        const url = `${apiURL}/${classId}/grade/${classGradeId}`;
        return del(url, localStorage.getItem("token") ?? "");
    },
};

export default classGradeApi;
