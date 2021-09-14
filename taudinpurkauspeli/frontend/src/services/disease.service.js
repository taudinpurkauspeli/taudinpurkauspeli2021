import http from "../http-common";

class DiseaseDataService {
create(data) {
    return http.post("/diseases", data);
  }

  getAll() {
    return http.get("/diseases");
  }

  get(id) {
    return http.get(`/diseases/${id}`);
  }

  update(id, data) {
    return http.put(`/diseases/${id}`, data);
  }

  delete(id) {
    return http.delete(`/diseases/${id}`);
  }

  deleteAll() {
    return http.delete(`/diseases`);
  }

  findByTitle(title) {
    return http.get(`/diseases?title=${title}`);
  }
}

export default new DiseaseDataService();
