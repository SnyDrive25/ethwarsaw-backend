const express = require('express')
const app = express()
const port = 3000

// Send to router
const router = require('./src/router')

const cors = require('cors')
app.use(cors({origin: '*'}))

app.use('/api', router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})