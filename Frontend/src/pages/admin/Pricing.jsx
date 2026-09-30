import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function Pricing() {
  const { token } = useAuth();
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Haircut");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchServices = () => {
    fetch("http://localhost:5000/api/services?isActive=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setServices(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      name,
      price: Number(price),
      duration: Number(duration),
      category,
      description,
    };

    try {
      const url = editId
        ? `http://localhost:5000/api/services/${editId}`
        : "http://localhost:5000/api/services";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to save service");
      }

      setName("");
      setPrice("");
      setDuration("");
      setCategory("Haircut");
      setDescription("");
      setEditId(null);
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (s) => {
    setEditId(s._id);
    setName(s.name);
    setPrice(s.price);
    setDuration(s.duration);
    setCategory(s.category);
    setDescription(s.description || "");
    setShowForm(true);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categoryColor = {
    Haircut: "bg-rose-100/80 text-rose-800",
    "Hair Coloring": "bg-purple-100/80 text-purple-800",
    "Beard Styling": "bg-teal-100/80 text-teal-800",
    Facial: "bg-amber-100/80 text-amber-800",
    Massage: "bg-sky-100/80 text-sky-800",
    Spa: "bg-emerald-100/80 text-emerald-800",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium text-stone-700">Service Pricing</h2>
          <p className="text-stone-400 text-xs">Manage services and pricing</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setName("");
            setPrice("");
            setDuration("");
            setCategory("Haircut");
            setDescription("");
          }}
          className="bg-rose-200 hover:bg-rose-300 text-rose-800 text-xs font-medium px-4 py-2 rounded-xl transition"
        >
          {showForm ? "Close Form" : "+ Add Service"}
        </button>
      </div>

      {error && (
        <div className="bg-rose-100/70 text-rose-700 text-xs rounded-xl p-3 mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 shadow-xs mb-6">
          <h3 className="font-medium text-stone-700 text-sm mb-4">
            {editId ? "Edit Service" : "Add New Service"}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Service Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Service name"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Duration (Minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="Duration in mins (e.g. 30)"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-500 mb-1 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              >
                <option value="Haircut">Haircut</option>
                <option value="Hair Coloring">Hair Coloring</option>
                <option value="Beard Styling">Beard Styling</option>
                <option value="Facial">Facial</option>
                <option value="Massage">Massage</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-[11px] text-stone-500 mb-1 block">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the service"
                className="w-full bg-white border border-rose-200 rounded-xl p-2 text-xs text-stone-700 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2">
              <button
                type="submit"
                className="bg-rose-200 hover:bg-rose-300 text-rose-800 text-xs px-4 py-2 rounded-xl font-medium transition"
              >
                {editId ? "Update Service" : "Add Service"}
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
              <th className="text-left p-3.5 font-medium">Service</th>
              <th className="text-left p-3.5 font-medium">Category</th>
              <th className="text-left p-3.5 font-medium">Duration</th>
              <th className="text-left p-3.5 font-medium">Price</th>
              <th className="text-left p-3.5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  Loading services...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-stone-400">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr
                  key={s._id}
                  className="border-b border-stone-100/60 last:border-0 hover:bg-rose-50/30"
                >
                  <td className="p-3.5 font-medium text-stone-700">{s.name}</td>
                  <td className="p-3.5">
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                        categoryColor[s.category] || "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {s.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-stone-500">{s.duration} mins</td>
                  <td className="p-3.5 font-semibold text-rose-800">₹{s.price}</td>
                  <td className="p-3.5 flex gap-3">
                    <button
                      onClick={() => startEdit(s)}
                      className="text-[11px] text-sky-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteService(s._id)}
                      className="text-[11px] text-rose-700 hover:underline"
                    >
                      Delete
                    </button>
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

export default Pricing;