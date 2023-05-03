require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port: string | 3001 = process.env.PORT || 3001

app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})