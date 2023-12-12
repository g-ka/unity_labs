const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const product = new Schema({
  name: String,
  price: String
});

const order = new Schema({
  buyer_id: String,
  name: String,
  price: Number
});

const seller = new Schema({
  username: String,
  password: String,
  catalog: [product],
  orders: [order],
  refresh_token: String
});

module.exports = model('seller', seller)