const bcrypt = require('bcrypt');

async function verifyPassword(params) {
  const myPassword = 'admin123';
  const hashc = '$2b$10$5voaDf1w8TLq5mZIRalU0.lMnhqIgUY6HAZzQwIQQOs5/y1EiUdGm';
  const isMatch = await bcrypt.compare(myPassword, hashc);
  console.log(isMatch);
}
verifyPassword();
