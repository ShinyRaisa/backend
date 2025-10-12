const http = require("http"); //node's build in web-server module
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
//An event handler is registered to the new server that is called every time an HTTP request is made to the server's address
const app = http.createServer((request, response)=>{
//the request is responded to with the status code 200, with the Content-Type header set to text/plain, and the content of the site to be returned set to Hello World.

  response.writeHead(200, {'Content-Type': 'text/plain'})
  response.end(JSON.stringify(notes))
})

//binds the http server assigned to the app variable, to listen to HTTP requests sent to port 3001:
const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)