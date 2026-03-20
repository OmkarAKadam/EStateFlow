import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 text-sm">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          <section className="md:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">E</span>
              </div>
              EstateFlow
            </Link>

            <p className="text-gray-500 max-w-md leading-relaxed">
              Find and list properties easily and efficiently. Discover your next home or investment with a smooth and modern experience.
            </p>
          </section>

          <nav>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Explore
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition"
                >
                  Home
                </Link>
              </li>
            </ul>
          </nav>

          <nav>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </nav>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-100 text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} EstateFlow. All rights reserved.</p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition">Twitter</a>
            <a href="#" className="hover:text-blue-600 transition">Instagram</a>
            <a href="#" className="hover:text-blue-600 transition">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;