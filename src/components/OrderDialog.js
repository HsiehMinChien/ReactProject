import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
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
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [nextOrder, setNextOrder] = React.useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getOrderMessage = () => {
    if (!orders || !Array.isArray(orders)) return null;
    const [{ message = '' } = {}] = orders;
    return message;
  };

  const handleClickEdit = () => {
    setNextOrder(getOrderMessage());
    setIsEditMode(true);
  };

  const handleClickCancel = () => {
    setNextOrder('');
    setIsEditMode(false);
  };

  const renderDialogContent = () => {
    if (isEditMode) {
      return (
        <>
          <DialogTitle id="responsive-dialog-title">
            Editing
            {patient ? ` ${patient.name}` : ' '}
            &apos;s order
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="order"
              label="Order"
              type="text"
              fullWidth
              variant="standard"
              value={nextOrder}
              onChange={(e) => setNextOrder(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickCancel}>Cancel</Button>
            <Button onClick={() => {}}>Submit</Button>
          </DialogActions>
        </>
      );
    }
    return (
      <>
        <DialogTitle id="responsive-dialog-title">
          {patient ? patient.name : ''}
          &apos;s order
          <Button autoFocus onClick={handleClickEdit}>
            Edit
          </Button>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Order message:
            {` ${getOrderMessage()}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </>
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {renderDialogContent()}
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
