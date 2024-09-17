const http = require('http')
const app = require('./app')

const port = process.env.PORT | 3005;

const server = http.createServer(app,`started at ${process.env.HOST}:${port}`)

console.log(`started at ${process.env.HOST}:${port}`)

server.listen(port);
