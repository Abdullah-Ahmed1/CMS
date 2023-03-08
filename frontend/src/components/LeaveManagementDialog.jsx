import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';




export default function LeaveManagementDialog({open,handleClose}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleMaxWidthChange = (event) => {
//     setMaxWidth(
//       // @ts-expect-error autofill of arbitrary value is not handled.
//       event.target.value,
//     );
//   };

//   const handleFullWidthChange = (event) => {
//     setFullWidth(event.target.checked);
//   };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Leave Details</DialogTitle>
        <DialogContent>

            <h4>Current Project: Staples </h4>
            <h4>Project Manager: M Jawad </h4>
            <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
            <h4>Reason of Leave : </h4>
            <TextField id="outlined-basic" size='small' label="Reason" variant="outlined" />
            </div>
            <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
            <h4>Days of Leave : </h4>
            <TextField id="outlined-basic" size='small' label="Days" variant="outlined" />
            </div>
            

          {/* <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText> */}
         
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}