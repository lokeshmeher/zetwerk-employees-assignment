import 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import { employeesRouter } from './routes/employees'


const mongoUrl = `mongodb+srv://primary:${process.env.MONGO_PASSWORD}@production-sp8hx.mongodb.net/db1?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

var app = express()

app.use(express.json())

// Default error handler
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Sorry, something went wrong!')
})

// Routes
app.use('/employees', employeesRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})