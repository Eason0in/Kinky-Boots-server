const db = require('./connection')
const Joi = require('joi')

const bookSchema = Joi.object().keys({
  name: Joi.string().required(),
  showDate: Joi.string().required(),
  ticket: Joi.number()
    .min(1)
    .required(),
  price: Joi.number().required(),
  email: Joi.string().required(),
  areas: Joi.string()
    .length(2)
    .required()
})

const books = db.get('books')

const create = book => {
  const result = Joi.validate(book, bookSchema)
  if (result.error === null) {
    book.create = new Date()
    return books.insert(book)
  } else {
    return Promise.reject(result.error)
  }
}

module.exports = {
  create
}
