/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig, getLanguage } from '../../utils/Helper';

const baseUrl = '/api/textSubProcedures';

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}/${getLanguage()}`, newObject, getConfig());

export default {
  getAll,
  create,
  update,
};
