const http = require('http');
const chalk = require('chalk');
const {host, port} = require('./config/index');
const handleRequest = require('./core/index');
const server = http.createServer(handleRequest);
server.listen(port, host, () => {
  console.log(`server is listening on ${chalk.green(host+ ':' + port)}`);
});
