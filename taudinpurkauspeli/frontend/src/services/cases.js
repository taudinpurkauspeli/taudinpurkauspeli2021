/* eslint-disable linebreak-style */
import axios from 'axios';

const baseUrl = 'http://localhost:8081/api/cases';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    // eslint-disable-next-line no-console
    console.log('frontend headers', response.headers);
    return (response.data);
  });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject);

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
};
