import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function PatientsList({ patients, onItemClick }) {
  const renderListItems = () => {
    if (!patients || !Array.isArray(patients)) return null;

    return (
      <>
        {patients.map((patient, index) => (
          <ListItemButton
            key={`${patient.id}-${patient.name}-${patient.orderid}`}
            onClick={() => onItemClick(patient)}
          >
            <ListItemIcon>
              <AccountCircleIcon fontSize="large" color={index % 2 ? 'primary' : 'action'} />
            </ListItemIcon>
            <ListItemText primary={patient.name} />
          </ListItemButton>
        ))}
      </>
    );
  };

  return (
    <Box>
      <h2> Patients List </h2>
      <nav aria-label="main mailbox folders">
        <List component="nav" aria-label="main mailbox folders">
          {renderListItems()}
        </List>
      </nav>
    </Box>
  );
}

PatientsList.defaultProps = {
  patients: [],
  onItemClick: () => {},
};

PatientsList.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    orderid: PropTypes.number,
  })),
  onItemClick: PropTypes.func,
};
