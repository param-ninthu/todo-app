const mongoose = require('mongoose');
const { ENV } = require('./env');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(ENV.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('❌ MongoDB connection failed', error);
        process.exit(1);
    }
};

module.exports = connectDB;