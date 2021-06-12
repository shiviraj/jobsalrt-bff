import {HTTP_CODES} from "../config/contstants/httpCodes";
import {CUSTOM_ERRORS} from "../config/contstants/customErrorCodes";

const isUnauthorized = error => (error.response && error.response.status === HTTP_CODES.UNAUTHORIZED) || false;


const isBadRequest = error => (error.response && error.response.status === HTTP_CODES.BAD_REQUEST) || false;

const getErrorResponse = error => {
  const {statusCode, message, additionalInfo} = error
  return {statusCode, message, ...(additionalInfo && {additionalInfo})}
}


const handleError = (error, res, errorObject) => {
  if (isUnauthorized(error)) {
    res.status(CUSTOM_ERRORS.UNAUTHORIZED.statusCode).send(CUSTOM_ERRORS.UNAUTHORIZED.message)
    return
  }

  if (isBadRequest(error)) {
    res.status(HTTP_CODES.BAD_REQUEST).send(getErrorResponse(errorObject))
    return
  }

  //TODO: Refactor. Temporarily handled.
  if (!errorObject) res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).end()
  else res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send(getErrorResponse(errorObject))
}

export {isUnauthorized, handleError, getErrorResponse}
