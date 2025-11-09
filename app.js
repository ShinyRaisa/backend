const express = require('express')
const mongoose = require('mongoose')
const config= require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')

const app = express()

logger.info('connecting to ', config.MONGODB_URI_NOTES)

mongoose.connect