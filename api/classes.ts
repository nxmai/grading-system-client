import { apiURL, get, post } from "./generic";

const classApi = {
  getAllClasses() {
    const url = `${apiURL}`;
    return get(url, "");
    // TODO add token
  },
  createClass(classData: any) {
    const url = `${apiURL}`;
    return post(url, classData);
  },
  getTeachersInClass(classId: any) {
    const url = `${apiURL}/${classId}/people/teacher`;
    return get(url, "");
  },
  getStudentsInClass(classId: any) {
    const url = `${apiURL}/${classId}/people/student`;
    return get(url, "");
  },
  getClassById(classId: any) {
    const url = `${apiURL}/${classId}`;
    return get(url, "");
  }, 
};

export default classApi;
