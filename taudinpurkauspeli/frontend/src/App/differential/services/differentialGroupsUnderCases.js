/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig, getLanguage } from '../../../utils/Helper';

const baseUrl = '/api/differentialGroupsUnderCases';

const getAll = (caseId) => {
  const request = axios.get(`${baseUrl}/${caseId}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}`, newObject, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
};
