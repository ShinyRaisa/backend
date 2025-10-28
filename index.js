//const http = require("http"); //node's build in web-server module
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]
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

const express = require('express');
const morgan = require('morgan')
const cors= require('cors')

const app = express();
//The json-parser takes the JSON data of a request,
//transforms it into a JavaScript object and then attaches it to the body property of the request object
app.use(express.json())

app.use(morgan('tiny'))
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

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
app.use(cors())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  //Since the parameter is a string, Express automatically sets the value of the Content-Type header to be text/html
  //status defaults to 200
  response.send('<h1>hello world</h1>')
  //calling send makes the server respond to teh HTTP request by sending the specified string as response
})

//defines a route event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.statusMessage = 'resource doesn\'t exist'
    // response.status(404).end()
    response.status(404)
    response.send('resource doesn\'t exist')
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)
  response.status(204).end();//204 no content
})

const generateId = (stuff)=>{
  const maxId = stuff.length > 0 ?
    Math.max(...stuff.map(n=> Number(n.id))) : 0

  return String(maxId + 1)
}
app.post('/api/notes',(request,response)=>{
  //json-parser takes json data of a req transforms thats in a js obj,
  //attaches it to the body of req before route handler is called
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes)
  }
  notes = notes.concat(note)
  console.log(note)
  response.json(note)
})




//phonebook
let persons= [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons',(request,response)=>{
  response.json(persons)
})
app.get('/info',(request,response)=>{
  const personCount = persons.length
  response.send(`<p>Phonebook has info for ${personCount} people.</p><br><p>${new Date()}</p>`)
})
app.get('/api/persons/:id',(request,response)=>{
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = 'resource doesn\'t exist'
    // response.status(404).end()
    response.status(404)
    response.send('resource doesn\'t exist')
  }
})
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)
  response.send('deleted')
  response.status(204).end();//204 no content
})
app.post('/api/persons',(request,response)=>{
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if(persons.find(p=> p.name.includes(body.name))){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(persons)
  }
  persons = persons.concat(person)

  response.json(person)
})

//middlewares after routes if no handler is there to process the HTTP request
//catches requests made to no-existing routes
const unknownEndpoint = (request, response)=>{
  response.status(404).send({error: 'unknown endpoint'})
}
app.use(unknownEndpoint)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})