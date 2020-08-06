const queryWithPromise = require('../model/database');

const getContactDetail = async (userID) => {
  const getContactDetailQueryStatement = `SELECT * FROM Expedia.ContactDetail WHERE UserID = ${userID}`;
  const getContactDetailQueryInput = [userID];
  const response = await queryWithPromise(
    getContactDetailQueryStatement,
    getContactDetailQueryInput,
  ).catch((error) => { throw error; });
  return response;
};

module.exports = getContactDetail;
