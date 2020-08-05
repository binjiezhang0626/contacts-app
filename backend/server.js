require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getContacts, getContactDetail } = require('./databaseService');

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/contacts', async (req, res) => {
  try {
    const options = {
      pagination: {
        pageNumber: parseInt(req.query.pageNumber, 10) || 1,
        numberPerPage: parseInt(req.query.numberPerPage, 10) || 10,
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
    const contacts = await getContacts(options);
    const response = {
      status: 'success',
      data: contacts,
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

app.get('/api/contacts/:userID', async (req, res) => {
  try {
    const { userID } = req.params;
    const detail = await getContactDetail(userID);
    const response = {
      status: 'success',
      data: detail,
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
