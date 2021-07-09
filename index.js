const express = require('express')
var mongoose = require('mongoose');
var cors = require('cors');
const port = 3000

const user = require('./user-service/routes/user-routs')
const detail = require('./user-service/routes/Details-routs')


mongoose.connect("mongodb://127.0.0.1:27017/happy", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true

}).then(() => {

    const bodyPaser = require('body-parser')
    const app = express()

    app.use(bodyPaser.json())
    app.use(bodyPaser.urlencoded({extends:true}))

    app.use('/user', user)
    app.use('/detail', detail)

    app.use(cors())

  app.listen(port, () => {
    console.log(`Happy Server Started..`)
  })
});