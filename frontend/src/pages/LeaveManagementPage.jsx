import LeaveManagementTable from "../components/LeaveManagementTable"
import NavBar from "../components/NavBar"

const LeaveManagementPage = ({userId})=>{
    return(
        <div>
           <NavBar/> 
            <h3>Leave Management</h3>
            <LeaveManagementTable userId = {userId}/>
        </div>
    )
}

export default LeaveManagementPage 