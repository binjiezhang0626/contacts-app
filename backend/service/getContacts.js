const queryWithPromise = require('../model/database');

const getContacts = async (options) => {
  const { pagination, sort, filter } = options;
  const limitStatement = `LIMIT ${(pagination.page) * pagination.rowsPerPage}, ${pagination.rowsPerPage}`;
  const sortStatement = `ORDER BY Contact.${sort.key} ${sort.order}`;
  const filterStatement = filter.value ? `WHERE Name LIKE '%${filter.value}%'` : '';
  const getContactsQueryInput = [
    filter.value,
    sort.key,
    sort.order,
    pagination.page,
    pagination.rowsPerPage,
  ];
  const getContactsQueryStatement = `SELECT SQL_CALC_FOUND_ROWS Contact.UserID, Contact.Title, Contact.Name, Contact.BirthDate, Contact.IsFavorite, Count(*) AS Count FROM ContactDetail INNER JOIN Contact ON Contact.UserID = ContactDetail.UserID ${filterStatement} GROUP BY ContactDetail.UserID ${sortStatement} ${limitStatement}`;
  const contacts = await queryWithPromise(
    getContactsQueryStatement,
    getContactsQueryInput,
  ).catch((error) => { throw error; });
  const getContactsCountQueryStatement = 'SELECT FOUND_ROWS() as count';
  const count = await queryWithPromise(
    getContactsCountQueryStatement,
    [],
  ).catch((error) => { throw error; });

  return { contacts, count };
};

module.exports = getContacts;
