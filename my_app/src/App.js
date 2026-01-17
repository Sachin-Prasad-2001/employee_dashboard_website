import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Login from './components/Login.js'
import Dashboard from './components/Dashboard.js'
import ProtectedRoute from './components/ProtectedRoute.js';
import AuthProvider from './components/AuthProvider.js';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
