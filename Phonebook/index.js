//server.js file, starts the http server, deals with env setup
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//starting the server
app.listen(config.PORT, () => {
  logger.info(`Server running on ${config.PORT}`)
})

//const http = require("http"); //node's build in web-server module
// let notes = [
//   {
//     id: "1",
//     content: "HTML is easy",
//     important: true
//   },
//   {
//     id: "2",
//     content: "Browser can execute only JavaScript",
//     important: false
//   },
//   {
//     id: "3",
//     content: "GET and POST are the most important methods of HTTP protocol",
//     important: true
//   }
// ]
//const http = require("http"); //node's build in web-server module
//An event handler is registered to the new server that is called every time an HTTP request is made to the server's address
// const app = http.createServer((request, response)=>{
// //the request is responded to with the status code 200, with the Content-Type header set to text/plain, and the content of the site to be returned set to Hello World.
//
//   response.writeHead(200, {'Content-Type': 'text/plain'})
//   response.end(JSON.stringify(notes))
// })
//
// //binds the http server assigned to the app variable, to listen to HTTP requests sent to port 3001:
// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on ${PORT}`)
//require('dotenv').config()
// const config= require('./utils/config')
// const logger = require('./utils/logger')
// //const Note = require('./models/note.js')
// const Persons = require('./models/persons.js')
// const express = require('express');
// const morgan = require('morgan')
// const cors = require('cors')
//
// const app = express();
//The json-parser takes the JSON data of a request,
//transforms it into a JavaScript object and then attaches it to the body property of the request object
//app.use(express.json())
// app.use(morgan('tiny'))
// morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
//custom middleware, next function yields/passes control to the next middleware
//json-parser needs to be listed before requestLogger or request.body wont be initialized
// const requestLogger = (request, response,next)=>{
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)
// app.use(cors())
// app.use(express.static('dist'))
// app.get('/', (request, response) => {
//   //Since the parameter is a string, Express automatically sets the value of the Content-Type header to be text/html
//   //status defaults to 200
//   response.send('<h1>hello world</h1>')
//   //calling send makes the server respond to teh HTTP request by sending the specified string as response
// })
//defines a route event handler that handles HTTP GET requests made to the notes path of the application
// app.get('/api/notes', (request, response) => {
//   //response.json(notes) //was using the local var
//   Note.find({}).then(notes=>{
//     response.json(notes)
//   })
// })
//
// app.get('/api/notes/:id', (request, response) => {
//   // const id = request.params.id
//   // const note = notes.find(note => note.id === id)
//   // if (note) {
//   //   response.json(note)
//   // } else {
//   //   response.statusMessage = 'resource doesn\'t exist'
//   //   // response.status(404).end()
//   //   response.status(404)
//   //   response.send('resource doesn\'t exist')
//   // }
//
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch((error) => next(error))
//
// })
//
// app.delete('/api/notes/:id', (request, response) => {
//   // const id = request.params.id
//   // notes = notes.filter(note => note.id !== id)
//   // response.status(204).end();//204 no content
//   Note.findByIdAndDelete(request.params.id)
//     .then((result) => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
// })
// const generateId = (stuff)=>{
//   const maxId = stuff.length > 0 ?
//     Math.max(...stuff.map(n=> Number(n.id))) : 0
//
//   return String(maxId + 1)
// }
// app.post('/api/notes',(request,response,next)=>{
//   //json-parser takes json data of a req transforms thats in a js obj,
//   //attaches it to the body of req before route handler is called
//   const body = request.body
//
//   if(!body.content){
//     return response.status(400).json({
//       error: 'content missing'
//     })
//   }
//   // const note = {
//   //   content: body.content,
//   //   important: body.important || false,
//   //   id: generateId(notes)
//   // }
//   // notes = notes.concat(note)
//   // console.log(note)
//   // response.json(note)
//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })
//
//   note.save().then((savedNote) => {
//     response.json(savedNote)
//   }).catch(error=> next(error))
//
// })
// app.put('/api/notes/:id', (request, response, next) => {
//   const { content, important } = request.body
//
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (!note) {
//         return response.status(404).end()
//       }
//
//       note.content = content
//       note.important = important
//
//       return note.save().then((updatedNote) => {
//         response.json(updatedNote)
//       })
//     })
//     .catch((error) => next(error))
// })
//phonebook
// app.get('/api/persons',(request,response)=>{
//   Persons.find({}).then(persons=>{
//     response.json(persons)
//   })
// })
// app.get('/info',(request,response)=>{
//   // const personCount = persons.length
//   // response.send(`<p>Phonebook has info for ${personCount} people.</p><br><p>${new Date()}</p>`)
//   console.log('req')
//   Persons.find({}).then(persons=>{
//     console.log(persons.length)
//     //response.json(persons)
//     response.send(`<p>Phonebook has info for ${persons.length} people.</p><br><p>${new Date()}</p>`)
//   }).catch(error => {
//     console.error(error)
//     response.status(500).send('Error fetching data')
//   })
// })
// app.get('/api/persons/:id',(request,response)=>{
//   Persons.findById(request.params.id)
//     .then((person) => {
//       if (person) {
//         response.json(person)
//       } else {
//         response.status(404).end()
//       }
//     })
//     .catch((error) => next(error))
// })
// app.delete('/api/persons/:id', (request, response) => {
//   Persons.findByIdAndDelete(request.params.id)
//     .then((result) => {
//       response.status(204).end()
//     })
//     .catch((error) => next(error))
// })
// app.post('/api/persons',(request,response,next)=>{
//   const body = request.body
//
//   if(!body.name || !body.number){
//     return response.status(400).json({
//       error: 'content missing'
//     })
//   }
//
//   const person = new Persons({
//     name: body.name,
//     number: body.number,
//   })
//
//   person.save().then((savedPerson) => {
//     response.json(savedPerson)
//   }).catch((error) => next(error))
// })
// app.put('/api/persons/:id', (request, response, next) => {
//   const { name, number} = request.body
//
//   Persons.findById(request.params.id)
//     .then((person) => {
//       if (!person) {
//         return response.status(404).end()
//       }
//
//       person.name = name
//       person.number = number
//
//       return person.save().then((updatedPerson) => {
//         response.json(updatedPerson)
//       })
//     })
//     .catch((error) => next(error))
// })
//middlewares after routes if no handler is there to process the HTTP request
//catches requests made to no-existing routes
// const unknownEndpoint = (request, response)=>{
//   response.status(404).send({error: 'unknown endpoint'})
// }
// app.use(unknownEndpoint)
// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)
//
//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' })
//   }else if(error.name === 'ValidationError'){
//     return response.status(400).json({error: error.message})
//   }
//
//  //all other error situations, the middleware passes the error forward to the default Express error handler.
//   next(error)
// }
// this has to be the last loaded middleware, also all the routes should be registered before this!
// app.use(errorHandler)
// const PORT = config.PORT