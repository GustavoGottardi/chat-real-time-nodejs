//Model Users
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String
});
 
//Define o model Users
module.exports = mongoose.model('Users', UserSchema);