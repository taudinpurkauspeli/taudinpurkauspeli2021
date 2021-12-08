/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig } from '../utils/Helper';

const baseUrl = '/api/subProcedures';

const getAllId = (id) => {
  const request = axios.get(`${baseUrl}/${id}`, getConfig());
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject, getConfig());

export default {
  create,
  getAllId,
  getAll,
  update,
};
