import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import Register from './pages/Register';
import Index from './pages/Index';
import DashboardAdmin from './pages/DashboardAdmin';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
        <Route path="/productos" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/agregar-producto" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboardAdmin" element={<ProtectedRoute><DashboardAdmin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
