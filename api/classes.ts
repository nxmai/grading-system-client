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
};

export default classApi;
