import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import LeaveManagementDialogRadioButton from './LeaveManagementDialogRadioButton';




export default function LeaveManagementDialog({open,handleClose,handleSubmit}) {
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [status, setStatus] = React.useState('Present');

  const [reason,setReason] = React.useState('')
  const [days,setDays] = React.useState('') 

  console.log("--*", reason)
  console.log("--*", days)
  const handleChange = (event) => {
    setStatus(event.target.value);
  };


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
            
            <LeaveManagementDialogRadioButton status = {status} handleChange = {handleChange} />
            {
              status ==='Absent'? (
                <>
                <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
                <h4>Reason of Leave : </h4>
                <TextField  value={reason} onChange = {(e)=> setReason(e.target.value) }  id="outlined-basic" size='small' label="Reason" variant="outlined" />
                </div>
                <div style={{display:"flex" ,flexDirection:"row",width:"50%",justifyContent:"space-between",alignItems:"center"}}>
                <h4>Days of Leave : </h4>
                <TextField  value={days}  onChange = {(e)=> setDays(e.target.value) } id="outlined-basic" size='small' label="Days" variant="outlined" />
                </div>  
                </>  
              ):(
                <></>
              )
            }  
            
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}