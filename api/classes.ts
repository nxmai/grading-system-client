import { apiURL, get, post } from "./generic";

const classApi = {
  getAllClasses(){
    const url=`${apiURL}`;
    return get(url);
  },
  createClass(classData: any){
    const url=`${apiURL}`;
    return post(url, classData);
  },
};

export default classApi;
