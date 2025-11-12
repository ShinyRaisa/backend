//express app, sets up middlewares, routes
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/notes')

const app = express()

logger.info('connecting to ', config.MONGODB_URI_NOTES)

mongoose.connect(config.MONGODB_URI_NOTES).then(result => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

//this router is only used if teh url of the req starts with /api/notes
app.use('/api/notes', notesRouter)
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app