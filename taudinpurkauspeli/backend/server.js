const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

// setting up port/listening on server ... (may change this)
server.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}.`);
});
