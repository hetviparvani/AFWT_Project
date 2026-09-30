import { useState, useEffect } from "react";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProducts(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categoryBg = {
    "Hair Care": "bg-rose-50/70 border-rose-100",
    "Skin Care": "bg-sky-50/70 border-sky-100",
    "Beard Care": "bg-teal-50/70 border-teal-100",
    Styling: "bg-purple-50/70 border-purple-100",
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-rose-50/60 border-b border-rose-100/60 text-center px-6 py-12">
        <h1 className="text-2xl font-medium text-stone-700 mb-1">Beauty Products</h1>
        <p className="text-stone-400 text-xs">Premium salon-grade products live from inventory</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-stone-400 text-xs text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <div
                key={p._id}
                className={`${
                  categoryBg[p.category] || "bg-rose-50/70 border-rose-100"
                } border rounded-2xl p-5 shadow-xs flex flex-col justify-between`}
              >
                <div>
                  <div className="text-4xl mb-3"></div>
                  <h4 className="font-medium text-stone-700 text-sm mb-1">{p.name}</h4>
                  <p className="text-stone-400 text-xs leading-relaxed mb-4">
                    {p.description || `High quality ${p.category} product.`}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-stone-200/40">
                  <div>
                    <span className="text-[11px] text-stone-400 block">{p.brand}</span>
                    <span className="font-semibold text-rose-700 text-base">₹{p.price}</span>
                  </div>
                  <button
                    onClick={() => alert(`Added "${p.name}" to cart!`)}
                    className="bg-rose-200/80 hover:bg-rose-300 text-rose-800 text-xs px-3.5 py-1.5 rounded-xl font-medium transition"
                  >
                    🛒 Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;