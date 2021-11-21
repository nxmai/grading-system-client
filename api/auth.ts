import { apiURL, get, post } from "./generic";

const authApi = {
  register(userData: any){
    const url=`${apiURL}/auth/register`;
    return post(url, userData);
  },
  login(userData: any){
    const url=`${apiURL}/auth/login`;
    return post(url, userData);
  },
  googleAuth(userData: any){
    const url=`${apiURL}/auth/google`;
    return post(url, userData);
  },
  // logout(){
  //   const url=`${apiURL}/auth/logout`;
  //   return get(url);
  // },
};

export default authApi;
