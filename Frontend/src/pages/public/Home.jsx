import { Link } from "react-router-dom";

function Home() {
  const features = [
    { icon: "✂️", title: "Expert Stylists", desc: "Our certified professionals deliver gentle, high quality care", bg: "bg-rose-50 border-rose-100" },
    { icon: "📅", title: "Easy Booking", desc: "Book appointments online quickly with custom dates", bg: "bg-amber-50 border-amber-100" },
    { icon: "🌸", title: "Pastel Products", desc: "We use soft organic products for your skin & hair", bg: "bg-teal-50 border-teal-100" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <section className="bg-rose-50/70 border-b border-rose-100/60 px-6 py-20 text-center">
        <span className="text-xs bg-rose-100 text-rose-700 px-3.5 py-1 rounded-full font-medium">✨ Soft Salon Care</span>
        <h1 className="text-4xl font-semibold text-stone-700 mt-4 mb-3">
          Look Good, <span className="text-rose-400">Feel Beautiful</span>
        </h1>
        <p className="text-stone-500 text-sm max-w-lg mx-auto mb-6">
          Book salon appointments, explore beauty products, and manage your services with ease. Your calm glow-up starts here.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link to="/login" className="bg-rose-200 hover:bg-rose-300 text-rose-900 text-xs font-medium px-5 py-2.5 rounded-xl transition">
            Book Now
          </Link>
          <Link to="/services" className="bg-white/80 border border-rose-200 text-stone-600 hover:bg-rose-50 text-xs font-medium px-5 py-2.5 rounded-xl transition">
            Our Services
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-medium text-center text-stone-700 mb-10">Why Choose Glamour Salon?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`${f.bg} border rounded-2xl p-6 shadow-xs text-center`}>
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-medium text-stone-700 text-sm mb-1">{f.title}</h3>
              <p className="text-stone-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-rose-100/60 text-stone-700 text-center px-6 py-14">
        <h2 className="text-2xl font-medium text-rose-900 mb-2">Ready for a New Look?</h2>
        <p className="text-xs text-stone-500 mb-6">Join our happy customers at Glamour Salon</p>
        <Link to="/register" className="bg-white text-rose-800 font-medium text-xs px-5 py-2.5 rounded-xl shadow-xs hover:bg-rose-50 transition">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;