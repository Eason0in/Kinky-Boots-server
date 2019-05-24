if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 1234
const cors = require('cors')
const morgan = require('morgan')
const books = require('./db/books')
const tickets = require('./db/tickets')
const sendEmail = require('./sendmail')

app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  tickets.getAll().then(tickets => {
    res.json(tickets)
  })
})

app.post('/books', (req, res) => {
  ;(async () => {
    try {
      await bookCreate(req.body)
      await ticketsUpdate(req.body)
      res.redirect('/')
    } catch (e) {
      res.status(500)
      res.json(error)
    }
  })()
})

const bookCreate = book =>
  new Promise((resolve, reject) => {
    books
      .create(book)
      .then(() => {
        sendEmail(book)
        resolve('')
        // res.redirect('/')
      })
      .catch(error => {
        reject(error)
        // res.status(500)
        // res.json(error)
      })
  })

const ticketsUpdate = book =>
  new Promise((resolve, reject) => {
    tickets
      .update(book)
      .then(() => resolve(''))
      .catch(error => reject(error))
  })

app.listen(process.env.PORT || port, () => {
  console.log(`http://localhost:${port}`)
})
