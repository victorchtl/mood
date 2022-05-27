import http from "../../http-common";
class LikeDataService {
  getAll() {
    return http.get("/likes");
  }
  get(id) {
    return http.get(`/likes/${id}`);
  }
  create(data) {
    return http.post("/likes", data);
  }
  dislike(data) {
    return http.put(`/likes/dislike`, data);
  }
  updateLike(data) {
    return http.put(`/likes/updateLike`, data);
  }
  delete(id) {
    return http.delete(`/likes/${id}`);
  }
  deleteAll() {
    return http.delete(`/likes`);
  }
  findByMoodId(data) {
    return http.post(`/likes/findByMoodId`, data);
  }
  findByUserId(data) {
    return http.post(`/likes/findByUserId`, data);
  }
  findByUserAndMoodId(data) {
    return http.post(`/likes/findByUserAndMoodId`, data);
  }
}
export default new LikeDataService();