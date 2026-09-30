import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, demoUsers } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleRoutes = {
    Customer: "/customer/dashboard",
    Barber: "/barber/dashboard",
    Receptionist: "/receptionist/dashboard",
    Admin: "/admin/dashboard",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(roleRoutes[user.role] || "/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillUser = (e) => {
    const selected = demoUsers.find((u) => u.email === e.target.value);
    if (selected) {
      setEmail(selected.email);
      setPassword(selected.password);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50/60 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-rose-100 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3"></div>
          <h2 className="text-2xl font-medium text-stone-700">Welcome Back</h2>
          <p className="text-stone-400 text-sm">Sign in to Glamour Salon</p>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-stone-500 mb-1">Quick Login As</label>
          <select
            onChange={fillUser}
            className="w-full bg-rose-50/50 border border-rose-200 rounded-xl p-2.5 text-sm text-stone-600 focus:outline-none focus:border-rose-300"
            defaultValue=""
          >
            <option value="">-- Select a test user --</option>
            {demoUsers.map((u) => (
              <option key={u.id} value={u.email}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-rose-100/70 text-rose-700 text-sm rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-xs font-medium text-stone-500 mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-stone-500 mb-1">Password</label>
            <input
              type="password"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-300 hover:bg-rose-400 text-rose-900 font-medium py-2.5 rounded-xl shadow-xs transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-rose-400 hover:text-rose-500 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;