const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(morgan('tiny'))
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
require('dotenv').config()
const Person = require('./models/person')
  
  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>
      {
        response.json(persons)
      })
  })
 
  app.get(('/api/persons/:id'),(request,response)=>{
    Person.findById(request.params.id).then(person=>{
      response.json(person)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
   Person.findByIdAndDelete(request.params.id).then(result=>{
     response.status(204).end();
    }) 
  });

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'No name entered' 
      })
    }
    if (!body.numbers) {
      return response.status(400).json({ 
        error: 'No number entered' 
      })
    }
  
    const person = new Person({
      name: body.name,
      numbers: body.numbers,
      comments: body.comments,
    })

    person.save().then(newPerson=>
      {
        response.json(newPerson)
      })
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

