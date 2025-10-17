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
const app = express();
app.use(express.json)//to access data easily
//The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object
app.get('/', (request, response) => {
  //Since the parameter is a string, Express automatically sets the value of the Content-Type header to be text/html
  response.send('<h1>hello world</h1>')
  //calling send makes the server respond to teh HTTP request by sending the specified string as response
})

//defines an event handler that handles HTTP GET requests made to the notes path of the application
app.get('/api/notes', (request, response) => {
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

app.get('/api/notes', (request, response) => {
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

app.post('/api/notes',(request,response)=>{
  const note = request.body
  console.log(note)
  response.json(note)
})