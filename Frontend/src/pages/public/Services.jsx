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
    "Beard Styling": "bg-amber-50/70 border-amber-100",
    Facial: "bg-sky-50/70 border-sky-100",
    Massage: "bg-teal-50/70 border-teal-100",
    Spa: "bg-emerald-50/70 border-emerald-100",
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-rose-50/60 border-b border-rose-100/60 text-center px-6 py-12">
        <h1 className="text-2xl font-medium text-stone-700 mb-1">Our Salon Services</h1>
        <p className="text-stone-400 text-xs">Soft, relaxing treatments</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-stone-400 text-xs text-center">Loading services...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s._id}
                className={`${
                  categoryBg[s.category] || "bg-rose-50/70 border-rose-100"
                } border rounded-2xl p-5 shadow-xs flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-3"></div>
                  <h4 className="font-medium text-stone-700 text-sm mb-1">{s.name}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed mb-4">
                    {s.description || `${s.category} treatment by our experts.`}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-200/40">
                  <div>
                    <span className="text-[11px] text-stone-400 block">{s.duration} mins</span>
                    <span className="font-semibold text-rose-700 text-base">₹{s.price}</span>
                  </div>
                  <Link
                    to="/login"
                    className="bg-rose-200/80 hover:bg-rose-300 text-rose-800 text-xs px-3.5 py-1.5 rounded-xl font-medium transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;