import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function ErrorSnack({open,handleClose, message}) {
  return (
    <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    open={open}
    onClose={handleClose}
    key={"top" + "center"}
    autoHideDuration={3000}
  >
    <Alert
      onClose={handleClose}
      severity="error"
      variant="filled"
      elevation={6}
    >
      {message}
    </Alert>
  </Snackbar>
  )
}

export default ErrorSnack