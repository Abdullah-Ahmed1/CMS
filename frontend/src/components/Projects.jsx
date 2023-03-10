import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function ProjectsTable({projects}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right">Stack</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <TableCell align="right">{row.stack}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}