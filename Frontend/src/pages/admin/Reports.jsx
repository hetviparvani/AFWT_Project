import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Reports() {
  const { token } = useAuth();
  const [monthlyData, setMonthlyData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [overview, setOverview] = useState({
    totalRevenue: 0,
    totalAppointments: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/analytics/revenue", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.monthlyData) {
          setMonthlyData(data.data.monthlyData);
        }
      })
      .catch(() => {});

    fetch("http://localhost:5000/api/analytics/service-popularity", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.serviceStats) {
          setTopServices(data.data.serviceStats);
        }
      })
      .catch(() => {});

    fetch("http://localhost:5000/api/analytics/overview", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOverview(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const maxMonthlyRevenue = Math.max(...monthlyData.map((m) => m.totalRevenue || 0), 100);

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Reports & Analytics</h2>
      <p className="text-stone-400 text-xs mb-6">Business overview and live analytics</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total System Revenue</p>
          <p className="text-xl font-semibold text-rose-800">₹{overview.totalRevenue || 0}</p>
          <p className="text-[10px] text-teal-700 mt-0.5"></p>
        </div>
        <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total Appointments</p>
          <p className="text-xl font-semibold text-teal-800">{overview.totalAppointments || 0}</p>
          <p className="text-[10px] text-teal-700 mt-0.5">All time</p>
        </div>
        <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Total Customers</p>
          <p className="text-xl font-semibold text-sky-800">{overview.totalCustomers || 0}</p>
          <p className="text-[10px] text-stone-400 mt-0.5">Registered accounts</p>
        </div>
        <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 shadow-xs">
          <p className="text-[11px] text-stone-400 mb-1">Customer Rating</p>
          <p className="text-xl font-semibold text-purple-800">4.9 ⭐</p>
          <p className="text-[10px] text-stone-400 mt-0.5">Salon feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Monthly Revenue Analytics</h3>
          {loading ? (
            <p className="text-stone-400 text-xs">Loading analytics...</p>
          ) : (
            <div className="flex flex-col gap-2">
              {monthlyData.slice(0, 8).map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-stone-100/60 last:border-0"
                >
                  <span className="text-xs text-stone-500 w-12">{m.month}</span>
                  <div className="flex-1 mx-3">
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-rose-300 rounded-full transition-all"
                        style={{
                          width: `${((m.totalRevenue || 0) / maxMonthlyRevenue) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-stone-600 w-16 text-right">{m.appointmentCount || 0} bks</span>
                  <span className="text-xs font-semibold text-teal-800 w-20 text-right">
                    ₹{m.totalRevenue || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Service Popularity</h3>
          {topServices.length === 0 ? (
            <p className="text-stone-400 text-xs">No service bookings recorded yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {topServices.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b border-stone-100/60 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium text-stone-700">{s.serviceName || s.name}</p>
                    <p className="text-[11px] text-stone-400">
                      {s.bookings || 0} completed bookings ({s.category})
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-teal-800">
                    ₹{s.totalRevenue || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;