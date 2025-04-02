import React from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from "./SignUp"
import Layout from "./Layout"
import Login from "./Login"
import '../src/index.css'
import DashboardView from "./DashboardMaterial/DashboardView"
import WelcomePage from './UserContent/WelcomePage'
import DepartmentsPage from "./UserContent/DepartmentPage"
import ApplyPage from "./UserContent/Application"
import UserLayout from "./UserContent/userLayout"
function App() {
  return(
  <BrowserRouter>
  <Routes>
    <Route path ="/" element={<Layout/>}>
    <Route path="/dashboard" element={<DashboardView/>}/>
    </Route>
    {/*User Layout */}
    <Route path='' element={<UserLayout/>}>
    <Route path="/welcome" element={<WelcomePage/>}/>
    <Route path="/department" element={<DepartmentsPage/>}/>
    <Route path="/apply" element={<ApplyPage/>}/>
    </Route>
    <Route path="" index element={<SignUp/>}/>
    <Route path="/signup"  element={<SignUp/>}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
