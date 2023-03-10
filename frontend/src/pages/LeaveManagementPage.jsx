import axios from "axios"
import { useEffect, useState } from "react"
import LeaveManagementTable from "../components/LeaveManagementTable"
import NavBar from "../components/NavBar"

const LeaveManagementPage = ({userId})=>{
    const  [user,setUser] = useState([])
    const [reports,setResports] = useState([])
    useEffect(()=>{
         axios.get(`http://localhost:3333/show-user/${userId}`)
         .then((res)=>{

            console.log("response-->",res.data.user.currentProjects)
            setUser(res.data.user.currentProjects)
         })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:3333/leaveManagement/getLeaves/${userId}`)
        .then((res)=>{
          console.log("reports--->",res.data.reports)
          setResports(res.data.reports)
        })
    },[])

    return(
        <div>
           <NavBar/> 
            <h3>Leave Management</h3>
            <LeaveManagementTable  reports = {reports} user ={user} userId = {userId}/>
        </div>
    )
}

export default LeaveManagementPage 