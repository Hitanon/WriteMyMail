import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import './general.css';

const MainModal = ({ open, handleClose, message, iconSrc, iconAlt }) => {
  return (
    <Modal open={open} onClose={handleClose} className="custom-modal">
      <Box className="modal-box">
        <IconButton
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#fff',
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <div className="modal-content">
          <img src={iconSrc} alt={iconAlt} className="error-icon" />
          <Typography variant="h6" className="error-text">
            {message}
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default MainModal;
