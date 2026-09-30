import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Schedule() {
  const { token } = useAuth();
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/barbers", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBarbers(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Barber Schedule</h2>
      <p className="text-stone-400 text-xs mb-6">Weekly working schedule of salon barbers</p>

      <div className="bg-white/80 border border-stone-100 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-stone-50 text-stone-500 border-b border-stone-100">
            <tr>
              <th className="text-left p-3.5 font-medium">Barber</th>
              <th className="text-left p-3.5 font-medium">Specializations</th>
              <th className="text-left p-3.5 font-medium">Working Hours</th>
              <th className="text-left p-3.5 font-medium">Working Days</th>
              <th className="text-left p-3.5 font-medium">Experience</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  Loading schedules...
                </td>
              </tr>
            ) : barbers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  No barbers found.
                </td>
              </tr>
            ) : (
              barbers.map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-teal-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{b.name}</td>
                  <td className="p-3.5 text-stone-500">
                    {b.specializations?.join(", ") || "General Styling"}
                  </td>
                  <td className="p-3.5 text-stone-500">
                    {b.workingHours?.start || "09:00"} - {b.workingHours?.end || "18:00"}
                  </td>
                  <td className="p-3.5 text-stone-500">
                    {b.workingDays?.join(", ") || "Monday - Saturday"}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] bg-teal-100/80 text-teal-800 font-medium px-2.5 py-0.5 rounded-full">
                      {b.experience || 1} yrs
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

export default Schedule;