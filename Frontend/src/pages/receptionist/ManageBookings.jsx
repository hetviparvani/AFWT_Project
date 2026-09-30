import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function ManageBookings() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [customer, setCustomer] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00");

  const fetchBookings = () => {
    fetch("http://localhost:5000/api/appointments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBookings(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();

    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setServices(data.data);
      });

    fetch("http://localhost:5000/api/users/barbers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setBarbers(data.data);
      });

    fetch("http://localhost:5000/api/users?role=Customer", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) setCustomers(data.data);
      });
  }, [token]);

  const addBooking = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service, barber, date, timeSlot }),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to create booking");
      }

      setCustomer("");
      setService("");
      setBarber("");
      setDate("");
      setTimeSlot("10:00");
      setShowForm(false);
      fetchBookings();
    } catch (err) {
      setError(err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchBookings();
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-stone-700">Manage Bookings</h2>
          <p className="text-stone-400 text-xs">View, confirm, and update all salon bookings live</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-teal-200 hover:bg-teal-300 text-teal-900 text-xs font-medium px-4 py-2 rounded-xl transition"
        >
          {showForm ? "Close Form" : "+ New Booking"}
        </button>
      </div>

      {error && (
        <div className="bg-rose-100/70 text-rose-700 text-xs rounded-xl p-3 mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-teal-50/40 border border-teal-100 rounded-2xl p-5 shadow-xs mb-6">
          <h3 className="font-medium text-stone-700 text-sm mb-4">Create New Booking</h3>
          <form onSubmit={addBooking} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full bg-white border border-teal-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="">Select Service</option>
                {services.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} (₹{s.price})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Barber</label>
              <select
                value={barber}
                onChange={(e) => setBarber(e.target.value)}
                required
                className="w-full bg-white border border-teal-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="">Select Barber</option>
                {barbers.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-white border border-teal-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                required
                className="w-full bg-white border border-teal-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
              </select>
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-teal-200 hover:bg-teal-300 text-teal-900 text-xs font-medium px-4 py-2 rounded-xl transition"
              >
                Add Booking
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
              <th className="text-left p-3.5 font-medium">Customer</th>
              <th className="text-left p-3.5 font-medium">Service</th>
              <th className="text-left p-3.5 font-medium">Barber</th>
              <th className="text-left p-3.5 font-medium">Date</th>
              <th className="text-left p-3.5 font-medium">Time</th>
              <th className="text-left p-3.5 font-medium">Amount</th>
              <th className="text-left p-3.5 font-medium">Status</th>
              <th className="text-left p-3.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-stone-400">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-4 text-center text-stone-400">
                  No bookings found in database.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-teal-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{b.customer?.name || "Walk-in Customer"}</td>
                  <td className="p-3.5 text-stone-500">{b.service?.name || "Service"}</td>
                  <td className="p-3.5 text-stone-500">{b.barber?.name || "Barber"}</td>
                  <td className="p-3.5 text-stone-500">{b.date}</td>
                  <td className="p-3.5 text-stone-500">{b.timeSlot}</td>
                  <td className="p-3.5 text-stone-700 font-medium">₹{b.totalAmount || b.service?.price || 0}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        statusColor[b.status] || "bg-stone-100 text-stone-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3.5 flex gap-2">
                    {b.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(b._id, "Confirmed")}
                        className="text-[11px] text-sky-700 hover:underline"
                      >
                        Confirm
                      </button>
                    )}
                    {b.status !== "Completed" && b.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(b._id, "Completed")}
                        className="text-[11px] text-teal-700 hover:underline"
                      >
                        Done
                      </button>
                    )}
                    {b.status !== "Cancelled" && (
                      <button
                        onClick={() => updateStatus(b._id, "Cancelled")}
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

export default ManageBookings;