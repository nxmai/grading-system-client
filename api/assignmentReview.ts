import { apiURL, get, post, patch, put, del } from "./generic";

const assignmentReviewApi = {
    createAssignmentReview(classId: any, data: any) {
        const url = `${apiURL}/${classId}/review/request`;
        return post(url, data, localStorage.getItem("token") ?? "");
    },
};

export default assignmentReviewApi;
