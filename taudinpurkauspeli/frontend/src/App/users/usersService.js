import axios from 'axios';
import { getConfig } from '../../utils/Helper';

const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl, getConfig());
  return request.then((response) => response.data);
};

export default {
  getAll,
};
