import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function MuiAlertComponent(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}

const Alert = React.forwardRef(MuiAlertComponent);

const ToastSeverityMap = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
};

export default function Toast({ toastMessage, onClose, severity }) {
  return (
    <Snackbar
      open={Boolean(toastMessage)}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {toastMessage}
      </Alert>
    </Snackbar>
  );
}

Toast.ToastSeverityMap = ToastSeverityMap;

Toast.defaultProps = {
  severity: ToastSeverityMap.ERROR,
};

Toast.propTypes = {
  toastMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(Object.values(ToastSeverityMap)),
};
