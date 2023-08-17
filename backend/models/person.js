const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:',
        error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: (number) => {
                if (number.charAt(2) === '-' && 
                /^\d{2}$/.test(number.substring(0,2)) &&
                /^\d+$/.test(number.substring(3))) {
                    return true
                } else if (number.charAt(3) === '-' &&
                /^\d{3}$/.test(number.substring(0,3)) &&
                /^\d+$/.test(number.substring(4))) {
                    return true
                }
                return false
            },
            message: "Number must be in form xx-xxxxxx or xxx-xxxxx"
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)