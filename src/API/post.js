import apiAdapter from './utils/apiAdapter'
import env from '../config/envConfig'

const API = apiAdapter(`${env.JOBSALRT_ADMIN_BASE_URL}`)

const BASE_PATH = '/post'

const Post = {
  getPostByUrl(url) {
    return API.get(`${BASE_PATH}/${url}`);
  },
  updateViewsByUrl(url) {
    return API.get(`${BASE_PATH}/${url}/update-views`);
  },
}

export {Post}
