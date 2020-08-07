/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import getAge from 'age-by-birthdate';
import DetailDialog from '../../components/detailDialog';
import SortableTableHead from '../../components/sortableTableHead';
import SearchTableToolBar from '../../components/searchTableToolBar';
import { getContacts, getContactDetail } from './contact.services';

const columns = [
  { id: 'Title', label: 'Title', align: 'left' },
  { id: 'Name', label: 'Name', align: 'left' },
  {
    id: 'BirthDate',
    label: 'Age',
    align: 'right',
    format: (value) => getAge(value),
  },
  { id: 'IsFavorite', label: 'Favorite Flag', align: 'right' },
  { id: 'Count', label: 'Contact Detail', align: 'right' },
];

const useStyles = makeStyles({
  root: {
    width: '50%',
  },
  container: {
    // maxHeight: '80%',
    maxHeight: 580,
    minHeight: 300,
  },
  tableRow: {
    cursor: 'pointer',
  },
});

export default function Contact() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [contactDetail, setContactDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('UserID');
  const [searchValue, setSearchValue] = useState('');

  const getContactList = async (options) => {
    const response = await getContacts(options);
    setRows(response.contacts);
    setCount(response.count);
  };

  const getDetail = async (userID) => {
    const response = await getContactDetail(userID);
    setContactDetail(response.detail);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = async (userID) => {
    await getDetail(userID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    if (event.key === 'Enter') {
      getContactList({
        page, rowsPerPage, sortKey: orderBy, sortOrder: order, filterValue: searchValue,
      });
    }
  };

  useEffect(() => {
    getContactList({
      page, rowsPerPage, sortKey: orderBy, sortOrder: order, filterValue: searchValue,
    });
  }, [page, rowsPerPage, orderBy, order]);

  const TableRows = rows.map((row) => (
    <TableRow className={classes.tableRow} hover role="checkbox" tabIndex={-1} key={row.UserID} onClick={() => handleClickOpen(row.UserID)}>
      {columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {column.format ? column.format(value) : value}
          </TableCell>
        );
      })}
    </TableRow>
  ));

  return (
    <Paper className={classes.root}>
      <SearchTableToolBar
        value={searchValue}
        onInputChange={handleChangeSearchInput}
        onKeyPress={handleSubmitSearch}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <SortableTableHead
            columns={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {TableRows}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <DetailDialog
        contactDetail={contactDetail}
        open={open}
        onClose={handleClose}
      />
    </Paper>
  );
}
