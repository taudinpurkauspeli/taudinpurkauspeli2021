import axios from 'axios';
import { getConfig, getLanguage } from '../../../utils/Helper';

const baseUrl = '/api/differentialsUnderCases';

const getAll = (diffGroupCaseId) => {
  const request = axios.get(`${baseUrl}/${diffGroupCaseId}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

const update = (id, newObject) => axios.put(`${baseUrl}/${id}/${getLanguage()}`, newObject, getConfig());

const remove = (diffGroupCaseId, differentialId) => axios.delete(`${baseUrl}/${diffGroupCaseId}/${differentialId}`, getConfig());

export default {
  getAll,
  create,
  update,
  remove,
};
