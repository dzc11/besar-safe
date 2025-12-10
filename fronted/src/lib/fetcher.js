import axios from 'axios';
export default function fetcher(url, opts = {}) {
  return axios(url, opts).then(res => res.data);
}
