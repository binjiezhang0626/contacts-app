require('dotenv').config();
const server = require('./server');

const { PORT } = process.env;

server.listen(PORT, () => {
  /* eslint-disable no-alert, no-console */
  console.log(`server started on port ${PORT}`);
});
