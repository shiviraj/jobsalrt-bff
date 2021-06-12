import {HTTP_CODES} from './httpCodes'

const CUSTOM_ERRORS = {
  [HTTP_CODES.INTERNAL_SERVER_ERROR]: {
    statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    message: 'Internal Server Error'
  },
  [HTTP_CODES.BAD_REQUEST]: {
    statusCode: HTTP_CODES.BAD_REQUEST,
    message: 'Bad Request'
  },
  UNAUTHORIZED: {
    statusCode: HTTP_CODES.UNAUTHORIZED,
    message: 'User not authorized'
  },
  TECHNICAL_ERROR: {
    statusCode: HTTP_CODES.INTERNAL_SERVER_ERROR,
    message: 'Due to some technical issues, we are currently unable to proceed with your request.'
  },
}


export {CUSTOM_ERRORS}
