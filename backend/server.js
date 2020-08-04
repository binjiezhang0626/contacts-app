require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./build'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at ${port}`);
});
