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
  update(id, data) {
    return http.put(`/likes/${id}`, data);
  }
  delete(id) {
    return http.delete(`/likes/${id}`);
  }
  deleteAll() {
    return http.delete(`/likes`);
  }
  findByMoodId(data) {
    return http.post(`/likes/byMoodId`, data);
  }
  async findByUserId(data) {
    return await http.post(`/likes/findByUserId`, data);
  }
}
export default new LikeDataService();