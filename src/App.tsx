// import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Register from './pages/Regiter'
import Login from './pages/Login'
import UnAuthorized from './pages/UnAuthorized'
import InsertData from './pages/InsertData'
import Footer from './component/Footer'
import ProtectedRoute from './ProtectedRoute'
import Layout from './component/Layout'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/unauthorized' element={<UnAuthorized/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route element={<ProtectedRoute allowedRoles={['user','admin']} />}>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/insert-data' element={<InsertData/>}/>
          </Route>
        </Route>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
