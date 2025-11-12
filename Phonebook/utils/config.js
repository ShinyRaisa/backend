//handling environment variables
require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI_PERSONS = process.env.MONGODB_URI_PERSONS

module.exports = { MONGODB_URI_PERSONS, PORT}