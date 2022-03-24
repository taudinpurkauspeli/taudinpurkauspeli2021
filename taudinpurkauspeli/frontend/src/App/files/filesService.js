import axios from 'axios';
import { getConfig, getLanguage } from '../../utils/Helper';

const baseUrl = '/api/files';

const getPrivacyNotice = () => {
  const config = getConfig();
  config.responseType = 'arraybuffer';
  const request = axios.get(`${baseUrl}/${getLanguage()}`, config);
  return request.then((response) => response.data);
};

export default {
  getPrivacyNotice,
};
