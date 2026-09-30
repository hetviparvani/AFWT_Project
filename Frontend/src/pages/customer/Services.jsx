import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setServices(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryBg = {
    Haircut: "bg-rose-50/70 border-rose-100",
    "Hair Coloring": "bg-purple-50/70 border-purple-100",
    "Beard Styling": "bg-teal-50/70 border-teal-100",
    Facial: "bg-amber-50/70 border-amber-100",
    Massage: "bg-sky-50/70 border-sky-100",
    Spa: "bg-emerald-50/70 border-emerald-100",
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-stone-700 mb-0.5">Our Services</h2>
      <p className="text-stone-400 text-xs mb-6">Browse real-time salon services from our catalog</p>

      {loading ? (
        <p className="text-stone-400 text-xs">Loading services from database...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s._id}
              className={`${
                categoryBg[s.category] || "bg-rose-50/70 border-rose-100"
              } border rounded-2xl p-5 shadow-xs flex flex-col justify-between`}
            >
              <div>
                <div className="text-3xl mb-3"></div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-stone-700 text-xs">{s.name}</h3>
                  <span className="text-[10px] bg-white/70 text-stone-600 px-2 py-0.5 rounded-full">
                    {s.category}
                  </span>
                </div>
                <p className="text-stone-400 text-[11px] mb-3">{s.description || "Premium salon treatment."}</p>
              </div>
              <div>
                <div className="flex items-center justify-between py-2 border-t border-stone-200/40">
                  <span className="text-[11px] text-stone-400">{s.duration} min</span>
                  <span className="text-sm font-semibold text-rose-800">₹{s.price}</span>
                </div>
                <Link
                  to="/customer/bookings"
                  className="mt-2 block text-center w-full bg-rose-200/80 hover:bg-rose-300 text-rose-800 text-xs font-medium py-2 rounded-xl transition"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
