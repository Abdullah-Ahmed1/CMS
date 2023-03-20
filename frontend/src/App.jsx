import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import HomePage from './pages/HomePage'
import LeaveManagementPage from './pages/LeaveManagementPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Hierarchy from './pages/HierarchyPage'
import LoginForm from './pages/LoginPage'
import RegisterForm from './pages/RegisterForm'
import VerifyUser from './pages/VerifyUser'
import axios from 'axios'
import UserProtectedRoute from './components/ProtectedRoutes/UserProtectedRoute'


// const validateToken = ()=>{
//   // console.log("reached validate token")
//   return new Promise((resolve,reject)=>{
//     axios.get('http://localhost:3333/me',{
//       withCredentials:true,
//       headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
//   })
//     .then((res)=>{
//       resolve(true)
//     })
//     .catch((err)=>{
//       reject(false)
//     }) 
//   })
// }



function App() {
  // // const [count, setCount] = useState(0)
  //   const [userId,setUSerId] = useState('6410193d52adec0926941b19')   
    

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route element={<UserProtectedRoute />}>
          <Route exact path='/'  element = {<HomePage />}/>
          <Route exact path='/leave-management'  element = {<LeaveManagementPage  />}/>
          <Route exact path='/hierarchy'  element = {<Hierarchy  />}/>
        </Route>
      
        <Route exact path='/login'  element = {<LoginForm  />}/>
        <Route exact path='/register'  element = {<RegisterForm  />}/>
        <Route exact path="/users/:id/verify/:token" element={<VerifyUser/>} />

        </Routes>
      </Router>
     
    </div>
  )
}

export default App
