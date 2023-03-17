import axios from "axios"
import { useEffect, useState } from "react"
import LeaveManagementTable from "../components/LeaveManagementTable"
import NavBar from "../components/NavBar"

const LeaveManagementPage = ({userId})=>{
    const  [projects,setProjects] = useState(null)
    const [reports,setResports] = useState([])


   
    const refreshReports = ()=>{
        console.log("refresh reports reached")
        axios.get(`http://localhost:3333/leaveManagement/getLeaves`,{
            withCredentials:true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })
        .then((res)=>{
          setResports(res.data.reports)
        })
    }

    useEffect(()=>{
         axios.get(`http://localhost:3333/show-user`,{
            withCredentials:true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })
         .then((res)=>{
            setProjects(res.data.user.currentProjects)
         })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3333/leaveManagement/getLeaves`,{
            withCredentials:true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
        })
        .then((res)=>{
            console.log("************?*********",res.data.reports)
          setResports(res.data.reports)
        })
    },[])

    return(
        <div>
           <NavBar/> 
            <h3 style={{marginLeft : "10px"}}>Leave Management</h3>
            <LeaveManagementTable  reports = {reports} projects ={projects} userId = {userId}  refreshReports = {refreshReports}/>
        </div>
    )
}

export default LeaveManagementPage 