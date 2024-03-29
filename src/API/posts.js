import apiAdapter from './utils/apiAdapter'
import env from '../config/envConfig'

const API = apiAdapter(`${env.JOBSALRT_ADMIN_BASE_URL}`)

const BASE_PATH = '/posts'

const Posts = {
  getPosts(page, payload) {
    return API.post(`${BASE_PATH}/page/${page}`, payload);
  },

  getPostsWithUrls(payload) {
    return API.post(`${BASE_PATH}`, payload);
  },

  getPageCount(payload) {
    return API.post(`${BASE_PATH}/page-count`, payload);
  },

  getOptions(payload) {
    const key = Object.keys(payload)[0]
    return API.get(`${BASE_PATH}/options/${key}/${payload[key]}`);
  },

  getSearchOptions(payload) {
    return API.get(`${BASE_PATH}/search-options/${payload}`);
  },

}

export {Posts}
