import axios from "axios"
import { useEffect, useState } from "react"
import LeaveManagementTable from "../components/LeaveManagementTable"
import NavBar from "../components/NavBar"

const LeaveManagementPage = ({userId})=>{
    const  [user,setUser] = useState([])
    useEffect(()=>{
         axios.get(`http://localhost:3333/show-user/${userId}`)
         .then((res)=>{

            console.log("response-->",res.data.user.currentProjects)
            setUser(res.data.user.currentProjects)
         })
    },[])

    return(
        <div>
           <NavBar/> 
            <h3>Leave Management</h3>
            <LeaveManagementTable user ={user} userId = {userId}/>
        </div>
    )
}

export default LeaveManagementPage 