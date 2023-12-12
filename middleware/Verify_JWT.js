const jwt = require('jsonwebtoken');

const verify_JWT_handler = (req, res, next) =>
{
  const refresh_token = req.cookies?.jwt;
  if(!refresh_token)  return res.sendStatus(401);
  
  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err) =>
    {
      if(err) return res.sendStatus(403);

      req.refresh_token = refresh_token;
      next();
    }
  )
};

module.exports = verify_JWT_handler;