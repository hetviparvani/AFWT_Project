import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalStaff: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    totalRevenue: 0,
    activeServices: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/overview", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(() => {});

    fetch("http://localhost:5000/api/appointments?limit=5", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setRecentBookings(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const cards = [
    {
      label: "Total Customers",
      value: stats.totalCustomers || 0,
      icon: "👥",
      bg: "bg-rose-50 border-rose-100",
      text: "text-rose-800",
    },
    {
      label: "Total Staff",
      value: stats.totalStaff || 0,
      icon: "👔",
      bg: "bg-purple-50 border-purple-100",
      text: "text-purple-800",
    },
    {
      label: "Total Bookings",
      value: stats.totalAppointments || 0,
      icon: "📅",
      bg: "bg-sky-50 border-sky-100",
      text: "text-sky-800",
    },
    {
      label: "Total Revenue",
      value: `₹${stats.totalRevenue || 0}`,
      icon: "💰",
      bg: "bg-teal-50 border-teal-100",
      text: "text-teal-800",
    },
  ];

  const statusColor = {
    Confirmed: "bg-sky-100/80 text-sky-800",
    Pending: "bg-amber-100/80 text-amber-800",
    Completed: "bg-teal-100/80 text-teal-800",
    Cancelled: "bg-rose-100/80 text-rose-800",
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Admin Dashboard</h2>
      <p className="text-stone-400 text-xs mb-6">Welcome back, {user?.name || "Admin"} 👋</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((s, i) => (
          <div key={i} className={`${s.bg} border rounded-2xl p-4 shadow-xs`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className={`text-xl font-semibold ${s.text}`}>{s.value}</p>
            <p className="text-stone-400 text-[11px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Recent Bookings</h3>
          {loading ? (
            <p className="text-stone-400 text-xs">Loading...</p>
          ) : recentBookings.length === 0 ? (
            <p className="text-stone-400 text-xs">No bookings recorded yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between py-2 border-b border-stone-100/60 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium text-stone-700">{b.customer?.name || "Customer"}</p>
                    <p className="text-[11px] text-stone-400">
                      {b.service?.name || "Service"} · {b.date}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                      statusColor[b.status] || "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Salon Live Overview</h3>
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center py-1.5 border-b border-stone-100/60">
              <span className="text-xs text-stone-500">Today's Bookings</span>
              <span className="font-semibold text-teal-800 text-xs">{stats.todayAppointments || 0}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-stone-100/60">
              <span className="text-xs text-stone-500">Pending Approvals</span>
              <span className="font-semibold text-amber-800 text-xs">{stats.pendingAppointments || 0}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-stone-100/60">
              <span className="text-xs text-stone-500">Active Services</span>
              <span className="font-semibold text-sky-800 text-xs">{stats.activeServices || 0}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-xs text-stone-500">Total System Users</span>
              <span className="font-semibold text-stone-700 text-xs">
                {(stats.totalCustomers || 0) + (stats.totalStaff || 0) + 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;