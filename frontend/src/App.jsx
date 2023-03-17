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

function App() {
  // const [count, setCount] = useState(0)
    const [userId,setUSerId] = useState('6410193d52adec0926941b19')   
  

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path='/'  element = {<HomePage   userId = {userId} />}/>
        <Route exact path='/leave-management'  element = {<LeaveManagementPage  userId = {userId} />}/>
        <Route exact path='/hierarchy'  element = {<Hierarchy  userId = {userId} />}/>
        <Route exact path='/login'  element = {<LoginForm  />}/>
        <Route exact path='/register'  element = {<RegisterForm  />}/>
        <Route exact path="/users/:id/verify/:token" element={<VerifyUser/>} />

        </Routes>
      </Router>
     
    </div>
  )
}

export default App
