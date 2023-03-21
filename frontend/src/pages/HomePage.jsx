import NavBar from "../components/NavBar"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { useEffect,useState } from "react";
import axios from 'axios'
import ProjectsTable from "../components/Projects";

axios.defaults.withCredentials = true
const HomePage = ()=>{
        const [user,setUser] = useState({})
        const [projects,setProjects] = useState([])
    useEffect(()=>{
        async function getuser(){
            const user =  await axios.get(`http://localhost:3333/show-user`,{
                withCredentials:true,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            })
            setUser(()=> user.data.user )
        }

        async function getProjects(){
            const projects =  await axios.get(`http://localhost:3333/projects/show`,{
                withCredentials:true,
                headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
            })
            setProjects(()=> projects.data.projects )
        }
        getuser()
        getProjects()
    

    },[])


    useEffect(()=>{
         function b(){
            async function a(){
                console.log("aa")
                console.log( await axios.get(`http://localhost:3333/projects/show`,{
                    withCredentials:true,
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
                }),"lwkedm")
                console.log("d")
            }
            function main(){
                console.log("hye")
                a()
                console.log("hello")
            }
            main()
        }
        b()
    },[])
    return(
        <Box sx = {{}}>
            
            <Grid container flexDirection={'row'} sx = {{margin:"100px 100px"}} justifyContent={'center'} alignItems={"center"}>
                <Grid lg={6}>
                    <img src="profile.png" alt="profileimage" style={{borderRadius:"100%"}} />
                </Grid>
                <Grid lg={5}>
                    <Typography>Firstname : {user.firstname} </Typography>
                    <Typography>Lastname : {user.lastname} </Typography>
                    <Typography>Email : {user.email} </Typography>
                    <Typography>DOB : 10/10/1999 </Typography>
                    <Typography>joining Date : 02/03/2023 </Typography>
                    <Typography>leaves : 10 </Typography>
                </Grid>
            </Grid>
            <NavBar/>
            <h2 style={{marginLeft:"20px"}}>Projects</h2>
            <ProjectsTable projects={projects}/>
        </Box>
    )
}
export default HomePage