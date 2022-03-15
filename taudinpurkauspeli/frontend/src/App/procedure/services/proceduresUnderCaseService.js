/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig, getLanguage } from '../../../utils/Helper';

const baseUrl = '/api/proceduresUnderCases';

const getAll = (caseId) => {
  const request = axios.get(`${baseUrl}/${caseId}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject, getConfig());

const remove = (id) => axios.delete(`${baseUrl}/${id}`, getConfig());

export default {
  getAll,
  create,
  update,
  remove,
};
