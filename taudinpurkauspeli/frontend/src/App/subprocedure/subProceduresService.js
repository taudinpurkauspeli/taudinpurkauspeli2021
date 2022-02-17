/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig, getLanguage } from '../../utils/Helper';

const baseUrl = '/api/subProcedures';

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}/${getLanguage()}`, newObject, getConfig());

export default {
  create,
  getAll,
  update,
};
