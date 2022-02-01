/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig, getLanguage } from '../../utils/Helper';

const baseUrl = '/api/differentialGroups';

const getAll = () => {
  const request = axios.get(`${baseUrl}/${getLanguage()}`, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/${getLanguage()}`, newObject, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
};
