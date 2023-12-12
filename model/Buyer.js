const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const order = new Schema({
  seller_id: String,
  name: String,
  price: Number
});

const buyer = new Schema({
  username: String,
  password: String,
  orders: [order],
  refresh_token: String
});

module.exports = model('buyer', buyer)