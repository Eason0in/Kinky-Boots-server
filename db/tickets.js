const db = require('./connection')
const Joi = require('joi')

const ticketSchema = Joi.object().keys({
  tag: Joi.string()
    .length(2)
    .required(),
  place: Joi.string().required(),
  price: Joi.number().required(),
  amount: Joi.number().required()
})

const tickets = db.get('tickets')

const create = ticket => {
  const result = Joi.validate(ticket, ticketSchema)
  if (result.error === null) {
    ticket.create = new Date()
    return tickets.insert(ticket).then(() => console.log(`${ticket.tag} insert ok`))
  } else {
    return Promise.reject(result.error)
  }
}

const getAll = () => {
  return tickets.find()
}

const update = ticket => {
  return tickets
    .update({ tag: ticket.areas }, { $inc: { amount: -ticket.ticket } })
    .then(update => {
      console.log('update', update)
    })
    .catch(err => Promise.reject(err))
}

module.exports = {
  create,
  getAll,
  update
}
