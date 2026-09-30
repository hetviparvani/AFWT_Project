import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Customers() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users?role=Customer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCustomers(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Customers</h2>
      <p className="text-stone-400 text-xs mb-6">Registered customers</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total Registered Customers</p>
          <p className="text-xl font-semibold text-sky-800">{customers.length}</p>
        </div>
        <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Active Accounts</p>
          <p className="text-xl font-semibold text-teal-800">
            {customers.filter((c) => c.isActive !== false).length}
          </p>
        </div>
      </div>

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Name</th>
              <th className="text-left p-3.5 font-medium">Phone</th>
              <th className="text-left p-3.5 font-medium">Email</th>
              <th className="text-left p-3.5 font-medium">Status</th>
              <th className="text-left p-3.5 font-medium">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  No customers registered in database.
                </td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-teal-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{c.name}</td>
                  <td className="p-3.5 text-stone-500">{c.phone || "—"}</td>
                  <td className="p-3.5 text-stone-500">{c.email}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        c.isActive !== false ? "bg-teal-100/80 text-teal-800" : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {c.isActive !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "—"}
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

export default Customers;