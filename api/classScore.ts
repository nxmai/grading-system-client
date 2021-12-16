import { apiURL, get, post, postWithFile, patch, put, del } from "./generic";

const classScoreApi = {
    downloadTemplateListStudentId(classId: any) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    uploadStudentList(classId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    uploadScoreByGradeId(classId: any, gradeId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/${gradeId}/upload`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    downloadTemplateScoreByGradeId(classId: any, gradeId: any) {
        const url = `${apiURL}/${classId}/score/${gradeId}/download`;
        return get(url, localStorage.getItem("token") ?? "");
    },
};

export default classScoreApi;
