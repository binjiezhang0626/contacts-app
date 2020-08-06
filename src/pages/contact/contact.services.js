import http from '../../util/http';

async function getContacts(options) {
  const result = await http.get('/api/v1/contacts', {
    params: {
      page: options.page,
      rowsPerPage: options.rowsPerPage,
      sortKey: options.sortKey,
      sortOrder: options.sortOrder,
    },
  });
  return result;
}

async function getContactDetail(userID) {
  const result = await http.get(`/api/v1/contacts/${userID}`);
  return result;
}

export { getContacts, getContactDetail };
