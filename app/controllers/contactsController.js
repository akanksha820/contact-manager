//route handler 
//app.httpMethod(url , function())
// get , put , post , delete
// app.get('/' , function(req , res) {
//     console.log(req.body  , req.ip , req.method , req.url , new Date() ) //server log
    

// })

//Client is making request - we are wriing DB query

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const {Contact} = require('../models/contact')
const { authenticateUser } = require('../middleware/authentication')

router.get('/' , authenticateUser,function(req,res) {
    Contact.find({
        user : req.user._id
    })       //This will return documents in the collection .
                         // At fisrt will return empty array
        .then(function(contacts) {
            res.send(contacts)
        })
        .catch(function(err) {
            res.send(err)
    })
    
})

//Route handler to create new contact / document 
router.post('/' , authenticateUser, function(req,res) {
    const body = req.body 
    // new object 'conatct' of type 'Contact' - automatically maps the properties of the body to the Contact blueprint
    const contact = new Contact(body) 
    // __id ,name , mobile ,email , __v
    contact.user = req.user._id
    contact.save()       //It will update into database also all validations will be checked here 
        .then(function(contact) {
            res.send(contact)
        })
        .catch(function(err) {
            res.send(err)
        })
})

//To get only one document/ object from the collection/array
//
//here collectuion = Contact
//here document = new new contacts which we will create
//
router.get('/:id',authenticateUser,function(req,res) {
    const id = req.params.id
    Contact.findOne({
        user : req.user._id,
        _id : id
    })          //it will return a promise ,
        .then(function(contact) {       
            res.send(contact)       //it will send the particular document with the ID found
        })
        .catch(function(err) {
            res.send(err)
        })
})


//To delete only one documnet /object 
router.delete('/:id',authenticateUser,function(req,res){
    const id = req.params.id
    Contact.findOneAndDelete(
        {
            user : req.user._id,
            _id : id
        }
    )
        .then(function(contact) {
            res.send(contact)
            // if(contact){
            //     res.send(contact)
            // }else {
            //     res.send({})
            // }
        })
        .catch(function(err) {
            res.send(err)
        })
})

// to update one record/document/object
router.put('/:id' , function(req,res) {
    const id = req.params.id
    const body = req.body 
    Contact.findOneAndUpdate({
        user : req.user._id,
        _id : id
    } , {$set : body} , {new: true , runValidators : true})
        .then(function(contact) {
            res.send(contact)
        })
        .catch(function(err) {
            res.send(err)
        })
})



module.exports = {
    contactsRouter: router
}