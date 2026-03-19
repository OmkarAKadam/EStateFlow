import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">EstateFlow</h2>
          <p className="text-gray-400 mt-2">
            Find and list properties easily and efficiently.
          </p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-gray-400">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-gray-500 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} EstateFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;