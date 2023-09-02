const express = require('express')
const app = express()
const port = 3000

// Send to router
const router = require('./src/router')

app.use('/api', router,
  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
  }
)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})