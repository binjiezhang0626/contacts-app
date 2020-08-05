const mysqlConnection = require('./database');

const queryWithPromise = (dataConnection, queryStatement, queryInput = []) => new Promise(
  (resolve, reject) => {
    dataConnection.query(queryStatement, queryInput, (error, result) => (
      error ? reject(error) : resolve(result)
    ));
  },
);

const getContacts = async (options) => {
  const { pagination, sort, filter } = options;
  const limitStatement = `LIMIT ${(pagination.pageNumber - 1) * pagination.numberPerPage}, ${pagination.numberPerPage}`;
  const sortStatement = `ORDER BY Contact.${sort.key} ${sort.order}`;
  const filterStatement = filter.key && filter.value ? `WHERE ${filter.key} = ${filter.value}` : '';
  const getContactsQueryInput = [
    filter.key,
    filter.order,
    sort.key,
    sort.order,
    pagination.pageNumber,
    pagination.numberPerPage,
  ];
  const getContactsQueryStatement = `SELECT Contact.Title, Contact.Title, Contact.Name, Contact.BirthDate, Contact.IsFavorite, Count(*) AS Count FROM Expedia.ContactDetail INNER JOIN Expedia.Contact ON Contact.UserID = ContactDetail.UserID ${filterStatement} GROUP BY ContactDetail.UserID ${sortStatement} ${limitStatement}`;
  const response = await queryWithPromise(
    mysqlConnection,
    getContactsQueryStatement,
    getContactsQueryInput,
  ).catch((error) => { throw error; });
  return response;
};

const getContactDetail = async (userID) => {
  const getContactDetailQueryStatement = `SELECT * FROM Expedia.ContactDetail WHERE UserID = ${userID}`;
  const getContactDetailQueryInput = [userID];
  const response = await queryWithPromise(
    mysqlConnection,
    getContactDetailQueryStatement,
    getContactDetailQueryInput,
  ).catch((error) => { throw error; });
  return response;
};

module.exports = {
  getContacts,
  getContactDetail,
};
