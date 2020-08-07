/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default function SortableTableHead({
  columns, order, orderBy, onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const HeadRow = columns.map((column) => (
    <TableCell
      key={column.id}
      align={column.align}
      padding={column.disablePadding ? 'none' : 'default'}
      sortDirection={orderBy === column.id ? order : false}
    >
      <TableSortLabel
        active={orderBy === column.id}
        direction={orderBy === column.id ? order : ''}
        onClick={column.id !== 'Count' ? createSortHandler(column.id) : () => { }}
      >
        {column.label}
      </TableSortLabel>
    </TableCell>
  ));

  return (
    <TableHead>
      <TableRow>
        {HeadRow}
      </TableRow>
    </TableHead>
  );
}

SortableTableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};
