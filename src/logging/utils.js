const getTimezone = offset => {
  const t1 = Math.abs(offset / 60)
  const hrs = Math.floor(t1)
  const minutes = (t1 - hrs) * 60
  return `${offset < 0 ? '+' : '-'}${hrs < 10 ? '0' : ''}${hrs}:${minutes < 10 ? '0' : ''}${minutes}`
};

const getTimestamp = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const time = `${[now.getHours(), now.getMinutes(), now.getSeconds()].join(':')}.${now.getMilliseconds()}`
  const timezone = getTimezone(now.getTimezoneOffset())
  return `${year}-${month < 10 ? '0' : ''}${month}-${date < 10 ? '0' : ''}${date}T${time}${timezone}`
};

const filterSensitiveHeaders = headers => {
  const {Authorization, authorization, ...rest} = headers
  return rest
};


export {getTimestamp, filterSensitiveHeaders}
