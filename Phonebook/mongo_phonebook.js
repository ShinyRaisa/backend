const mongoose = require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

//code assumes it will be passed the pw from creds created in Mongodb atlas as a command line parameter
const password = process.argv[2]
const url = `mongodb+srv://shinyr_db_user:${password}@cluster0.gyqhyam.mongodb.net/phonebookApp?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: String,
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

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
// Person.insertMany(persons).then(result=>{
//   console.log('persons saved!')
// })

if(process.argv[3] && process.argv[4]){
  const person = new Person({
    id: 'new',
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    //mongoose.connection.close()
  })
}
Person.find({}).then(result=>{
  result.forEach(person=>{
    console.log(person)
  })
  mongoose.connection.close()
})