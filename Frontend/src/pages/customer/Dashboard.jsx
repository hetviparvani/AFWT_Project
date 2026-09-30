import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState({
    upcomingAppointments: [],
    pastAppointments: [],
    recentOrders: [],
    totalSpent: 0,
    totalAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboard = () => {
    fetch("http://localhost:5000/api/dashboard/customer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && resData.data) {
          setData(resData.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  const cards = [
    {
      to: "/customer/bookings",
      label: "My Bookings",
      icon: "📅",
      count: `${data.upcomingAppointments?.length || 0} upcoming`,
      bg: "bg-rose-50/80 border-rose-100",
      text: "text-rose-800",
    },
    {
      to: "/customer/services",
      label: "Book Service",
      icon: "✂️",
      count: "Explore services",
      bg: "bg-purple-50/80 border-purple-100",
      text: "text-purple-800",
    },
    {
      to: "/customer/orders",
      label: "My Orders",
      icon: "🛍️",
      count: `${data.recentOrders?.length || 0} orders`,
      bg: "bg-sky-50/80 border-sky-100",
      text: "text-sky-800",
    },
    {
      to: "/customer/profile",
      label: "Total Spent",
      icon: "💳",
      count: `₹${data.totalSpent || 0}`,
      bg: "bg-teal-50/80 border-teal-100",
      text: "text-teal-800",
    },
  ];

  const statusColor = {
    Confirmed: "bg-teal-100/70 text-teal-800",
    Pending: "bg-amber-100/70 text-amber-800",
    Completed: "bg-sky-100/70 text-sky-800",
    Cancelled: "bg-rose-100/70 text-rose-800",
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Customer Dashboard</h2>
      <p className="text-stone-400 text-xs mb-6">Welcome back, {user?.name || "Customer"} 👋</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map((c, i) => (
          <Link key={i} to={c.to} className="no-underline">
            <div className={`${c.bg} border rounded-2xl p-4 hover:shadow-xs transition`}>
              <div className="text-3xl mb-2">{c.icon}</div>
              <p className={`font-medium text-xs ${c.text}`}>{c.label}</p>
              <p className="text-[11px] text-stone-400 mt-1">{c.count}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
        <h3 className="font-medium text-stone-700 text-sm mb-4">Upcoming Appointments</h3>
        {loading ? (
          <p className="text-stone-400 text-xs">Loading appointments...</p>
        ) : data.upcomingAppointments?.length === 0 ? (
          <p className="text-stone-400 text-xs">No upcoming appointments scheduled.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.upcomingAppointments.map((b) => (
              <div
                key={b._id}
                className="flex items-center justify-between py-2.5 border-b border-stone-100/60 last:border-0"
              >
                <div>
                  <p className="text-xs font-medium text-stone-700">{b.service?.name || "Service"}</p>
                  <p className="text-[11px] text-stone-400">
                    with {b.barber?.name || "Barber"} · {b.date} at {b.timeSlot}
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
    </div>
  );
}

export default Dashboard;