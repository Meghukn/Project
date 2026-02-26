import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import { Navigate } from 'react-router-dom';

function App() {
  const {user} = useContext(AuthContext)

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App
