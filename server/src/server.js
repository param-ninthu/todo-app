const app = require('./app');
const { ENV } = require('./config/env');
const connectDB = require('./config/database');

const PORT = ENV.PORT;

connectDB();


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} in ${ENV.NODE_ENV} mode`);
});



module.exports = server;