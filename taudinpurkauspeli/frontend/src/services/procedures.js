import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/procedures';

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

export default {
  create,
  getAll,
  update,
};
