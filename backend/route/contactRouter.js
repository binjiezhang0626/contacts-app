const express = require('express');
const { getContacts, getContactDetail } = require('../service');

const contactRouter = express.Router();

contactRouter.get('/', async (req, res) => {
  try {
    const result = await getContacts(req.body.options);
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

contactRouter.get('/:userID', async (req, res) => {
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

module.exports = contactRouter;
