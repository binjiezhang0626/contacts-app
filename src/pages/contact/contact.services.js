import http from '../../util/http';

async function getContacts(options) {
  return http.get('/api/v1/contacts', {
    params: {
      page: options.page,
      rowsPerPage: options.rowsPerPage,
      sortKey: options.sortKey,
      sortOrder: options.sortOrder,
      filterValue: options.filterValue,
    },
  });
}

async function getContactDetail(userID) {
  return http.get(`/api/v1/contacts/${userID}`);
}

export { getContacts, getContactDetail };
