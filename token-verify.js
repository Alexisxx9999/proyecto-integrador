const jwt = require('jsonwebtoken');

const secret = 'alexis';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxODQ3NDU5OH0.cfblk9FzTvDURsmF7GIil7A6QhbwBM-Dd9DhDvnED6I';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
const payload = verifyToken(token, secret);
console.log(payload);
