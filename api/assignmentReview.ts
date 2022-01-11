import { apiURL, get, post, patch, put, del } from "./generic";

const assignmentReviewApi = {
    createAssignmentReview(classId: any, data: any) {
        const url = `${apiURL}/${classId}/review/request`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    getOneAssignmentReview(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getAllReviewRequestsInOneAssignment(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/get-all`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getOneAssignmentReviewRequest(classId: any, assignmentId: any, classStudentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/get-one/${classStudentId}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    getReviewChatByReviewRequestId(classId: any, assignmentId: any, reviewRequestId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/chat/${reviewRequestId}`;
        return get(url, localStorage.getItem("token") ?? "");
    },
    createReviewChat(classId: any, assignmentId: any, reviewRequestId: any, content: string) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/chat/${reviewRequestId}`;
        return post(url, {content}, localStorage.getItem("token") ?? "");
    },
    acceptScoreRequestByStudent(classId: any, assignmentId: any, classStudentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/accept-score/${classStudentId}`;
        return put(url, {}, localStorage.getItem("token") ?? "");
    },
    ignoreScoreRequestByStudent(classId: any, assignmentId: any, classStudentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}/ignore-score/${classStudentId}`;
        return put(url, {}, localStorage.getItem("token") ?? "");
    }
};

export default assignmentReviewApi;
