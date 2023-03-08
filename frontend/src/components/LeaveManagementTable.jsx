import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LeaveManagementDialog from './LeaveManagementDialog';
import Grid2 from '@mui/material/Unstable_Grid2'

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Project 1', '02/10/2022', "Muhammad jawad", 'MERN'),
//   createData('Project 2','02/11/2022', "Muhammad jawad", 'MEVN'),
//   createData('Project 3','02/12/2022', "Muhammad jawad", 'MERN'),
//   createData('Project 4','02/01/20223', "Muhammad jawad", 'MEVN'),
//   createData('Project 5','02/04/2023', "Muhammad jawad", 'MERN'),
// ];

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];



export default function LeaveManagementTable() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <>
    <LeaveManagementDialog open = {open} handleClose = {handleClose} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Days for {month[new Date().getMonth()]}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(30)].map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor :"pointer" ,  "&:hover":{backgroundColor:"grey",color:"white"} ,padding:"20px" }}
              onClick = {()=>setOpen(true)}
            >
              <TableCell sx ={{padding:"40px"}}  >
                <Grid2 container flexDirection={"row"} justifyContent={"space-between"}>
                <div>{i+1}</div>
                <button>sdkfsn</button>
                </Grid2>
                
              </TableCell>
              {/* <TableCell align="right">{row.fat}</TableCell> */}
              {/* <TableCell align="right">{row.carbs}</TableCell> */}              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}