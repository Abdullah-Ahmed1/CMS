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

function App() {
  // const [count, setCount] = useState(0)
    const [userId,setUSerId] = useState('640add0a9f41107cfd4d7372')   
  

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/'  element = {<HomePage   userId = {userId} />}/>
        <Route path='/leave-management'  element = {<LeaveManagementPage  userId = {userId} />}/>
        <Route path='/hierarchy'  element = {<Hierarchy  userId = {userId} />}/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
