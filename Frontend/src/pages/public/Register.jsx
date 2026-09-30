import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.phone, formData.password);
      navigate("/customer/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rose-50/60 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-rose-100 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✨</div>
          <h2 className="text-2xl font-medium text-stone-700">Create Account</h2>
          <p className="text-stone-400 text-sm">Join Glamour Salon today</p>
        </div>

        {error && (
          <div className="bg-rose-100/70 text-rose-700 text-sm rounded-xl p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-500 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-500 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-500 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-stone-500 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium text-stone-500 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm text-stone-700 focus:outline-none focus:border-rose-300"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-300 hover:bg-rose-400 text-rose-900 font-medium py-2.5 rounded-xl shadow-xs transition"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-400 hover:text-rose-500 font-medium">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;