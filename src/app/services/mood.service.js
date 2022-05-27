import http from "../../http-common";
class MoodDataService {
  getAll() {
    return http.get("/moods");
  }
  findByUserId(data) {
    return http.post("/moods/findByUserId", data);
  }
  findByFollowing(data) {
    return http.post("/moods/findByFollowing", data);
  }
  get(id) {
    return http.get(`/moods/${id}`);
  }
  create(data) {
    return http.post("/moods", data);
  }
  update(id, data) {
    return http.put(`/moods/${id}`, data);
  }
  delete(id) {
    return http.delete(`/moods/${id}`);
  }
  deleteAll() {
    return http.delete(`/moods`);
  }
  findByTitle(title) {
    return http.get(`/moods?title=${title}`);
  }
  countMoods(data) {
    return http.post("/moods/countMoods", data);
  }
}
export default new MoodDataService();
