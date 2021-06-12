import {filterSensitiveHeaders, getTimestamp} from "./utils"
import {HTTP_CODES} from "../config/contstants/httpCodes";
import {isUnauthorized} from "../utils/errorHandlers";

const getErrorAttributes = e => ({
  message: (e.response && e.response.data && e.response.data.message) || e.message,
  responseCode: e.response && e.response.status,
  stackTrace: e.stack
})


const error = (error = {}, message = '', details = {}) => {
  try {
    const timestamp = getTimestamp()
    console.log(
      JSON.stringify({
        timestamp,
        level: 'ERROR',
        details: {message, ...details, error: getErrorAttributes(error)}
      })
    )
  } catch (newError) {
    error(newError, 'Error while logging ERROR log', details)
  }
};


const info = (message = '', details = {}) => {
  const timestamp = getTimestamp()
  try {
    console.log(
      JSON.stringify({
        timestamp,
        level: 'INFO',
        details: {message, ...details}
      })
    )
  } catch (e) {
    error(e, 'Error while logging INFO log', details)
  }
};

const logAPIError = (request, errorResponse, customError, additionalDetails) => {

  const statusCode = (errorResponse.response && errorResponse.response.status) || customError.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR
  const isTechnicalError = statusCode === HTTP_CODES.BAD_REQUEST

  const details = {customError, ...additionalDetails}

  if (isUnauthorized(errorResponse) || !isTechnicalError) {
    info(customError.message, {details: {...details, error: getErrorAttributes(errorResponse)}})
    return
  }

  error(errorResponse, customError.message, details)
};

const requestInfo = request => {
  try {
    const timestamp = getTimestamp()
    // TODO need to think about if authorization is failed
    const headers = filterSensitiveHeaders(request.headers)

    console.log(
      JSON.stringify({
        timestamp,
        level: 'INFO',
        details: {
          message: 'Service Call Request',
          requestMethod: request.method,
          uriWithParams: request.url,
          invocationTime: timestamp,
          requestHeaders: headers
        }
      })
    )
  } catch (e) {
    error(e, 'Error while logging requestInfo', {},)
  }
};

const responseInfo = response => {
  try {
    const timestamp = getTimestamp()
    const requestHeaders = filterSensitiveHeaders(response.config.headers)

    console.log(
      JSON.stringify({
        timestamp,
        level: 'INFO',
        details: {
          message: 'Service Call Response',
          requestMethod: response.config.method,
          requestHeaders,
          uriWithParams: JSON.stringify(response.config.url),
          invocationTime: timestamp,
          responseCode: response.status,
          responseStatus: response.statusText,
          responseHeaders: response.headers,
          performance: {
            responseTime: response.config.responseTime
          }
        }
      })
    )
  } catch (e) {
    error(e, 'Error while logging responseInfo', {})
  }
};

export default {info, logAPIError, requestInfo, responseInfo}
