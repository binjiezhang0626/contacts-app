const vaildationMiddleware = (req, res, next) => {
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
  req.body.options = options;
  next();
};

module.exports = vaildationMiddleware;
