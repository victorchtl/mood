import http from "../../http-common";
class AuthDataService {
    register(data) {
        return http.post("/auth/signup", data);
    }
    signin(data) {
        return http.post("/auth/signin", data)
        
    }
    signout() {
        return http.post("/auth/signout");
    }

}
export default new AuthDataService();

