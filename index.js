const express = require('express')
//npm install --save mongoose
const { mongoose } = require('./config/database')
const { contactsRouter } = require('./app/controllers/contactsController')
const { userRouter } = require('./app/controllers/usersController')
const { User } = require('./app/models/user')
const {Contact} = require('./app/models/contact')
const cors = require('cors')



const port = 3005
const app = express()
app.use(cors())

app.use(express.json())          //allow express to parse data

app.use('/contacts' , contactsRouter)
app.use('/users' , userRouter)



app.listen(port , function() {
    console.log('listening to the port' , port)
})



//NO SQL terminilogies
//collection - [] - [{} , {} , {} ](table)
//document - {} - { id: 1 , name : akanksha , mobile : `1234567890} (rows)
//fields - properties of an object - (columns)


 




