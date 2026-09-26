import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/orders', label: 'Orders' },
  { to: '/products', label: 'Products' },
  { to: '/partners', label: 'Delivery Partners' },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="w-56 shrink-0 bg-tandoor text-paper min-h-screen flex flex-col">
      <div className="px-5 py-6">
        <h1 className="font-display italic text-xl">Thela Express</h1>
        <p className="font-body text-xs text-paper/50 mt-0.5">Admin</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-body text-sm transition-colors ${
                isActive ? 'bg-saffron text-tandoor font-medium' : 'text-paper/70 hover:bg-white/10'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 pb-5">
        <button
          onClick={logout}
          className="w-full text-left px-3 py-2 rounded-md font-body text-sm text-paper/60 hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
