import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedLayout from './components/ProtectedLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import DeliveryPartners from './pages/DeliveryPartners';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
        <Route path="/orders" element={<ProtectedLayout><Orders /></ProtectedLayout>} />
        <Route path="/products" element={<ProtectedLayout><Products /></ProtectedLayout>} />
        <Route path="/partners" element={<ProtectedLayout><DeliveryPartners /></ProtectedLayout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
