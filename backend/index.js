require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (request, response) => {
    console.log(error.message)

    if (error.name == 'CastError') {
        return response.status(400).send({ error:
        'malformatted id'})
    }
    next(error)
}

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', getRequestBody = (request) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            console.log(savedPerson)
            response.json(savedPerson)
        })
        .catch(error => {
            console.log(person)
            next(error)})

})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
    
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number, } = request.body

    Person.findByIdAndUpdate(
        request.params.id, 
        {name, number}, 
        { new: true, runValidators: true, context: 'query'})
        .then((person) => {
            console.log("new:", person)
            response.json(person)
        })
        .catch(error => {
            console.log(error)
            next(error)})
})

app.get('/info', (request, response) => {
    Person.find({}).then(result => {
        const info = 
        `<p>Phonebook has info for ${result.length} people</p>
         <p>${new Date()}</p>`
        response.send(info)
    })
})

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})