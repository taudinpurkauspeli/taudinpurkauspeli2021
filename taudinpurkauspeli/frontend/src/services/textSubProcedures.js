/* eslint-disable linebreak-style */
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/textSubProcedures';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

export default {
  getAll,
  create,
  update,
};
