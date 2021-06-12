const HEADERS_TO_FORWARD = [
  /authorization/i,
  /login-source/,
  /X-Real-Ip/,
]

const matchHeader = key => HEADERS_TO_FORWARD.find(header => header.test(key))

const filterHeaders = headers => {
  const headersToPass = {}
  Object.keys(headers).forEach(key => {
    if (matchHeader(key)) {
      headersToPass[key] = headers[key]
    }
  })
  return headersToPass
}


export {filterHeaders}
