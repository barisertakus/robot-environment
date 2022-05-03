import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HelpDialog({ open, handleOpen, handleClose }) {
  return (
    <div>
      <Button color="warning" variant="contained" onClick={handleOpen}>
        HELP
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{"How to use script"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            👉 There is no case sensitivity in the app. <br />
            <br />
            👉 COMMANDS <br />
            ✓ POSITION 1 //sets the initial position for the robot <br />
            ✓ TURNAROUND //lets the robot turn around <br />
            ✓ WAIT //lets the robot do nothing <br />
            ✓ FORWARD 1 //lets the robot do 1 step forward <br />
            ✓ FORWARD 2 //lets the robot do 2 steps forward
            <br />
            ✓ FORWARD 3 //lets the robot do 3 steps forward <br />
            ✓ RIGHT //lets the robot turn right <br />
            ✓ LEFT //lets the robot turn left <br />
            ✓ UP //lets the robot turn up <br />
            ✓ DOWN //lets the robot turn down <br /> <br />
            👉 How to turn off turnaround mode? <br />
            ✓ Use WAIT or Re-send TURNAROUND command
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OKAY</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
