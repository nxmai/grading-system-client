import { apiURL, get, post, postWithFile, patch, put, del } from "./generic";

const classScoreApi = {
    getStudentsInClass(classId: any) {
        const url = `${apiURL}/${classId}/score/student`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    downloadTemplateListStudentId(classId: any) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    uploadStudentList(classId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    uploadScoreByAssignmentId(classId: any, assignmentId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    downloadTemplateScoreByAssignmentId(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/score/${assignmentId}/download`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getAssignmentScoreByClassId(classId: any) {
        const url = `${apiURL}/${classId}/score`;
        return get(url, localStorage.getItem("token") ?? "");
    }
};

export default classScoreApi;
