//DB configuration - with mongoose initial configuration of the DB can be done
//es6 prommise - tells mongoose to use promise as promises areused globally
const mongoose = require('mongoose')
//const CONNECTION_URI = process.env.MONGOLABDB_URI ||'mongodb://akanksha:Deshpande@159@cluster0-shard-00-00-1axkd.mongodb.net:27017,cluster0-shard-00-01-1axkd.mongodb.net:27017,cluster0-shard-00-02-1axkd.mongodb.net:27017/contact-manager?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
mongoose.Promise= global.Promise
mongoose.connect('mongodb://localHost:27017/contacts-manager' ,{useNewUrlParser:true})
    .then(function() {
         console.log('connected to db')
    })
    .catch(function(err) {
        console.log('OPPS !! somethig went wrong ')
    })

    module.exports = {
        mongoose
    }
    