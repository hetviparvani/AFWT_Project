import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Employees() {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("Barber");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("barber123");

  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/staff", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setEmployees(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployees();
  }, [token]);

  const addEmployee = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          role,
          phone,
          email,
          password,
          commissionRate: role === "Barber" ? 30 : 0,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to add employee");
      }

      setName("");
      setRole("Barber");
      setPhone("");
      setEmail("");
      setPassword("barber123");
      setShowForm(false);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/staff/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        fetchEmployees();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-stone-700">Employees</h2>
          <p className="text-stone-400 text-xs">Manage salon staff members</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-200 hover:bg-rose-300 text-rose-800 text-xs font-medium px-4 py-2 rounded-xl transition"
        >
          {showForm ? "Close Form" : "+ Add Employee"}
        </button>
      </div>

      {error && (
        <div className="bg-rose-100/70 text-rose-700 text-xs rounded-xl p-3 mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 shadow-xs mb-6">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Add New Employee</h3>
          <form onSubmit={addEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Employee name"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="Barber">Barber</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Phone number"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[11px] text-stone-500 mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-rose-200 hover:bg-rose-300 text-rose-800 text-xs px-4 py-2 rounded-xl font-medium transition"
              >
                Add Employee
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-stone-200/60 text-stone-600 text-xs px-4 py-2 rounded-xl hover:bg-stone-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Name</th>
              <th className="text-left p-3.5 font-medium">Role</th>
              <th className="text-left p-3.5 font-medium">Phone</th>
              <th className="text-left p-3.5 font-medium">Email</th>
              <th className="text-left p-3.5 font-medium">Status</th>
              <th className="text-left p-3.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-stone-400">
                  Loading employees...
                </td>
              </tr>
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-stone-400">
                  No staff members found.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-rose-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{emp.name}</td>
                  <td className="p-3.5 text-stone-500">{emp.role}</td>
                  <td className="p-3.5 text-stone-500">{emp.phone || "—"}</td>
                  <td className="p-3.5 text-stone-500">{emp.email}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        emp.isActive !== false ? "bg-teal-100/80 text-teal-800" : "bg-stone-100 text-stone-400"
                      }`}
                    >
                      {emp.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => deleteEmployee(emp._id)}
                      className="text-[11px] text-rose-700 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;