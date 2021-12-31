import { apiURL, get, post, postWithFile, downloadFile, patch, put, del } from "./generic";

const classScoreApi = {
    getStudentsInClass(classId: any) {
        const url = `${apiURL}/${classId}/score/student/list`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    downloadTemplateListStudentId(classId: any) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return downloadFile(url, localStorage.getItem("token") ?? "");
    },
    uploadStudentList(classId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/student/file`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    getScoreByClassIdByStudentId(classId: any, studentId: any) {
        const url = `${apiURL}/${classId}/score/student/${studentId}`;
        return get(url, localStorage.getItem("token") ?? "");
    },

    downloadFullTable(classId: any) {
        const url = `${apiURL}/${classId}/score/full/file`;
        return downloadFile(url, localStorage.getItem("token") ?? "");
    },

    uploadScoreByAssignmentId(classId: any, assignmentId: any, data: FormData) {
        const url = `${apiURL}/${classId}/score/class-score/assignment/${assignmentId}/file`;
        return postWithFile(url, data, localStorage.getItem("token") ?? "");
    },
    downloadScoreTemplateByAssignmentId(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/score/class-score/assignment/${assignmentId}/file`;
        return downloadFile(url, localStorage.getItem("token") ?? "");
    },
    markReturnedByAssignmentId(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/score/class-score/assignment/${assignmentId}/mark-returned-all`;
        return downloadFile(url, localStorage.getItem("token") ?? "");
    },

    getAssignmentScoreByClassId(classId: any) {
        const url = `${apiURL}/${classId}/score`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    
    createOneClassScore(classId: any, data: any) {
        const url = `${apiURL}/${classId}/score/class-score`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    updateOneClassScore(classId: any, classScoreId: any, data: any) {
        const url = `${apiURL}/${classId}/score/class-score/${classScoreId}`;
        return put(url, data, localStorage.getItem("token") ?? "");
    },
    createOneClassScoreDraft(classId: any, data: any) {
        const url = `${apiURL}/${classId}/score/class-score/draft`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    updateOneClassScoreDraft(classId: any, classScoreId: any, data: any) {
        const url = `${apiURL}/${classId}/score/class-score/draft/${classScoreId}`;
        return put(url, data, localStorage.getItem("token") ?? "");
    }
};

export default classScoreApi;
