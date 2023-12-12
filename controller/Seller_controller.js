const seller = require('../model/Seller');

const get_orders_handler = async (req, res) =>
{  
  const refresh_token = req.refresh_token;

  try
  {
    const exist = await seller.findOne({ refresh_token });
    
    return res.status(200).json({ orders: exist.orders });
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

const post_items_handler = async (req, res) =>
{
  const refresh_token = req.refresh_token;

  // const { products } = req.body; // production
  const products = req.body; // development
  if(!products) return res.sendStatus(400);

  try
  {
    const exist = await seller.findOne({ refresh_token });
    products.forEach(product => exist.catalog.push(product));

    await exist.save();

    return res.sendStatus(200);
  }   
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

module.exports = { get_orders_handler, post_items_handler }