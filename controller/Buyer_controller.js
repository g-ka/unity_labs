const { ObjectId } = require('mongodb');

const buyer = require('../model/Buyer');
const seller = require('../model/Seller');

const get_sellers_handler = async (req, res) =>
{
  try
  {
    const sellers_list = await seller.find();
    const sellers_details = sellers_list.map(seller => 
      { 
        return(
          {
            seller_username: seller.username,
            seller_id: seller._id
          }
        );
      });

    return res.status(200).json({ sellers_details });
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

const get_catalog_handler = async (req, res) =>
{
  const { seller_id } = req.query;
  if(!seller_id) return res.sendStatus(400);

  try
  {
    const exist = await seller.findOne({ _id: new ObjectId(seller_id) });
  
    return res.status(200).json({ seller_catalog: exist.catalog });
  }
  catch(err)
  {
    console.log(err.message);
    return res.sendStatus(500);
  }
};

const get_orders_handler = async (req, res) =>
{
  const refresh_token = req.refresh_token;

  try
  {
    const exist = await buyer.findOne({ refresh_token });

    return res.status(200).json({ orders: exist.orders });
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

const post_orders_handler = async (req, res) =>
{
  const refresh_token = req.refresh_token;

  // const { orders } = req.body; // production
  const orders = req.body; // development
  if(!orders) return res.sendStatus(400);

  try
  {
    // updating buyers order:
    const exist_buyer = await buyer.findOne({ refresh_token });
    orders.forEach(order => exist_buyer.orders.push(order));

    await exist_buyer.save();

    // updating sellers order:    
    for(let i=0; i<orders.length; i++)
    {
      const exist_seller = await seller.findOne({ _id: new ObjectId(orders[i].seller_id) }); 
      const seller_order = {
        buyer_id: exist_buyer._id,
        name: orders[i].name,
        price: orders[i].price
      };

      exist_seller.orders.push(seller_order);

      await exist_seller.save();
    }

    return res.sendStatus(200);
  } 
  catch(err)
  {
    console.log(err.message);
    return res.sendStatus(500);
  }  
};

module.exports = { get_sellers_handler, get_catalog_handler, get_orders_handler, post_orders_handler }