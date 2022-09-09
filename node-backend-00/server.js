require('dotenv').config();
const http = require('http');
const os =  require('os');
const app = require('./app');

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

server.listen(PORT, (req) => {
    console.log(`🚀 Server is running on ${PORT}`);
});