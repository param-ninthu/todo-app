require('dotenv').config();

const requiredEnvVars = ['PORT', 'MONGO_URI'];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});

const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    API_VERSION: process.env.API_VERSION,
    NODE_ENV: process.env.NODE_ENV

};

module.exports = {ENV};