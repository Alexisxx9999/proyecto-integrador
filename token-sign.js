const jwt = require('jsonwebtoken');

const secret = 'alexis';
const payload = {
  sub: 1,
};
function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}
const token = signToken(payload, secret);
console.log(token);
