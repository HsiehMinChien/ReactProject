import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function OrderDialog({
  open,
  onClose,
  patient,
  orders,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const renderOrderMessage = () => {
    if (!orders || !Array.isArray(orders)) return null;
    const [{ message = '' } = {}] = orders;
    return message;
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {patient ? patient.name : ''}
        &apos;s order
        <Button autoFocus onClick={onClose}>
          Edit
        </Button>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Order message:
          {renderOrderMessage()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

OrderDialog.defaultProps = {
  patient: {},
  orders: [],
};

OrderDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  patient: PropTypes.shape({
    name: PropTypes.string,
    orderid: PropTypes.number,
  }),
  orders: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
  })),
};
