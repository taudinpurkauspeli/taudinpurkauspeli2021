import axios from 'axios';
import { getConfig, getLanguage } from '../../../utils/Helper';

const baseUrl = '/api/optionsUnderSubProcedures';

const getAll = (id) => {
  const request = axios.get(`${baseUrl}/${id}/INTERVIEW/${getLanguage()}`, getConfig());
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
