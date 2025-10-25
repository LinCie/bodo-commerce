import { env } from "#utilities/env.js"
import express from "express"

const app = express()
const port = env.PORT

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
