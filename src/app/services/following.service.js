import http from "../../http-common";
class FollowingDataService {
  getAll() {
    return http.get("/moods");
  }
  getFollowingCount(data) {
    return http.post("/followers/countFollowing", data);
  }
  getFollowersCount(data) {
    return http.post("/followers/countFollowers", data);
  }
  follow(data) {
    return http.post("/followers/follow", data);
  }
  unfollow(data) {
    return http.post("/followers/unfollow", data);
  }
}
export default new FollowingDataService();