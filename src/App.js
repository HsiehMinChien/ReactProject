import axios from 'axios';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { basicApiUrl } from './config';
import PatientsList from './components/PatientList';
import OrderDialog from './components/OrderDialog';
import Toast from './components/Toast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [patients, setPatients] = React.useState();
  const [selectedPatient, setSelectedPatient] = React.useState();
  const [order, setOrder] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [toastInfo, setToastInfo] = React.useState({});

  const handleQueryError = (err) => {
    console.log(err);
    setToastInfo({
      severity: Toast.ToastSeverityMap.ERROR,
      message: err.message,
    });
  };

  const fetchPatientsData = () => {
    axios.get(`${basicApiUrl}/patient`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch(handleQueryError);
  };

  // Fetch patients
  React.useEffect(() => {
    fetchPatientsData();
  }, []);

  const handleClickOpen = (orderId) => {
    // Fetch patient's order.
    axios.get(`${basicApiUrl}/orders/${orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch(handleQueryError);
    setOpen(true);
  };

  const handleSubmit = (message, orderId, patientId) => {
    axios.put(`${basicApiUrl}/orders/${orderId}`, { message, patientId })
      .then(() => {
        // Refetch patient data.
        fetchPatientsData();
        setToastInfo({
          severity: Toast.ToastSeverityMap.SUCCESS,
          message: 'Edit order successfully!!',
        });
      })
      .catch(handleQueryError);
    setOpen(false);
  };

  const handleClose = () => {
    setSelectedPatient(undefined);
    setOrder(undefined);
    setOpen(false);
  };

  const handleItemClick = (selectPatient) => {
    handleClickOpen(selectPatient.orderid);
    setSelectedPatient(selectPatient);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="sm">
          <PatientsList patients={patients} onItemClick={handleItemClick} />
        </Container>
      </div>
      <OrderDialog
        open={open}
        patient={selectedPatient}
        orders={order}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Toast
        toastMessage={toastInfo.message}
        severity={toastInfo.severity}
        onClose={() => setToastInfo({})}
      />
    </ThemeProvider>
  );
}

export default App;
