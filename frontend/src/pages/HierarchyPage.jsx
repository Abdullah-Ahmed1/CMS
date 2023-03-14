import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import NavBar from '../components/NavBar';

const Hierarchy = ()=>{

    const hierarchy = ['CEO','Engineering Manager','Project Manager', 'Senior Developer','Junior Developer','Intern']
    const  [people,setPeople] = useState([
        {
            id: 1,
            name: "M jawad",
            position: "Project Manager" 
        },
        {
            id: 2,
            name: "M shoaib",
            position: "Project Manager" 
        },
        {
            id: 3,
            name: "M Haris",
            position: "Engineering Lead" 
        },
        {
            id: 4,
            name: "M kummail",
            position: "Intern" 
        },
        {
            id: 5,
            name: "Rehan",
            position: "Intern" 
        },
        {
            id: 6,
            name: "M jawad",
            position: "senior Mern Developer" 
        },
        {
            id: 7,
            name: "M Daniyal",
            position: "Engineering Manager" 
        },

    ])

    return(
        <>
         <NavBar/>
            <Grid container flexDirection = {'column'}  justifyContent={'center'} alignItems={'center'}  >
                {
                    hierarchy.map((item,index)=>{
                        return(
                            <>
                            <Divider orientation="vertical" flexItem />
                            <Grid container  key={index} sx={{marginTop:"30px"}} alignItems={'center'} justifyContent={'center'} >
                                <Grid container flexDirection={'column'} >
                                    <Grid>
                                       <h3  style = {{backgroundColor:"blue",color:"white",padding:"10px",borderRadius:"10px"}}>{item}</h3> 
                                    </Grid>
                                    <Grid container flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                                    {
                                    people.map((i)=>{
                                        if(i.position==item){
                                            return(
                                                <Grid  sx = {{border:"2px solid black",borderRadius:"10px",margin:"10px",padding:"10px"}}>
                                                    <h5>{i.name}</h5>
                                                    {/* <h5>{i.position}</h5> */}
                                                </Grid>
                                            )
                                        }
                                    })
                                }
                                    </Grid>
                                </Grid>
                                
                              
                                
                            </Grid>
                            </>
                        )
                    })
                }
                <Grid>

                </Grid>
                
            </Grid>
           
        </>
    )
}
export default Hierarchy