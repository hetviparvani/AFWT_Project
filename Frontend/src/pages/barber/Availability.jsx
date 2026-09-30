import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Availability() {
  const { user, token } = useAuth();
  const [timeOffs, setTimeOffs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [msg, setMsg] = useState("");

  const fetchTimeOffs = () => {
    fetch("http://localhost:5000/api/staff/my-time-off", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setTimeOffs(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchTimeOffs();
  }, [token]);

  const handleRequestTimeOff = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/staff/time-off", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ startDate, endDate, reason }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to submit request");
      }

      setMsg("Time off request submitted successfully!");
      setStartDate("");
      setEndDate("");
      setReason("");
      fetchTimeOffs();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const statusColor = {
    Approved: "bg-teal-100/80 text-teal-800",
    Pending: "bg-amber-100/80 text-amber-800",
    Rejected: "bg-rose-100/80 text-rose-800",
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Manage Availability</h2>
      <p className="text-stone-400 text-xs mb-6">View working hours and request time off live</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/80 border border-stone-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-3">My Working Schedule</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-400">Working Hours:</span>
              <span className="font-medium text-stone-700">
                {user?.workingHours?.start || "09:00"} - {user?.workingHours?.end || "18:00"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-stone-100">
              <span className="text-stone-400">Working Days:</span>
              <span className="font-medium text-stone-700">
                {user?.workingDays?.join(", ") || "Monday - Saturday"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-stone-400">Specializations:</span>
              <span className="font-medium text-stone-700">
                {user?.specializations?.join(", ") || "General Styling"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-sky-50/40 border border-sky-100 rounded-2xl p-5 shadow-xs">
          <h3 className="font-medium text-stone-700 text-sm mb-3">Request Time Off</h3>
          {msg && (
            <div className="bg-white/80 text-stone-700 text-xs rounded-xl p-2.5 mb-3 border border-sky-100">
              {msg}
            </div>
          )}
          <form onSubmit={handleRequestTimeOff} className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-stone-500 mb-1 block">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full bg-white border border-sky-200 rounded-xl p-1.5 text-xs text-stone-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 mb-1 block">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full bg-white border border-sky-200 rounded-xl p-1.5 text-xs text-stone-700 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="e.g. Personal vacation"
                className="w-full bg-white border border-sky-200 rounded-xl p-1.5 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-sky-200 hover:bg-sky-300 text-sky-900 text-xs font-medium py-2 rounded-xl transition"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100">
          <h3 className="font-medium text-stone-700 text-sm">My Time Off Requests</h3>
        </div>
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Dates</th>
              <th className="text-left p-3.5 font-medium">Reason</th>
              <th className="text-left p-3.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {timeOffs.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-stone-400">
                  No time off requests filed.
                </td>
              </tr>
            ) : (
              timeOffs.map((t) => (
                <tr key={t._id} className="border-b border-stone-100/60 last:border-0">
                  <td className="p-3.5 text-stone-700">
                    {t.startDate} to {t.endDate}
                  </td>
                  <td className="p-3.5 text-stone-500">{t.reason}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        statusColor[t.status] || "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {t.status}
                    </span>
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

export default Availability;