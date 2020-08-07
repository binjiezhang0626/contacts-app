/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

export default function DetailDialog(props) {
  const {
    contactDetail, onClose, open,
  } = props;
  const handleClose = () => {
    onClose();
  };

  const ContactDetail = contactDetail ? contactDetail.map((item, index) => (
    <ListItem key={index}>
      <ListItemAvatar>
        {item.ContactDetailType === 'EMAIL' ? <EmailIcon /> : <PhoneIcon />}
      </ListItemAvatar>
      <ListItemText primary={item.ContactDetailContent} />
    </ListItem>
  )) : '';

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Contact Detail</DialogTitle>
      <List>
        {ContactDetail}
      </List>
    </Dialog>
  );
}

DetailDialog.propTypes = {
  contactDetail: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
