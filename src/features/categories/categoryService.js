import http from "../../config/http-common";

class CategoryApiService {
  getAll() {
    return http.get("/categories/actions/read.php");
  }

  get(id) {
    return http.get(`/categories/actions/single_read.php?id=${id}`);
  }

  create(data) {
    return http.post("/categories/actions/create.php", data);
  }

  update(id, data) {
    return http.put(`/categories/actions/update.php?id=${id}`, data);
  }

  delete(id) {
    return http.delete(`/categories/actions/delete.php?id=${id}`);
  }

  deleteAll() {
    return http.delete(`/categories/actions/delete.php`);
  }

  findByTitle(title) {
    return http.get(`/categories/actions/search.php?title=${title}`);
  }
}

export default new CategoryApiService();