/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig } from '../../utils/Helper';

const baseUrl = '/api/proceduresUnderCases';

const getAll = (caseId) => {
  const request = axios.get(`${baseUrl}/${caseId}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject, getConfig());

export default {
  getAll,
  create,
  update,
};
