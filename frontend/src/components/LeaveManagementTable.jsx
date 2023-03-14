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
import DateSnackbar from './DateSnackbar';


const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];


export default function sLeaveManagementTable({userId,projects,reports}) {

  const [openSnack, setOpenSnack] = React.useState(false);
    console.log("this is test branch")
    const [reason ,setReason] = React.useState("")
    const [days,setDays] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState('Present');
    const [current,setCurrent] = React.useState(0);
    const [dayCount,setDayCount] = React.useState([]);
    const [row,setRow] = React.useState(0); 
      // console.log("reached it" ,row)
      const handleClose = () => {
        setOpen(false);
      };
      const handleChangeStatus = (event) => {
        setStatus(event.target.value);
      };
      const handleChangeReason = (event)=>{
        setReason(event.target.value)
      }
      const handleChangeDays = (event)=>{
        setDays(event.target.value)
      }



      
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };


      const handleSubmit = async()=>{

          const data ={
            row : row,
            status : status,
            reason: reason,
            days : days

          }
          setOpen(false);

           const response  = await axios.post(`http://localhost:3333/leaveManagement/add/${userId}`,data)
}


 React.useEffect(()=>{
        console.log("***************************")
        const getAllDaysInMonth = (month, year) =>
          Array.from(
          { length: new Date(year, month, 0).getDate() },
           (_, i) => new Date(year, month - 1, i + 1)
          );
            console.log("1212121",getAllDaysInMonth((new Date().getMonth())+1,new Date().getFullYear()))
          setDayCount(getAllDaysInMonth((new Date().getMonth())+1,new Date().getFullYear()))

       },[])   
      


  return (
    <>
    <DateSnackbar  handleCloseSnack  = {handleCloseSnack} open =  {openSnack}/>
    <LeaveManagementDialog open = {open} current = {current} user = {projects} handleClose = {handleClose} days = {days} handleChangeDays = {handleChangeDays} reason = {reason}  handleChangeReason = {handleChangeReason} handleChangeStatus = {handleChangeStatus} status = {status}  handleSubmit = {handleSubmit} />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> {month[new Date().getMonth()]}</TableCell>
            <TableCell>Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dayCount.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor :"pointer" ,  "&:hover":{backgroundColor:"grey",color:"white"} ,padding:"20px" }}
              onClick = {()=>{
                  setCurrent(()=>i)
                if(new Date().getDate()> i){
                    setOpen(true)
                    setRow(() => i )
                }else{
                  setOpenSnack(true)
                }
            }}
            >
              <TableCell sx ={{padding:"40px"}}  >
                <Grid2 container flexDirection={"row"} justifyContent={"space-between"}>
                <div>{month[new Date().getMonth()]} {i+1}</div>
                </Grid2>
              </TableCell>

             <TableCell>
              {reports.map((item,index) =>{
                  // console.log("----------------->",index,item)
                  if(new Date(item.date).getDate()==i+1){
                      return (
                        <>
                        <h4> Status : {item.status} </h4>
                        {
                          item.status=="Absent"?(
                          <>
                             <h4>Reason : {item.resaonOfLeave}</h4>
                          </>
                          ):(
                            <>
                            <h4></h4>
                            </>
                          )
                        }
                       
                        </>
                      )
                  }
              })}
             </TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}