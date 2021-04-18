const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user')
const cinemaRouter = require('./routes/cinema')
const path = require('path')
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index') //render heandle bar templates
})

app.use(express.json())
app.use(userRouter)
app.use(cinemaRouter)


module.exports = app
