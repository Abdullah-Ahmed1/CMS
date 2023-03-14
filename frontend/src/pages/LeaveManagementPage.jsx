import axios from "axios"
import { useEffect, useState } from "react"
import LeaveManagementTable from "../components/LeaveManagementTable"
import NavBar from "../components/NavBar"

const LeaveManagementPage = ({userId})=>{
    const  [projects,setProjects] = useState(null)
    const [reports,setResports] = useState([])
    useEffect(()=>{
         axios.get(`http://localhost:3333/show-user/${userId}`)
         .then((res)=>{

            setProjects(res.data.user.currentProjects)
         })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3333/leaveManagement/getLeaves/${userId}`)
        .then((res)=>{
          setResports(res.data.reports)
        })
    },[])

    return(
        <div>
           <NavBar/> 
            <h3>Leave Management</h3>
            <LeaveManagementTable  reports = {reports} projects ={projects} userId = {userId}/>
        </div>
    )
}

export default LeaveManagementPage 