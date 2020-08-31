const http = require('http')
const hostname = '127.0.0.1'
const port = 3000;
const route = require('./route')

//all endpoints
const server = route

//add server
server.listen(port, hostname, err =>{
    if (err) throw err;
    else
    console.log(`server is running at ${hostname}:${port}`);
})