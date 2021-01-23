const mongoose = require('mongoose');

const verifySchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    token: {type: String, required: true}
}, {});

const VerifyEmail = mongoose.model('VerifyEmail', verifySchema);

module.exports = VerifyEmail;