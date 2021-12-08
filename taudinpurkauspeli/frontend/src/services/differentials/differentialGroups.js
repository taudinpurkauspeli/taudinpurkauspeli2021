/* eslint-disable linebreak-style */
import axios from 'axios';
import { getConfig } from '../../utils/Helper';

const baseUrl = '/api/differentialGroups';

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
};
