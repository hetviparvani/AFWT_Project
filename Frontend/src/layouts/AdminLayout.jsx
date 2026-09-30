import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/admin/employees", label: "Employees", icon: "👥" },
    { to: "/admin/pricing", label: "Pricing", icon: "🏷️" },
    { to: "/admin/reports", label: "Reports", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">
      <aside className="w-56 bg-rose-50/40 border-r border-rose-100/60 flex flex-col">
        <div className="p-5 border-b border-rose-100/60 text-center">
          <div className="text-4xl mb-2">🛡️</div>
          <p className="font-medium text-stone-700 text-xs">{user?.name || "Admin"}</p>
          <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-medium">Admin</span>
        </div>

        <nav className="flex-1 p-3 flex flex-col gap-1">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition ${
                location.pathname === link.to
                  ? "bg-rose-100/80 text-rose-800 font-medium"
                  : "text-stone-600 hover:bg-rose-100/40"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-3">
          <button
            onClick={handleLogout}
            className="w-full bg-rose-100/50 hover:bg-rose-200/60 text-rose-800 text-xs py-2 rounded-xl transition"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;