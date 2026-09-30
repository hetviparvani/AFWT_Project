import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute = {
    Customer: "/customer/dashboard",
    Barber: "/barber/dashboard",
    Receptionist: "/receptionist/dashboard",
    Admin: "/admin/dashboard",
  };

  const isActive = (path) => location.pathname === path ? "bg-rose-100/70 text-rose-700 font-medium" : "text-stone-600 hover:bg-rose-50";

  return (
    <nav className="bg-rose-50/40 border-b border-rose-100/80 px-6 py-3.5 flex items-center justify-between">
      <Link to="/" className="text-xl font-medium text-stone-700 tracking-wide flex items-center gap-2">
        <span className="text-2xl">✂️</span> Glamour Salon
      </Link>

      <div className="flex items-center gap-2">
        <Link to="/" className={`text-xs px-3 py-1.5 rounded-xl transition ${isActive("/")}`}>Home</Link>
        <Link to="/services" className={`text-xs px-3 py-1.5 rounded-xl transition ${isActive("/services")}`}>Services</Link>
        <Link to="/products" className={`text-xs px-3 py-1.5 rounded-xl transition ${isActive("/products")}`}>Products</Link>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link to={dashboardRoute[user.role] || "/"} className="text-xs bg-rose-100/60 text-stone-700 px-3 py-1.5 rounded-xl hover:bg-rose-100">
              👤 {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-rose-200/80 hover:bg-rose-300 text-rose-800 text-xs px-3 py-1.5 rounded-xl transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-xs text-stone-600 border border-rose-200 bg-white/70 px-3.5 py-1.5 rounded-xl hover:bg-rose-50">
              Login
            </Link>
            <Link to="/register" className="text-xs bg-rose-200 hover:bg-rose-300 text-rose-800 font-medium px-3.5 py-1.5 rounded-xl transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;