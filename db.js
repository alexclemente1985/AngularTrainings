const mongoose = require('mongoose');

mongoose.connect('mongodb://nodeTest:nodeTestPass@localhost:27017/node_test');

const userSchema = new mongoose.Schema({
    username: String,
    email: String
},{collection: 'users'});

module.exports = {Mongoose: mongoose, UserSchema: userSchema}