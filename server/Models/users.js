const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
    }

},
    { timestamps: true })

const users = mongoose.model('users', usersSchema);
module.exports = users;