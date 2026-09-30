function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 text-xs py-8 px-6 mt-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-rose-200 font-medium text-base mb-2">✂️ Glamour Salon</h3>
          <p className="text-xs text-stone-400">Your beauty, our passion. Soft, premium salon care at your fingertips.</p>
        </div>
        <div>
          <h4 className="text-stone-200 font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1 text-xs text-stone-400">
            <li><a href="/" className="hover:text-rose-200">Home</a></li>
            <li><a href="/services" className="hover:text-rose-200">Services</a></li>
            <li><a href="/products" className="hover:text-rose-200">Products</a></li>
            <li><a href="/login" className="hover:text-rose-200">Book Appointment</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-stone-200 font-medium mb-2">Contact Us</h4>
          <ul className="space-y-1 text-xs text-stone-400">
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@glamoursalon.com</li>
            <li>📍 123, Main St, Mumbai</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-700/60 max-w-5xl mx-auto mt-6 pt-4 text-center text-xs text-stone-500">
        © 2026 Glamour Salon. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;