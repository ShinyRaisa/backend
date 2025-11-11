const logger = require('./logger')

//middlewares after routes if no handler is there to process the HTTP request
//catches requests made to no-existing routes
const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  //all other error situations, the middleware passes the error forward to the default Express error handler.
  next(error)
}

//custom middleware, next function yields/passes control to the next middleware
//json-parser needs to be listed before requestLogger or request.body wont be initialized
const requestLogger = (request, response,next)=>{
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

module.exports = { unknownEndpoint, errorHandler, requestLogger}