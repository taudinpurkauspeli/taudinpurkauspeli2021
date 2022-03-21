import axios from 'axios';
import { getLanguage } from '../../utils/Helper';

const baseUrl = '/api/files';

const getPrivacyNotice = () => (
  axios({
    method: 'get',
    url: `${baseUrl}/${getLanguage()}`,
    responseType: 'arraybuffer',
  }).then((r) => r.data)
  // const request = axios.get(`${baseUrl}/${getLanguage()}`, getConfig());
  // return request.then((response) => response.data);
);

export default {
  getPrivacyNotice,
};
