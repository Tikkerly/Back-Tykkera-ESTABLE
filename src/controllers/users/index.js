const loginUser = require('./loginUser/index');
const registerUser = require('./registerUser/index');
const editUser = require('./editUser/index');
const getUsers = require('./getUsers/index');
const deleteUser = require('./deleteUser/index');

module.exports = {
    loginUser,
    registerUser,
    editUser,
    getUsers,
    deleteUser
}