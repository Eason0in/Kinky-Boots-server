const tickets = require('../tickets')

const stage_data = [
  {
    tag: 'A1',
    place: 'Grand Circle',
    price: 75,
    amount: 100
  },
  {
    tag: 'A2',
    place: 'Grand Circle',
    price: 55,
    amount: 100
  },
  {
    tag: 'B1',
    place: 'Royal Circle',
    price: 60,
    amount: 100
  },
  {
    tag: 'B2',
    place: 'Stalls',
    price: 35,
    amount: 100
  }
]

stage_data.forEach(item => tickets.create(item))
