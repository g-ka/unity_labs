const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const buyer = require('../model/Buyer');
const seller = require('../model/Seller');

const register_handler = async (req, res) =>
{
  const { username, role, password } = req.body;
  if(!username || role === undefined || !password) return res.sendStatus(400);

  // role: true => seller, role: false => buyer
  try
  {
    if(!role)
    {
      const exist = await buyer.findOne({ username: username });
      if(exist) return res.sendStatus(409);

      const hash_password = await bcrypt.hash(password, 10);
      await buyer.create({
        username,
        password: hash_password
      });

      return res.sendStatus(200);
    }
    else
    {
      const exist = await seller.findOne({ username: username });
      if(exist) return res.sendStatus(409);

      const hash_password = await bcrypt.hash(password, 10);
      await seller.create({
        username,
        password: hash_password
      });

      return res.sendStatus(200);
    }
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

const login_handler = async (req, res) =>
{
  const { username, role, password } = req.body;
  if(!username || role === undefined || !password) return res.sendStatus(400);

  try
  {
    let exist = null;

    // role: true => seller, role: false => buyer
    if(!role)
    {
      exist = await buyer.findOne({ username });
      if(!exist) return res.sendStatus(401);
    }
    else
    {
      exist = await seller.findOne({ username });
      if(!exist) return res.sendStatus(401);
    }

    const match = await bcrypt.compare(password, exist.password);
    if(!match) return res.sendStatus(401);

    const refresh_token = jwt.sign(
      {
        id: exist._id,
        role
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    exist.refresh_token = refresh_token;
    await exist.save();

    // res.cookie('jwt', refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60*1000 }); // prduction
    res.cookie('jwt', refresh_token, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 365*24*60*60*1000 }); // devlopment
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }
};

const session_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(100);

  try
  {
    const exist = await buyer.findOne({ refresh_token }) || await seller.findOne({ refresh_token});
    if(!exist) 
    {
      // res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None' }); // production
      res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: false , sameSite: 'None' }); // devlopment
      return res.sendStatus(100);
    }

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) =>
      {
        if(err || exist._id != decoded._id)
        {
          return res.sendStatus(403);
        }

        return res.status(202).json(decoded);
      }
    );
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

const log_out_handler = async (req, res) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token) return res.sendStatus(100);

  try
  {
    const exist = await buyer.findOne({ refresh_token }) || await seller.findOne({ refresh_token });
    if(exist)
    {
      exist.refresh_token = '';   
      await exist.save();          
    }

    // res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: true , sameSite: 'None' }); // production
    res.clearCookie('jwt', refresh_token, { httpOnly: true, secure: false , sameSite: 'None' }); // devlopment
    return res.sendStatus(200);
  }
  catch(err)
  {
    return res.sendStatus(500);
  }  
};

module.exports = { register_handler, login_handler, session_handler, log_out_handler }