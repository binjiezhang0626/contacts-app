require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getContacts, getContactDetail } = require('./service');

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/v1/contacts', async (req, res) => {
  try {
    const options = {
      pagination: {
        page: parseInt(req.query.page, 10) || 0,
        rowsPerPage: parseInt(req.query.rowsPerPage, 10) || 10,
      },
      sort: {
        key: req.query.sortKey || 'UserID',
        order: req.query.sortOrder || 'ASC',
      },
      filter: {
        key: req.query.filterKey || '',
        value: req.query.filterValue || '',
      },
    };
    const result = await getContacts(options);
    const response = {
      status: 'success',
      contacts: result.contacts,
      count: result.count[0].count,
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      status: 'failed',
      error,
    };
    res.status(500).json(response);
  }
});

app.get('/api/v1/contacts/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const detail = await getContactDetail(userID);
    const response = {
      status: 'success',
      detail,
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      status: 'failed',
      error,
    };
    res.status(500).json(response);
  }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at ${port}`);
});
