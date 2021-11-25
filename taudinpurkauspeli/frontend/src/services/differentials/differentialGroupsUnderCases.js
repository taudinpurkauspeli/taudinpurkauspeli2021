/* eslint-disable linebreak-style */
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/differentialGroupsUnderCases';

const getAll = (caseId) => {
  const request = axios.get(`${baseUrl}/${caseId}`);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
};
