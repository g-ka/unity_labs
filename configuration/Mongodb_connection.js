const mongoose = require('mongoose');

const mongodb_connection = async () =>
{
  try
  {
    await mongoose.connect(process.env.DATABASE_URI);
  }
  catch(err)
  {
    console.log(err);
  }
};

module.exports = mongodb_connection;