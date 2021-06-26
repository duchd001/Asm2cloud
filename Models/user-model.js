const mongoose = require('mongoose')
const schema = mongoose.Schema


let userSchema = new schema({

    username: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel