import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({ totalAppointments: 0, totalSpent: 0, recentOrders: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/customer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setStats(data.data);
        }
      })
      .catch(() => {});
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">My Profile</h2>
      <p className="text-stone-400 text-xs mb-6">Your account details</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rose-50/60 border border-rose-100 rounded-2xl p-6 shadow-xs text-center">
          <div className="w-16 h-16 bg-rose-100 text-rose-800 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
            👤
          </div>
          <h3 className="font-medium text-stone-700 text-sm">{user?.name || "Customer"}</h3>
          <span className="text-[10px] bg-rose-200/70 text-rose-800 font-medium px-3 py-0.5 rounded-full mt-1 inline-block">
            {user?.role || "Customer"}
          </span>
        </div>

        <div className="md:col-span-2 bg-white/80 border border-stone-100 rounded-2xl p-6 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Account Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Full Name</label>
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2 text-xs text-stone-700">
                {user?.name || "—"}
              </div>
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Email Address</label>
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2 text-xs text-stone-700">
                {user?.email || "—"}
              </div>
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Phone Number</label>
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2 text-xs text-stone-700">
                {user?.phone || "Not set"}
              </div>
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Role</label>
              <div className="bg-stone-50 border border-stone-200/60 rounded-xl p-2 text-xs text-stone-700">
                {user?.role || "Customer"}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100">
            <h4 className="text-xs font-medium text-stone-600 mb-3">Live Statistics</h4>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-rose-600">{stats.totalAppointments || 0}</p>
                <p className="text-[10px] text-stone-400">Completed Bookings</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-sky-600">{stats.recentOrders?.length || 0}</p>
                <p className="text-[10px] text-stone-400">Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-teal-600">₹{stats.totalSpent || 0}</p>
                <p className="text-[10px] text-stone-400">Total Spent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;