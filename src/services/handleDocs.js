import https from "https";

const getSource = url => {
  if (url.startsWith("/skr")) return "https://sarkariresults.info"
  if (url.startsWith("/rjr")) return "https://sarkari.rojgarresult.com"
  if (url.startsWith("/jsk")) return "https://jobsarkari.com"
  return ""
}

const handleDocs = (req, res) => {
  https.get(`${getSource(req.originalUrl)}${req.path}`, (response) => {
    const data = []
    response.on("data", chunk => data.push(chunk))
    response.on("end", () => {
      Object.keys(response.headers).forEach(header => {
        res.setHeader(header, (response.headers)[header]);
      })
      res.end(Buffer.concat(data));
    })
  })
}


export default handleDocs
