//mongoose and object document mapper(odm), this library makes saving js object as Mongo doc straightforward
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

// if (process.argv.length < 3) {
//   console.log('give password as argument')
//   process.exit(1)
// }

//code assumes it will be passed th epw from creds created in Mongodb atlas as a command line parameter
//const password = process.argv[2]
//const url = `mongodb+srv://shinyr_db_user:${password}@cluster0.gyqhyam.mongodb.net/noteApp?appName=Cluster0`
const url = process.env.MONGODB_URI_NOTES

console.log('connecting to ', url)

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
}).catch(error => {
  console.log('error connecting to MongoDB:', error.message)
})

//schema tells mongoose how note objects are to be stores in the database
const noteSchema = new mongoose.Schema({
  //minLength & required are built in validator provided by mongoose
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean
})
//toJSON is a method of th schema,The code automatically uses the defined toJSON when formatting notes to the response.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Note = mongoose.model('Note', noteSchema)

//public interface of the module is defined by setting Note model as a value/ to the module.exports variable
module.exports = mongoose.model('Note', noteSchema)