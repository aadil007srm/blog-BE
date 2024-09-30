// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  // Log the received token for debugging
  console.log('Received token:', token);

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err); // Log error for debugging
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded; // Set the user ID from the token
    next();
  });
};
