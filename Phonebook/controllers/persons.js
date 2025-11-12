//The module exports the router to be available for all consumers of the module
//The router is a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.
const personsRouter = require('express').Router()
const Persons = require('../models/persons')

//defines a route event handler that handles HTTP GET requests made to the persons path of the personsRouterlication
personsRouter.get('/',(request,response)=>{
  Persons.find({}).then(persons=>{
    response.json(persons)
  })
})
personsRouter.get('/info',(request,response)=>{
  // const personCount = persons.length
  // response.send(`<p>Phonebook has info for ${personCount} people.</p><br><p>${new Date()}</p>`)
  console.log('req')
  Persons.find({}).then(persons=>{
    console.log(persons.length)
    //response.json(persons)
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><br><p>${new Date()}</p>`)
  }).catch(error => {
    console.error(error)
    response.status(500).send('Error fetching data')
  })
})
personsRouter.get('/:id',(request,response)=>{
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
personsRouter.delete('/:id', (request, response) => {
  Persons.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})
personsRouter.post('/',(request,response,next)=>{
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  }).catch((error) => next(error))
})
personsRouter.put('/:id', (request, response, next) => {
  const { name, number} = request.body

  Persons.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

module.exports = personsRouter

