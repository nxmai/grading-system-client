import { apiURL, get, post, patch, put, del } from "./generic";

const assignmentReviewApi = {
    createAssignmentReview(classId: any, data: any) {
        const url = `${apiURL}/${classId}/review/request`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
    getOneAssignmentReview(classId: any, assignmentId: any) {
        const url = `${apiURL}/${classId}/review/request/${assignmentId}`;
        return get(url, localStorage.getItem("token") ?? "");
    }
};

export default assignmentReviewApi;
