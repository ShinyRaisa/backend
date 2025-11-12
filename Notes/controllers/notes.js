//The module exports the router to be available for all consumers of the module
//The router is a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.
const notesRouter = require('express').Router()
const Note = require('../models/note')

//defines a route event handler that handles HTTP GET requests made to the notes path of the application
notesRouter.get('/', (request, response) => {
  //response.json(notes) //was using the local var
  Note.find({}).then(notes=>{
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response) => {
  // const id = request.params.id
  // const note = notes.find(note => note.id === id)
  // if (note) {
  //   response.json(note)
  // } else {
  //   response.statusMessage = 'resource doesn\'t exist'
  //   // response.status(404).end()
  //   response.status(404)
  //   response.send('resource doesn\'t exist')
  // }

  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))

})

notesRouter.delete('/:id', (request, response) => {
  // const id = request.params.id
  // notes = notes.filter(note => note.id !== id)
  // response.status(204).end();//204 no content
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const generateId = (stuff)=>{
  const maxId = stuff.length > 0 ?
    Math.max(...stuff.map(n=> Number(n.id))) : 0

  return String(maxId + 1)
}
notesRouter.post('/',(request,response,next)=>{
  //json-parser takes json data of a req transforms thats in a js obj,
  //attaches it to the body of req before route handler is called
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }
  // const note = {
  //   content: body.content,
  //   important: body.important || false,
  //   id: generateId(notes)
  // }
  // notes = notes.concat(note)
  // console.log(note)
  // response.json(note)
  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  }).catch(error=> next(error))

})
notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch((error) => next(error))
})

module.exports = notesRouter

