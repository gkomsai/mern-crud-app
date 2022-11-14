const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserAuth = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
   return res.status(401).send("Please login first");
  }

  const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).send({message:"Please Login to complete the task"});
      } else {
        req.body.userId = decoded.userId; 
        // console.log("auth-middleware reqBody: ", req.body); 
        next();
      }
    });
  }

module.exports = { checkUserAuth };
