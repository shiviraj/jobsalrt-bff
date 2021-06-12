const crypto = require("crypto");

const algorithm = 'aes-256-ctr';
const AUTHORIZATION_HEADER = 'authorization'
const DISABLE_ENCRYPTION_HEADER = 'disable-encryption'

const getSecretKey = (authToken) => {
  return authToken.slice(0, 32)
};

const encryptRequestPayload = (key, iv, params) => {
  params = JSON.stringify(params)
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(params), cipher.final()]);
  return encrypted.toString('hex')
};

const decryptResponseObject = (key, iv, content) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const contentBuffer = Buffer.from(content, 'hex');
  const decrypted = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);
  const str = decrypted.toString();
  return JSON.parse(str)
};

const initCrypto = (key, iv) => {
  return {
    encrypt: encryptRequestPayload.bind(null, key, iv),
    decrypt: decryptResponseObject.bind(null, key, iv)
  }
}

const encryptResponsePayload = (res, key, iv) => {
  const {encrypt} = initCrypto(key, iv)
  const send = res.send

  res.send = function (responseBody) {
    const payload = JSON.stringify({payload: encrypt(responseBody)})
    send.call(this, payload)
  }
};

const decryptRequestObject = (req, key, iv) => {
  const {decrypt} = initCrypto(key, iv)
  const payload = req.body && req.body.payload
  if (!payload) return
  req.body = decrypt(payload)
};


const isAuthTokenPresent = req => !!req.headers[AUTHORIZATION_HEADER]
const isEncryptionEnabled = req => !req.headers[DISABLE_ENCRYPTION_HEADER]

const initEncryption = (req, res, next) => {
  if (isAuthTokenPresent(req) && isEncryptionEnabled(req)) {
    const authToken = req.headers[AUTHORIZATION_HEADER]
    const iv = Buffer.from(req.headers['iv'], 'hex')
    const secretKey = getSecretKey(authToken)
    decryptRequestObject(req, secretKey, iv)
    encryptResponsePayload(res, secretKey, iv)
  }
  next()
}

export {initEncryption};

