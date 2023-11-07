const hashPassword = require('./bcrypt/hashPassword');
const comparePassword = require('./bcrypt/comparePassword')

module.exports = {
    hashPassword,
    comparePassword
}