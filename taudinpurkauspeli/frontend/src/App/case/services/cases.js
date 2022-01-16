/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig } from '../../../utils/Helper';

const baseUrl = '/api/cases';

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (newObject) => axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig());

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  remove,
};
