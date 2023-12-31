require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3500;

// Third-party middleware(s) imports:
const CORS = require('cors');
const cookie_parser = require('cookie-parser');

// Inter-links:
// 1) Configuration:
const CORS_options = require('./configuration/CORS_options');
const mongodb_connection = require('./configuration/Mongodb_connection');
// 2) Middleware:
const Credentials = require('./middleware/Credentials');
const Req_logger = require('./middleware/Req_logger');
const Verify_JWT = require('./middleware/Verify_JWT');
// 3) Routes:
const auth = require('./routes/Auth');
const buyer = require('./routes/api/Buyer');
const seller = require('./routes/api/Seller');
const Unmatched = require('./routes/Unmatched');

// MongoDB connection: 
mongodb_connection();

// Custom middleware for logging the req's method and path in console:
app.use(Req_logger);

// Setting 'Acess-Control-Allowed-Origins' header to 'true' for all allowed origins:
app.use(Credentials);  

// Third-party CORS middleware:
app.use(CORS(CORS_options));

// Third-party cookie-parsing middleware:
app.use(cookie_parser());

// Express in-built middleware for parsing place_holders from URL:
app.use(express.urlencoded({ extended: false }));

// Express in-built middleware for parsing JSON paylod:
app.use(express.json());

// Express in-built middleware for routing static files:
app.use(express.static(path.join(__dirname, '/public')));

app.use('/auth', auth);
app.use(Verify_JWT);
app.use('/buyer', buyer);
app.use('/seller', seller);
app.all('*', Unmatched);

mongoose.connection.once('open', () =>
{
  console.log('Connected to MongoDB');

  app.listen(PORT, () =>
  {
    console.log('The server is running in port: '+PORT);
  });
});