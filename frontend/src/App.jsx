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

function App() {
  const [count, setCount] = useState(0)
  const userId = '64081d344d9fbcae0698c5b3'

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/'  element = {<HomePage   userId = {userId} />}/>
        <Route path='/leave-management'  element = {<LeaveManagementPage  userId = {userId} />}/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App