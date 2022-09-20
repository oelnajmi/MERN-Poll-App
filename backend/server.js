require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const pollRoutes = require('./routes/pollsRouter.js')

//express app
const app = express()

//middleware - looks to see if request has data, it parses it and attaches it to the req object
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/polls', pollRoutes)

//connect do db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //once connected to the DB, we listen for requests
    app.listen(process.env.PORT, () => {
        console.log('Connected to DB and listening on port : ', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})