import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tandoor px-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm">
        <h1 className="font-display italic text-2xl text-ink mb-1">Thela Express</h1>
        <p className="font-body text-sm text-clay mb-6">Admin Dashboard Login</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-clay/30 rounded-md px-3 py-2 font-body text-sm"
          />
          {error && <p className="text-chili font-body text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-tandoor text-paper font-body font-semibold py-3 rounded-md hover:bg-chili transition disabled:opacity-50"
          >
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="font-body text-xs text-clay mt-4">
          Admin accounts are created manually by the developer — no self-signup.
        </p>
      </div>
    </div>
  );
};

export default Login;
