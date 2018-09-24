const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models').User;

function verifyToken(req, res, next) {
  let token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything good, save to request for use in other routes
    User
      .findById(decoded.id, {})
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }

        req.user = user;
        next();
      })
      .catch(error => res.status(400).send(error));
  });
}

module.exports = verifyToken;