/* eslint-disable linebreak-style */
import axios from 'axios';

const baseUrl = '/api/procedures';

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
