import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, token } = useAuth();
  const [data, setData] = useState({
    todayAppointments: [],
    upcomingAppointments: [],
    monthlyEarnings: { totalEarnings: 0, totalCommission: 0, servicesCompleted: 0 },
    totalCompleted: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/barber", {
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
  }, [token]);

  const stats = [
    {
      label: "Today's Appointments",
      value: data.todayAppointments?.length || 0,
      icon: "📅",
      bg: "bg-sky-50 border-sky-100",
      text: "text-sky-800",
    },
    {
      label: "Total Completed",
      value: data.totalCompleted || 0,
      icon: "✅",
      bg: "bg-teal-50 border-teal-100",
      text: "text-teal-800",
    },
    {
      label: "Monthly Earnings",
      value: `₹${data.monthlyEarnings?.totalEarnings || 0}`,
      icon: "💰",
      bg: "bg-amber-50 border-amber-100",
      text: "text-amber-800",
    },
    {
      label: "Commission Rate",
      value: `${user?.commissionRate || 30}%`,
      icon: "📊",
      bg: "bg-rose-50 border-rose-100",
      text: "text-rose-800",
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
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Barber Dashboard</h2>
      <p className="text-stone-400 text-xs mb-6">Welcome, {user?.name || "Barber"} ✂️</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={`${s.bg} border rounded-2xl p-4 shadow-xs`}>
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className={`text-xl font-semibold ${s.text}`}>{s.value}</p>
            <p className="text-stone-400 text-[11px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
        <h3 className="font-medium text-stone-700 text-sm mb-4">Today's Schedule</h3>
        {loading ? (
          <p className="text-stone-400 text-xs">Loading schedule...</p>
        ) : data.todayAppointments?.length === 0 ? (
          <p className="text-stone-400 text-xs">No appointments scheduled for today.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {data.todayAppointments.map((a) => (
              <div
                key={a._id}
                className="flex items-center justify-between py-2.5 border-b border-stone-100/60 last:border-0"
              >
                <div>
                  <p className="text-xs font-medium text-stone-700">{a.customer?.name || "Customer"}</p>
                  <p className="text-[11px] text-stone-400">
                    {a.service?.name || "Service"} · {a.timeSlot}
                  </p>
                </div>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                    statusColor[a.status] || "bg-stone-100 text-stone-600"
                  }`}
                >
                  {a.status}
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