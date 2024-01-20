
const mongoose= require('mongoose')
const User = require('../models/User');
const { JWT_SECRET } = require('../config/authConfig');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
	try {
		const  {token } = req.cookies;
		console.log("token is",token)
		if (!token) {
			return res.status(401).json({
				message: "invalid Authentication",
			}) 
			;	
		}
		const decoded = await jwt.verify(token, JWT_SECRET);
		req._id = decoded._id;
		console.log("the req id " ,req._id)
		next();
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
// exports.isAuthenticated = (req, res, next) => {
// 	const { authorization } = req.headers;
  
// 	if (!authorization) {
// 	  return res.status(401).json({
// 		message: 'Invalid Authentication',
// 	  });
// 	}
  
// 	const token = authorization.replace('Bearer ', '');
	
// 	jwt.verify(token, JWT_SECRET, (err, payload) => {
// 	  if (err) {
// 		return res.status(401).json({ error: 'Please log in' });
// 	  }
  
// 	  const { _id } = payload;
  
// 	  User.findById(_id).then(userdata => {
// 		req._id = userdata;
// 		next(); // Move the next() call inside the User.findById callback
// 	  });
// 	});
//   };
