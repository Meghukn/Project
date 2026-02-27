import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { useContext } from 'react';
import { AuthContext } from "./context/AuthContext";
import { Navigate } from 'react-router-dom';


function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)

  if (!user) {
    return <Navigate to="/" replace/>;
  }
  return children;
}

function App() {
  const {user} = useContext(AuthContext)

  return (
    <Router>
      {user && <Navbar/>}
      <div style={{maxWidth: "1100px", margin: "40px auto", padding: "0 20px"}}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" replace/> : <Login/>}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" replace/> : <Register/>}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/"}replace />}
          />

        </Routes>
      </div>
    </Router>
  )
}

export default App
