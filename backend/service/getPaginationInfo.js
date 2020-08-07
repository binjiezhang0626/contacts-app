const getPaginationInfo = (query) => ({
  pagination: {
    page: parseInt(query.page, 10) || 0,
    rowsPerPage: parseInt(query.rowsPerPage, 10) || 10,
  },
  sort: {
    key: query.sortKey || 'UserID',
    order: query.sortOrder || 'ASC',
  },
  filter: {
    value: query.filterValue || '',
  },
});

module.exports = getPaginationInfo;
