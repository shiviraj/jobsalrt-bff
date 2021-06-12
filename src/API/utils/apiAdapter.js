import axios from 'axios'
import httpContext from 'express-http-context'
import logger from '../../logging/logger'

const addHeaders = req => {
  const headersToPass = httpContext.get('headers')
  req.headers = {...req.headers, ...headersToPass}
};

const addRequestStartedAtHeader = req => {
  req.requestStartedAt = new Date().getTime()
};

const addResponseTimeHeader = res => {
  res.config = {
    ...res.config,
    responseTime: new Date().getTime() - res.config.requestStartedAt
  }
};

const adapter = (baseURL = 'http://localhost:8080') => {
  const api = axios.create({baseURL})

  api.interceptors.request.use(request => {
    addHeaders(request)
    addRequestStartedAtHeader(request)
    logger.requestInfo(request)
    return request
  })

  api.interceptors.response.use(response => {
    addResponseTimeHeader(response)
    logger.responseInfo(response)

    return response;
  })

  return api
};

export default adapter
