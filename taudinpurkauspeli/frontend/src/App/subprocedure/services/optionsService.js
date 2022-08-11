import axios from 'axios';
import { getConfig, getLanguage } from '../../../utils/Helper';

const baseUrl = '/api/options';

const getAll = () => {
  const request = axios.get(`${baseUrl}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}/${getLanguage()}`, newObject, getConfig());

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  remove,
  update,
};
