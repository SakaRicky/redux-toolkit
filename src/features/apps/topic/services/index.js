import http from "../../../../config/http-common";

class TopicApiService {
  getAll() {
    return http.get("/topics/actions/read.php");
  }

  get(id) {
    return http.get(`/topics/actions/single_read.php?id=${id}`);
  }

  create(data) {
    return http.post("/topics/actions/create.php", data);
  }

  update(id, data) {
    return http.put(`/topics/actions/update.php?id=${id}`, data);
  }

  delete(id) {
    return http.delete(`/topics/actions/delete.php?id=${id}`);
  }

  deleteAll() {
    return http.delete(`/topics/actions/delete.php`);
  }

  findByTitle(title) {
    return http.get(`/topics/actions/search.php?title=${title}`);
  }
}

export default new TopicApiService();