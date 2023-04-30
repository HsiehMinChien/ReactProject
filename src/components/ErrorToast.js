import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function MuiAlertComponent(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}

const Alert = React.forwardRef(MuiAlertComponent);

export default function ErrorToast({ toastMessage, onClose }) {
  return (
    <Snackbar
      open={Boolean(toastMessage)}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

ErrorToast.propTypes = {
  toastMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
