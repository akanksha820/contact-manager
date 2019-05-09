const mongoose = require ('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const userSchema = new Schema({
        userName : {
            type : String ,
            required : true ,
            unique : true,
            minlength : 5 

        } , 
        email : {
            type : String ,
            required : true ,
            unique : true ,
            //to check the format of email
            validate : {
                validator : function (email){
                    return validator.isEmail(email)
                } ,
                message : function (){
                    return  'invalid email format '
                }
            }
        } ,
        password : {
            type : String ,
            required : true ,
            minlength : 6 ,
            maxlength : 128
        },
        tokens : [
            {
                token: {
                    type : String 
                },
                createdAt : {
                    type : Date ,
                    default : Date.new
                }

            }
        ]

})

//mongoose middleware - pre hooks
userSchema.pre('save' , function(next) {
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt) {
            bcryptjs.hash(user.password , salt)
                .then(function(encryptedPwd) {
                    user.password = encryptedPwd
                    next()
                })
        })
    }else{
        next()
    }
 
})

// our own static method
userSchema.statics.findByCredentials = function(email , password){
    const User = this
    return User.findOne({email})
        .then(function(user) {
            if(!user){
                return Promise.reject('Invalid email')
            }
            return bcryptjs.compare(password , user.password)
                    .then(function(result) {
                        if(result){
                            return Promise.resolve(user)
                        }else {
                            return Promise.reject('Invalid password')
                        }
                    })
        })
        .catch(function(err){
            return Promise.reject(err)
        })

}
//own instance method 
userSchema.methods.generateToken = function(){
    const user = this
    const tokenData = {
        _id : user._id ,
        userName : user.userName ,
        createdAt : Number(new Date())
    }
    const token = jwt.sign(tokenData , 'jwt@123')
    user.tokens.push({token})
    return user.save()
        .then(function(user){
            return Promise.resolve(token)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}




userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token , 'jwt@123')
    }
    catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id : tokenData._id ,
        'tokens.token' : token
    })
}

const User = mongoose.model('User' , userSchema)

module.exports = {
    User
}
