//create a schema - this will decide what all fields should be there inside a document.
//it's same like an object constructor function (blueprint)
const mongoose = require('mongoose')
//const bcryptjs = require('bcryptjs')
//const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema
const { User } = require('./user')
const contactSchema = new Schema({
    name : {
        type : String ,
        required : true
    },
    email: {
        type : String,
        reqyired : true ,
        unique : true
    },
    mobile : {
        type: Number ,
        required : true ,
        minlength : 10 ,
        maxlength : 10
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
    
})

//We need to create a model after creating schema.
//Contact is the object constructor function.(this has got many methods).
const Contact = mongoose.model('Contact' , contactSchema)

module.exports = {
    Contact
}