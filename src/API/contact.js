import apiAdapter from './utils/apiAdapter'
import env from '../config/envConfig'

const API = apiAdapter(`${env.JOBSALRT_ADMIN_BASE_URL}`)

const BASE_PATH = '/contact'

const Contact = {
  save(payload) {
    return API.post(BASE_PATH, payload);
  },
}

export {Contact}
