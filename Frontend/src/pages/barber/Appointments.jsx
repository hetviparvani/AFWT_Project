import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Appointments() {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    fetch("http://localhost:5000/api/appointments/barber", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setAppointments(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAppointments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const statusColor = {
    Confirmed: "bg-sky-100/80 text-sky-800",
    Pending: "bg-amber-100/80 text-amber-800",
    Completed: "bg-teal-100/80 text-teal-800",
    Cancelled: "bg-rose-100/80 text-rose-800",
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">My Appointments</h2>
      <p className="text-stone-400 text-xs mb-6">View and update appointment statuses live</p>

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Customer</th>
              <th className="text-left p-3.5 font-medium">Phone</th>
              <th className="text-left p-3.5 font-medium">Service</th>
              <th className="text-left p-3.5 font-medium">Date</th>
              <th className="text-left p-3.5 font-medium">Time</th>
              <th className="text-left p-3.5 font-medium">Status</th>
              <th className="text-left p-3.5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-stone-400">
                  Loading appointments...
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center text-stone-400">
                  No appointments found for this barber account.
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr
                  key={a._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-sky-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{a.customer?.name || "Customer"}</td>
                  <td className="p-3.5 text-stone-500">{a.customer?.phone || "—"}</td>
                  <td className="p-3.5 text-stone-500">{a.service?.name || "Service"}</td>
                  <td className="p-3.5 text-stone-500">{a.date}</td>
                  <td className="p-3.5 text-stone-500">{a.timeSlot}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        statusColor[a.status] || "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="p-3.5">
                    {a.status !== "Completed" && a.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(a._id, "Completed")}
                        className="text-[11px] text-teal-700 hover:underline mr-3"
                      >
                        Mark Done
                      </button>
                    )}
                    {a.status !== "Cancelled" && a.status !== "Completed" && (
                      <button
                        onClick={() => updateStatus(a._id, "Cancelled")}
                        className="text-[11px] text-rose-700 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
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

export default Appointments;