import http from "../../http-common";
class MoodDataService {
  getAll() {
    return http.get("/moods");
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
}
export default new MoodDataService();
