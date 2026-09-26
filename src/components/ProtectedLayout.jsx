import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

const ProtectedLayout = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="font-body text-clay p-6">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
