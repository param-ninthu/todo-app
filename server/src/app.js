const express = require('express');
const cors = require('cors');
const { ENV } = require('./config/env');
const routes = require('./routes');
// const mongoSanitize = require('express-mongo-sanitize');
const app = express();



app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true,
}));



// app.use(mongoSanitize());

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

app.use(`/api/${ENV.API_VERSION}`, routes);



module.exports = app;
