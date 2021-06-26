const mongoose = require('mongoose');

const connectDB = async() => {
    await mongoose.connect(
        process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/ATN-Management', { useNewUrlParser: true }, { useUnifiedTopology: true })
    console.log('Connect database succesful')
}

module.exports = connectDB;