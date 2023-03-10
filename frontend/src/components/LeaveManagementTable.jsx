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
import axios from 'axios';

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



export default function LeaveManagementTable({userId,user}) {
    const [reason ,setReason] = React.useState("")
    const [days,setDays] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('Present');
    console.log("user-->",user)
      const handleClose = () => {
        setOpen(false);
      };
      const handleChangeStatus = (event) => {
        console.log("status--->",event.target.value)
        setStatus(event.target.value);
      };
      const handleChangeReason = (event)=>{
        console.log("reason--->",event.target.value)
        setReason(event.target.value)
      }
      const handleChangeDays = (event)=>{
        console.log("reason--->",event.target.value)
        setDays(event.target.value)
      }

      const handleSubmit = async()=>{
        console.log("----> handle submit reached")
          const data ={
            status : status,
            reason: reason,
            days : days

          }
          console.log("data",data)
          setOpen(false);

           const response  = await axios.post(`http://localhost:3333/projects/add/${userId}`,data)
           console.log("add report response",response)

      
      }
  return (
    <>
    <LeaveManagementDialog open = {open} user = {user} handleClose = {handleClose} days = {days} handleChangeDays = {handleChangeDays} reason = {reason}  handleChangeReason = {handleChangeReason} handleChangeStatus = {handleChangeStatus} status = {status}  handleSubmit = {handleSubmit} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> {month[new Date().getMonth()]}</TableCell>
            <TableCell>Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(30)].map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor :"pointer" ,  "&:hover":{backgroundColor:"grey",color:"white"} ,padding:"20px" }}
              onClick = {()=>{
                if(new Date().getDate()> i){
                    setOpen(true)
                }
            }}
            >
              <TableCell sx ={{padding:"40px"}}  >
                <Grid2 container flexDirection={"row"} justifyContent={"space-between"}>
                <div>{i+1}</div>
                {/* <button>sdkfsn</button> */}
                </Grid2>
                
              </TableCell>
              <TableCell align="left">
              {
               new Date().getDate()> i ? (
                <>
                {
                  user.map((item)=>{
                    return(
                      <>
                      <h4>Current Project :{ item.title}</h4>
                      <h5>Manager : {item.manager}</h5>
                      </>
                    )      
                  })
                }
                {/* <h4>Current Project : Staples </h4> */}
                <h5>Status : </h5>
                {/* <h5>Reason for : </h5> */}
                </>
               ):<></>
              }
               </TableCell>
            
              {/* <TableCell align="right">{row.carbs}</TableCell> */}              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}