import axios from 'axios';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { basicApiUrl } from './config';
import PatientsList from './components/PatientList';
import OrderDialog from './components/OrderDialog';

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

  // Fetch patients
  React.useEffect(() => {
    axios.get(`${basicApiUrl}/patient`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClickOpen = (orderId) => {
    // Fetch patient's order.
    axios.get(`${basicApiUrl}/orders/${orderId}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((err) => console.log(err));
    setOpen(true);
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
      />
    </ThemeProvider>
  );
}

export default App;
