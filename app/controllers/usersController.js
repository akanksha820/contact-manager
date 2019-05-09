const express = require ('express')
const router = express.Router()
const {User} = require ('../models/user')
const {authenticateUser } = require('../middleware/authentication')


router.get('/' , function(req,res){
    User.find()
        .then(function(users){
            res.send(users)
        })
        .catch(function(err){
            res.send(err)
        })
})
//localhost:3000/users/register
router.post('/register' ,function(req,res) {
    const body = req.body
    // console.log(body)
    const user = new User(body)
    console.log(user)
    console.log(user.isNew)
    user.save()
        .then(function(user) {
            console.log(user.isNew)
            res.send(user)
        })
        .catch(function(err) {
            res.send('error : ',err)
        })
})

router.post('/login' , function(req,res) {
    const body = req.body
    User.findByCredentials(body.email , body.password)
        .then(function(user) {
           return user.generateToken()  
        })
        .then(function(token){
            res.send({token})
        }) 
        .catch(function(err) {
            res.status(404).send(err)
        })
   
})

router.get('/account' ,authenticateUser , function(req,res){
    const { user } = req
    res.send(user)       
    
})

router.delete('/logout' , authenticateUser ,function(req,res){
    const {user  , token } = req 
    User.findByIdAndUpdate(user._id , {$pull : {tokens : {token : token}}})
        .then(function(){
            res.send({notice : 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    userRouter : router
}
