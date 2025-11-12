//mongoose and object document mapper(odm), this library makes saving js object as Mongo doc straightforward
const mongoose= require('mongoose')

if(process.argv.length < 3){
  console.log('give password as argument')
  process.exit(1)
}

//code assumes it will be passed th epw from creds created in Mongodb atlas as a command line parameter
const password = process.argv[2]
const url = `mongodb+srv://shinyr_db_user:${password}@cluster0.gyqhyam.mongodb.net/noteApp?appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

//schema tells mongoose how note objects are to be stores in the database
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)
//Models are constructor functions that create new JavaScript objects based on the provided parameters
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

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
// note.save().then(result=>{
//   console.log('note saved!')
//   //mongoose.connection.close()
// })
Note.insertMany(notes).then(result=>{
  console.log('notes saved!')
  //mongoose.connection.close()
})

//{} search condition: empty object parameter gets all notes stores in notes collection
// Note.find({}).then(result=>{
//   result.forEach(note=>{
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
Note.find({important: true}).then(result=>{
  result.forEach(note=>{
    console.log(note)
  })
  mongoose.connection.close()
})

//When the code is run with the command node mongo_note.js yourPassword, Mongo will add a new document(note) to the database.