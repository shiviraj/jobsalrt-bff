import app from './app'
import axios from "axios";

const BFF_PORT = process.env.PORT || 3001
const BFF_HOST = "localhost"

app.listen(BFF_PORT, () => {
  const url = `http://${BFF_HOST}:${BFF_PORT}`
  console.log(`BFF server is ready at: ${url} 🔥🔥🔥`)
})

setInterval(() => {
  axios.get("https://www.jobsalrt.com/").then()
  axios.get("http://jobsalrt-bff.herokuapp.com/").then()
  axios.get("http://jobsalrt-backend.herokuapp.com/").then()
}, 600000)
